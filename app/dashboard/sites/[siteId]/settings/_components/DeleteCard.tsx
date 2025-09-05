"use client";

import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteSite } from "../actions";

interface iAppProps {
  siteId: string;
}

export function DeleteCard({ siteId }: iAppProps) {
  async function handleSubmit() {
    await DeleteSite(siteId);
  }

  return (
    <Card className="border-red-500 bg-red-500/10">
      <CardHeader>
        <CardTitle className="text-red-500">Danger</CardTitle>
        <CardDescription>
          This will delete your site and all articles associated with it. Click
          the button to delete everything
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <form onSubmit={handleSubmit}>
          <SubmitButton text="Delete Everything" variant="destructive" />
        </form>
      </CardFooter>
    </Card>
  );
}
