import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createBooking, createLead, hasBooking } from "./db";
import { notifyOwner } from "./_core/notification";
import { confirmationEmail, sendTransactionalEmail } from "./email";

const contactFields = {
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(320),
  phone: z.string().trim().min(7).max(40),
};

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
        return { success: true, id: result.id, emailSent } as const;
      }),
  }),
  bookings: router({
    create: publicProcedure
      .input(
        z.object({
          ...contactFields,
          date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          time: z.string().regex(/^\d{2}:\d{2}$/),
        })
      )
      .mutation(async ({ input }) => {
        if (await hasBooking(input.date, input.time))
          throw new Error("Ese horario ya está reservado. Elige otro momento.");
        const result = await createBooking({ ...input, status: "confirmed" });
        const notified = await notifyOwner({
          title: "Nueva reserva de sesión de prueba",
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
              subject: "Nueva reserva confirmada · Jorge Performance",
              html: `<p>Nueva reserva de ${input.name} para el ${input.date} a las ${input.time}. Email: ${input.email}. Teléfono: ${input.phone}.</p>`,
            })
          : false;
        const ownerNotified = notified || ownerEmailSent;
        return {
          success: true,
          id: result.id,
          ownerNotified,
          emailSent,
        } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
