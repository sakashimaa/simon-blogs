"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButton";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const pricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out",
    priceTitle: "Free",
    benefits: ["1 Site", "Up to 1000 visitors", "Up to 1000 visitors"],
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals.",
    priceTitle: "$29",
    benefits: ["Unlimited Sites", "Unlimited Visitors", "Unlimited Posts"],
  },
];

export function Pricing() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
        mollitia placeat alias blanditiis eaque dolor deleniti fugit quidem!
        Maxime optio debitis porro voluptatum. Facere quisquam dignissimos
        quaerat alias illo cumque?
      </p>

      <div className="grid grid-cols-1 gap-8 mt-15 lg:grid-cols-2">
        {pricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup</h3>

                    <Badge>Most Popular</Badge>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-x-3">
                    <Check className="text-primary size-5" />

                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button className="w-full mt-5" variant="outline" asChild>
                  <Link href="/dashboard">Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
