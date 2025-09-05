"use client";

import TailwindEditor from "@/app/components/dashboard/editor/EditorWrapper";
import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Prisma } from "@/lib/generated/prisma";
import { UploadDropzone } from "@/utils/UploadthingComponents";
import { articleSchema, ArticleSchemaType } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { toast } from "sonner";
import { EditPostAction } from "../actions";

interface iAppProps {
  data: {
    title: string;
    slug: string;
    smallDescription: string;
    image: string;
    id: string;
    articleContent: any;
  };
  siteId: string;
  articleId: string;
}

export function EditArticleForm({ data, articleId, siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [slug, setSlug] = useState<string>(data.slug);

  const form = useForm<ArticleSchemaType>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      coverImage: data.image,
      smallDescription: data.smallDescription,
      content: data.articleContent,
    },
  });

  async function handleSubmit(values: ArticleSchemaType) {
    await EditPostAction(articleId, siteId, values);
  }

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Article Details</CardTitle>
        <CardDescription>Jibrish</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nextjs blogging application"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
                      <Input
                        placeholder="Article Slug"
                        {...field}
                        onChange={(e) => {
                          setSlug(e.target.value);
                          field.onChange(e.target.value);
                        }}
                        value={slug || field.value}
                      />
                      <Button
                        className="w-fit"
                        variant="secondary"
                        type="button"
                        onClick={() => {
                          const title = form.getValues("title");
                          const generatedSlug = slugify(title);
                          setSlug(generatedSlug);
                          field.onChange(generatedSlug);
                        }}
                      >
                        <Atom className="size-4 mr-2" /> Generate Slug
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smallDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Small Description</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
                      <Textarea
                        className="h-32"
                        placeholder="Small Description for your article..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <>
                  <input type="hidden" {...field} value={imageUrl} />
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Uploaded image"
                      className="object-cover w-[200px] h-[200px] rounded-lg"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <UploadDropzone
                      onClientUploadComplete={(res) => {
                        toast.success("Image uploaded successfully.");
                        const url = res[0].ufsUrl;
                        setImageUrl(url);
                        field.onChange(url);
                      }}
                      onUploadError={() => {
                        toast.error("Something went wrong. Please try again.");
                      }}
                      endpoint="imageUploader"
                    />
                  )}
                </>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Content</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
                      <input
                        type="hidden"
                        {...field}
                        value={value ? JSON.stringify(value) : ""}
                      />
                      <TailwindEditor
                        onChange={(newValue) => {
                          setValue(newValue);
                          field.onChange(
                            newValue ? JSON.stringify(newValue) : ""
                          );
                        }}
                        initialValue={value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton text="Edit Article" formState={form.formState} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
