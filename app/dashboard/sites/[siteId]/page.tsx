import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/DataTable";
import { EmptyState } from "@/components/EmptyState";

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId,
      siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
      Site: {
        select: {
          subdirectory: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function DetailedSitePage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const { siteId } = await params;

  const data = await getData(user.id, siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link
            href={`/blog/${encodeURIComponent(
              data[0]?.Site?.subdirectory || ""
            )}`}
          >
            <Book className="size-4 mr-2" />
            View Blog
          </Link>
        </Button>

        <Button asChild variant="secondary">
          <Link href={`/dashboard/sites/${siteId}/settings`}>
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </Button>

        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/create`}>
            <PlusCircle className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="You dont have any Articles created"
          description="You currenty dont have any Articles. Please create some so that you can see them right here!"
          buttonText="Create Article"
          buttonHref={`/dashboard/sites/${siteId}/create`}
        />
      ) : (
        <DataTable data={data} siteId={siteId} />
      )}
    </>
  );
}
