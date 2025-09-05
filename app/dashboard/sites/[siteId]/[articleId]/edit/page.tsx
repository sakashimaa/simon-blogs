import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditArticleForm } from "./_components/EditArticleForm";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ siteId: string; articleId: string }>;
}) {
  const { siteId, articleId } = await params;
  const data = await getData(articleId);

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      <EditArticleForm data={data} articleId={articleId} siteId={siteId} />
    </div>
  );
}
