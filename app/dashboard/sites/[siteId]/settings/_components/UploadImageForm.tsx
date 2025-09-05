"use client";

import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/utils/UploadthingComponents";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateImage } from "../actions";

export function UploadImageForm({ siteId }: { siteId: string }) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  async function handleSubmit() {
    await UpdateImage(siteId, imageUrl as string);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site. You can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-lg"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].ufsUrl);
              toast.success("Image has been uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong. Please try again.");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit}>
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
