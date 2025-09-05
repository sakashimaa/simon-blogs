"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { FormState } from "react-hook-form";

interface iAppProps {
  text: string;
  formState?: FormState<{
    title: string;
    slug: string;
    coverImage: string;
    smallDescription: string;
    content: string;
  }>;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export function SubmitButton({
  text,
  formState,
  className,
  variant,
}: iAppProps) {
  const pending = formState?.isSubmitting;

  return (
    <>
      {pending ? (
        <Button disabled className={cn("w-fit", className)} variant={variant}>
          <Loader2Icon className="mr-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          className={cn("w-fit", className)}
          variant={variant}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
}
