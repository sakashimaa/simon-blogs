import { prisma } from "@/lib/prisma";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: "Webhook error", status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const customerId = session.customer;
    const user = await prisma.user.findUnique({
      where: {
        customerId: customerId as string,
      },
    });

    if (!user) {
      throw new Error("User not found...");
    }

    await prisma.subscription.create({
      data: {
        id: subscription.id,
        userId: user.id,
        currentPeriodStart: subscription.items.data[0].current_period_start,
        currentPeriodEnd: subscription.items.data[0].current_period_end,
        status: subscription.status,
        planId: subscription.items.data[0].plan.id,
        interval: String(subscription.items.data[0].plan.interval),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        planId: subscription.items.data[0].price.id,
        currentPeriodStart: subscription.items.data[0].current_period_start,
        currentPeriodEnd: subscription.items.data[0].current_period_end,
        status: subscription.status,
      },
    });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
