"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import { redirect } from "next/navigation";

export async function UpdateImage(siteId: string, imageUrl: string) {
  const user = await requireUser();

  await prisma.site.update({
    where: {
      id: siteId,
      userId: user.id,
    },
    data: {
      imageUrl,
    },
  });

  return redirect(`/dashboard/sites/${siteId}`);
}

export async function DeleteSite(siteId: string) {
  const user = await requireUser();

  await prisma.site.delete({
    where: {
      id: siteId,
      userId: user.id,
    },
  });

  return redirect("/dashboard/sites");
}
