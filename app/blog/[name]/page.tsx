import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import { notFound } from "next/navigation";
import { BlogCard } from "./_components/BlogCard";
import Image from "next/image";
import Logo from "@/public/vercel.svg";
import { ThemeToggler } from "@/components/theme-toggler";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from "@/public/default.jpg";

async function getData(subdirectory: string, userId: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory,
      userId,
    },
    select: {
      name: true,
      Posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogNamePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const user = await requireUser();
  const decodedName = decodeURIComponent(name);
  const data = await getData(decodedName, user.id);

  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />
        <div className="flex items-center gap-x-4 justify-center">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggler />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {data.Posts.map((item) => (
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
                <Link href={`/blog/${name}/${item.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
