import { DeleteArticleForm } from "./_components/DeleteArticleForm";

export default async function DeleteArticlePage({
  params,
}: {
  params: Promise<{ siteId: string; articleId: string }>;
}) {
  const { siteId, articleId } = await params;

  return <DeleteArticleForm siteId={siteId} articleId={articleId} />;
}
