"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import { articleSchema, ArticleSchemaType } from "@/utils/zod-schemas";
import { redirect } from "next/navigation";

export async function EditPostAction(
  articleId: string,
  siteId: string,
  data: ArticleSchemaType
) {
  const user = await requireUser();

  const values = articleSchema.parse(data);

  await prisma.post.update({
    where: {
      userId: user.id,
      id: articleId,
    },
    data: {
      title: values.title,
      smallDescription: values.smallDescription,
      slug: values.slug,
      articleContent: JSON.parse(values.content),
      image: values.coverImage,
    },
  });

  return redirect(`/dashboard/sites/${siteId}`);
}
