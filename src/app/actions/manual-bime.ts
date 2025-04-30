// app/actions/manual-bime.ts
'use server'

import { z } from 'zod'

const formSchema = z.object({
    pelak: z.object({
        leftNumber: z.string(),
        letter: z.string(),
        rightNumber: z.string(),
        iranNumber: z.string(),
    }).refine((data) => {
        return (
            /^\d{2}$/.test(data.leftNumber) &&
            /^[\u0600-\u06FFa-zA-Z]+$/.test(data.letter) &&
            /^\d{3}$/.test(data.rightNumber) &&
            /^\d{2}$/.test(data.iranNumber)
        );
    }, {
        message: "Please fill all pelak fields correctly.",
    }),

    tavalod: z.coerce.date(),
    'location-state': z.tuple([z.string(), z.string().optional()]),
    coverageAmount: z.string(),
    mobileNumber: z.string(),
})

export async function registerManualBime(formData: unknown) {
    const parsed = formSchema.safeParse(formData)

    if (!parsed.success) {
        return { error: parsed.error.flatten() }
    }

    const values = parsed.data

    console.log("Saving Manual Bime: ", values)

    // TODO: Save to DB or perform side-effects here

    return { success: true, data: values }
}
