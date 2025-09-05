import { z } from "zod";

export const siteSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(35, { message: "Name is 35 characters max." }),
  description: z.string().min(1, { message: "Description is required" }),
  subdirectory: z
    .string()
    .min(1, { message: "Subdirectory is required" })
    .max(40, { message: "Subdirectory is max 40 length." }),
});

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(35, { message: "Title is 35 characters max" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  coverImage: z.string().min(1, { message: "Cover Image is required" }),
  smallDescription: z
    .string()
    .min(1, { message: "Small Description is required" })
    .max(100, { message: "Small Description is 100 characters max" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export function siteCreationSchema(options?: {
  isSubdirectoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z
      .string()
      .min(1)
      .max(40)
      .regex(/^[a-z]+$/, { message: "Subdirectory must be lowercased" })
      .transform((value) => value.toLocaleLowerCase())
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof options?.isSubdirectoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: "Function not defined",
            });

            return;
          }

          return options.isSubdirectoryUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message:
                  "Subdirectory is already taken, please create another one",
              });
            }
          });
        })
      ),
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(35, { message: "Name is 35 characters max." }),
    description: z.string().min(1, { message: "Description is required" }),
  });
}

export type SiteSchemaType = z.infer<typeof siteSchema>;
export type ArticleSchemaType = z.infer<typeof articleSchema>;
