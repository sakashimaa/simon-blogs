"use server";

import { redirect } from "next/navigation";
import {
  articleSchema,
  ArticleSchemaType,
  siteSchema,
  SiteSchemaType,
} from "@/utils/zod-schemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/utils/requireUser";
import { ApiResponse } from "@/lib/api-response";
import { stripe } from "@/utils/stripe";

export async function createSiteAction(formData: SiteSchemaType) {
  try {
    const user = await requireUser();

    const [subStatus, sites] = await Promise.all([
      prisma.subscription.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          status: true,
        },
      }),

      prisma.site.findMany({
        where: {
          userId: user.id,
        },
      }),
    ]);

    const values = siteSchema.parse(formData);

    const candidate = await prisma.site.findUnique({
      where: {
        subdirectory: values.subdirectory,
      },
    });

    if (candidate) {
      return {
        status: "error",
        message: "Subdirectory is already exists. Try another one",
      };
    }

    if (!subStatus || subStatus.status !== "active") {
      if (sites.length < 1) {
        await createSite();
      } else {
        return redirect("/dashboard/pricing");
      }
    } else if (subStatus.status === "active") {
      await createSite();
    }

    async function createSite() {
      await prisma.site.create({
        data: {
          ...values,
          userId: user.id,
        },
      });

      return redirect(`/dashboard/sites`);
    }
  } catch (error) {
    console.error("ERROR in createSiteAction:", error);
    throw error;
  }
}

export async function createArticleAction(
  formData: ArticleSchemaType,
  siteId: string
) {
  const user = await requireUser();

  const values = articleSchema.parse(formData);
  const data = await prisma.post.create({
    data: {
      title: values.title,
      smallDescription: values.smallDescription,
      image: values.coverImage,
      slug: values.slug,
      articleContent: JSON.parse(values.content),
      userId: user.id,
      siteId,
    },
  });

  return redirect(`/dashboard/sites/${siteId}`);
}

export async function CreateSubscription() {
  const user = await requireUser();

  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId.customerId as string,
    mode: "subscription",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payment/cancelled`,
    line_items: [{ price: process.env.STRIPE_PRICE_ID as string, quantity: 1 }],
  });

  return redirect(session.url as string);
}
