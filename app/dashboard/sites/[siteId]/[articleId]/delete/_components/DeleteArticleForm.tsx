"use client";

import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { deleteArticleAction } from "../actions";

interface iAppProps {
  siteId: string;
  articleId: string;
}

export function DeleteArticleForm({ siteId, articleId }: iAppProps) {
  async function handleSubmit() {
    await deleteArticleAction(articleId, siteId);
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete this article and
            remove all data from our server
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/sites/${siteId}`}>Cancel</Link>
          </Button>
          <form onSubmit={handleSubmit}>
            <SubmitButton variant="destructive" text="Delete Article" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
