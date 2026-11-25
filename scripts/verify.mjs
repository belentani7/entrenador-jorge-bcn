#!/usr/bin/env node
/**
 * Verificación centralizada del repositorio.
 * Uso: node scripts/verify.mjs [--metrics-only] [--help]
 */
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);

const HELP = `Uso: node scripts/verify.mjs [opciones]

Ejecuta, en orden, las comprobaciones del repositorio y muestra métricas
de los artefactos generados en dist/public.

Opciones:
  --metrics-only   Solo muestra el tamaño de los artefactos ya compilados.
  -h, --help       Muestra esta ayuda y termina con código 0.

Ejemplos:
  node scripts/verify.mjs
  node scripts/verify.mjs --metrics-only
`;

if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}

const unknown = args.filter((arg) => !["--metrics-only"].includes(arg));
if (unknown.length > 0) {
  process.stderr.write(`Opción desconocida: ${unknown.join(", ")}\n\n${HELP}`);
  process.exit(2);
}

const checks = [
  { name: "doctor", command: "python3", args: ["scripts/doctor.py"] },
  { name: "catálogo", command: "node", args: ["scripts/validate-catalog.mjs"] },
  { name: "typecheck", command: "corepack", args: ["pnpm", "check"] },
  { name: "tests", command: "corepack", args: ["pnpm", "test"] },
  { name: "build", command: "corepack", args: ["pnpm", "build"] },
  { name: "formato", command: "corepack", args: ["pnpm", "format:check"] },
];

const kb = (bytes) => (bytes / 1024).toFixed(2).padStart(8) + " KiB";
const gz = (file) => gzipSync(readFileSync(file), { level: 9 }).length;

function metrics() {
  const htmlPath = path.join(ROOT, "dist", "public", "index.html");
  try {
    const html = readFileSync(htmlPath, "utf8");
    const assetsDir = path.join(ROOT, "dist", "public", "assets");
    const assets = readdirSync(assetsDir).map((file) =>
      path.join(assetsDir, file),
    );
    const total = assets.reduce((acc, file) => acc + statSync(file).size, 0);
    const totalGzip = assets.reduce((acc, file) => acc + gz(file), 0);

    console.log("\nMétricas de artefactos (dist/public)");
    console.log("─".repeat(62));
    console.log(
      `index.html:        ${kb(Buffer.byteLength(html))} raw / ${kb(gz(htmlPath))} gzip`,
    );
    console.log(
      `assets (${assets.length} archivos): ${kb(total)} raw / ${kb(totalGzip)} gzip`,
    );
    for (const file of assets.sort()) {
      console.log(
        `  ${path.basename(file).padEnd(30)} ${kb(statSync(file).size)} raw / ${kb(gz(file))} gzip`,
      );
    }
    console.log(
      `runtime Manus inline: ${html.includes('id="manus-runtime"') ? "SÍ (revisar)" : "no"}`,
    );
  } catch (error) {
    console.error(`No se pudieron leer las métricas: ${error.message}`);
  }
}

if (args.includes("--metrics-only")) {
  metrics();
  process.exit(0);
}

let failures = 0;
for (const check of checks) {
  const started = performance.now();
  const result = spawnSync(check.command, check.args, {
    cwd: ROOT,
    encoding: "utf8",
    env: process.env,
  });
  const seconds = ((performance.now() - started) / 1000).toFixed(2);
  const ok = result.status === 0;
  if (!ok) failures += 1;
  console.log(`${ok ? "OK  " : "FALLA"} ${check.name.padEnd(10)} ${seconds}s`);
  if (!ok) {
    const output = `${result.stdout ?? ""}${result.stderr ?? ""}`
      .trim()
      .split("\n");
    console.log(output.slice(-15).join("\n"));
  }
}

metrics();
console.log("─".repeat(62));
console.log(
  failures === 0
    ? "Todas las comprobaciones en verde."
    : `${failures} comprobación(es) fallida(s).`,
);
process.exit(failures === 0 ? 0 : 1);
