import { z } from 'zod';
const text = z.string().min(1);
const date = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);
const localized = z.strictObject({ en: text, vi: text });
export const profileSchema = z
  .strictObject({
    person: z.strictObject({
      name: text,
      displayName: text,
      alternateName: text,
      headline: localized,
      subline: localized,
      email: z.literal('hello@tuando.work'),
      linkedin: z.url(),
      github: z.url(),
      location: text,
      photo: z.literal('tuan-profile.jpg'),
    }),
    summary: z.strictObject({ en: text }),
    stats: z
      .array(z.strictObject({ value: text, label: text, context: text }))
      .length(4),
    experience: z.array(
      z.strictObject({
        id: text,
        company: text,
        role: text,
        start: date,
        end: date.nullable(),
        show: z.strictObject({ site: z.boolean(), cv: z.boolean() }),
        summary: text,
        achievements: z.array(text),
        todo: text.optional(),
      }),
    ),
    experienceNote: text,
    consulting: z.array(
      z.strictObject({
        id: text,
        client: text,
        industry: text,
        url: z.url(),
        role: text,
        scope: z.array(text),
        impact: z.array(text),
        todo: text.optional(),
      }),
    ),
    skills: z.record(z.string(), z.array(text)),
    skillsNote: text,
    education: z.array(
      z.strictObject({ degree: text, field: text, school: text }),
    ),
    certifications: z.array(z.strictObject({ name: text, issuer: text })),
    certificationsNote: text,
    officeAgents: z
      .array(
        z.strictObject({
          id: z.enum([
            'mgr',
            'cre',
            'per',
            'crm',
            'dat',
            'aut',
            'seo',
            'ops',
            'fd',
          ]),
          label: text,
          title: text,
          role: z.string(),
          big: text,
          caption: text,
          link: text,
          external: z.boolean().optional(),
          todo: text.optional(),
        }),
      )
      .length(9),
  })
  .superRefine((data, ctx) => {
    for (const key of ['experience', 'consulting', 'officeAgents'] as const) {
      if (new Set(data[key].map((item) => item.id)).size !== data[key].length)
        ctx.addIssue({ code: 'custom', message: `Duplicate IDs in ${key}` });
    }
    for (const item of data.experience) {
      if (item.end && item.end < item.start)
        ctx.addIssue({
          code: 'custom',
          message: `Invalid date range: ${item.id}`,
        });
      if (item.show.cv && /lifesup/i.test(item.company))
        ctx.addIssue({
          code: 'custom',
          message: 'Lifesup must not appear on the CV',
        });
    }
  });
