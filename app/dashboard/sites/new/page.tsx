"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { siteSchema, SiteSchemaType } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSiteAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { toast } from "sonner";

export default function CreateNewSitePage() {
  const form = useForm<SiteSchemaType>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: "",
      description: "",
      subdirectory: "",
    },
  });

  async function handleSubmit(values: SiteSchemaType) {
    const result = await createSiteAction(values);
    if (result?.status === "error") {
      toast.error(result?.message);
    } else {
      toast.success("Site created successfully");
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>
            Create your Site here. Click the button below once you`re done...
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your site name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Small description for your site"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subdirectory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subdirectory</FormLabel>
                    <FormControl>
                      <Input placeholder="Site subdirectory" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <SubmitButton text="Create Site" className="mt-4 w-full" />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
