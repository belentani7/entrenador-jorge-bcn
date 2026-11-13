import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

/**
 * Backend crafted by belentani.eu · Pedro Belentani · noiacore.com
 */
import { createBooking, createLead, hasBooking } from "./db";
import { notifyOwner } from "./_core/notification";
import {
  confirmationEmail,
  ownerSubmissionEmail,
  sendTransactionalEmail,
} from "./email";

export function resolveOwnerNotification(
  internalNotified: boolean,
  ownerEmailSent: boolean
) {
  return {
    notified: internalNotified || ownerEmailSent,
    channel: internalNotified ? "internal" : ownerEmailSent ? "email" : "none",
  } as const;
}

const contactFields = {
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(320),
  phone: z.string().trim().min(7).max(40),
};

const bookingTimes = ["07:00", "09:00", "13:30", "18:00", "19:30"] as const;
const bookingDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(value => value >= new Date().toISOString().slice(0, 10), {
    message: "La fecha debe ser hoy o posterior.",
  });

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  leads: router({
    create: publicProcedure
      .input(
        z.object({
          ...contactFields,
          goal: z.string().trim().min(2).max(500),
          preferredTime: z.string().trim().min(2).max(60),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createLead(input);
        const emailSent = await sendTransactionalEmail({
          to: input.email,
          subject: "Hemos recibido tu mensaje · Jorge Performance",
          html: confirmationEmail(input.name),
        });
        const notified = await notifyOwner({
          title: "Nueva consulta de entrenamiento",
          content: `${input.name} ha enviado una consulta. Email: ${input.email}. Teléfono: ${input.phone}. Objetivo: ${input.goal}. Horario preferido: ${input.preferredTime}.`,
        });
        const ownerEmail = process.env.JORGE_EMAIL;
        const ownerEmailSent = ownerEmail
          ? await sendTransactionalEmail({
              to: ownerEmail,
              subject: "Nueva consulta · Jorge Performance",
              html: ownerSubmissionEmail("Nueva consulta de entrenamiento", {
                Nombre: input.name,
                Email: input.email,
                Teléfono: input.phone,
                Objetivo: input.goal,
                "Horario preferido": input.preferredTime,
              }),
            })
          : false;
        const ownerNotification = resolveOwnerNotification(
          notified,
          ownerEmailSent
        );
        return {
          success: true,
          id: result.id,
          emailSent,
          ownerNotified: ownerNotification.notified,
          ownerNotificationChannel: ownerNotification.channel,
        } as const;
      }),
  }),
  bookings: router({
    create: publicProcedure
      .input(
        z.object({
          ...contactFields,
          date: bookingDate,
          time: z.enum(bookingTimes),
        })
      )
      .mutation(async ({ input }) => {
        if (await hasBooking(input.date, input.time))
          throw new Error(
            "Ese horario ya tiene una solicitud. Elige otro momento."
          );
        const result = await createBooking({ ...input, status: "pending" });
        const notified = await notifyOwner({
          title: "Nueva solicitud de primera sesión",
          content: `${input.name} ha solicitado una sesión el ${input.date} a las ${input.time}. Email: ${input.email}. Teléfono: ${input.phone}.`,
        });
        const emailSent = await sendTransactionalEmail({
          to: input.email,
          subject: "Solicitud recibida · Jorge Performance",
          html: confirmationEmail(input.name, input.date, input.time),
        });
        const ownerEmail = process.env.JORGE_EMAIL;
        const ownerEmailSent = ownerEmail
          ? await sendTransactionalEmail({
              to: ownerEmail,
              subject: "Nueva solicitud de primera sesión · Jorge Performance",
              html: ownerSubmissionEmail(
                "Nueva solicitud de primera sesión",
                {
                  Nombre: input.name,
                  Email: input.email,
                  Teléfono: input.phone,
                  Fecha: input.date,
                  Hora: input.time,
                }
              ),
            })
          : false;
        const ownerNotification = resolveOwnerNotification(
          notified,
          ownerEmailSent
        );
        return {
          success: true,
          id: result.id,
          ownerNotified: ownerNotification.notified,
          ownerNotificationChannel: ownerNotification.channel,
          emailSent,
        } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
