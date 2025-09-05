"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import { redirect } from "next/navigation";

export async function deleteArticleAction(articleId: string, siteId: string) {
  const user = await requireUser();

  await prisma.post.delete({
    where: {
      id: articleId,
      userId: user.id,
    },
  });

  return redirect(`/dashboard`);
}
