import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertBooking, InsertLead, InsertUser, bookings, leads, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId, name: user.name ?? null, email: user.email ?? null, loginMethod: user.loginMethod ?? null, lastSignedIn: user.lastSignedIn ?? new Date(), role: user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user") };
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: { name: values.name, email: values.email, loginMethod: values.loginMethod, lastSignedIn: values.lastSignedIn, role: values.role } });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createLead(input: InsertLead) {
  const db = await getDb();
  if (!db) return { id: 0 };
  const result = await db.insert(leads).values(input);
  return { id: Number(result[0].insertId) };
}

export async function hasBooking(date: string, time: string) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select({ id: bookings.id }).from(bookings).where(and(eq(bookings.date, date), eq(bookings.time, time), eq(bookings.status, "confirmed"))).limit(1);
  return result.length > 0;
}

export async function createBooking(input: InsertBooking) {
  const db = await getDb();
  if (!db) return { id: 0 };
  const result = await db.insert(bookings).values(input);
  return { id: Number(result[0].insertId) };
}
