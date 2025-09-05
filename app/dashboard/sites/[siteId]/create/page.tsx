import { CreateArticleForm } from "./_components/CreateArticleForm";

export default async function CreateArticlePage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;
  console.log("SITE ID IN CREATE:", siteId);

  return <CreateArticleForm siteId={siteId} />;
}
