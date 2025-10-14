import { z } from "zod";

export const emojiSchema = z.object({
    type: z.literal("emoji"),
    emoji: z.string().min(1),
    unicode: z.string().min(1),
    name: z.string().min(1),
});

export const iconSchema = z.object({
    type: z.literal("icon"),
    icon: z.string().min(1),
    color: z.string().optional(),
    size: z.number().min(1),
});
export const schema = z.object({
    url: z
        .url({
            message: "URL inválida",
            protocol: /^https?$/,
            hostname: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/,
            normalize: true,
        })
        .nonempty({ message: "Campo obrigatório" }),
    icon: z.union([emojiSchema, iconSchema]).nullable().optional(),
});

export type socialFormSchema = z.infer<typeof schema>;
