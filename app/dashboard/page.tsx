import { EmptyState } from "@/components/EmptyState";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import Image from "next/image";
import DefaultImage from "@/public/default.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    await prisma.site.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    await prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
}

export default async function DashboardPage() {
  const user = await requireUser();
  const { articles, sites } = await getData(user.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl || DefaultImage}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2 truncate">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You dont have any sites created"
          description="You currently dont have any sites. Please create some so that you can see them right here."
          buttonHref="/dashboard/sites/new"
          buttonText="Create Site"
        />
      )}

      <h1 className="text-2xl mt-10 font-semibold mb-5">Recent Articles</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {articles.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.image || DefaultImage}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2 truncate">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.siteId}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You dont have any articles created"
          description="You currently dont have any article. Please create some so that you can see them right here."
          buttonHref="/dashboard/sites"
          buttonText="Create Site"
        />
      )}
    </div>
  );
}
