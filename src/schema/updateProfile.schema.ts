import { z } from "zod";

export const schema = z
    .object({
        username: z.string().min(1, { message: "Campo obrigatório" }),
        name: z.string().min(1, { message: "Campo obrigatório" }),
        password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
        confirmPassword: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type updatProfileSchema = z.infer<typeof schema>;
