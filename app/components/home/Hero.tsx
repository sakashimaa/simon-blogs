"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeToggler } from "@/components/theme-toggler";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import HeroImage from "@/public/hero-image.png";

export function Hero() {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-4">
            <Image src={Logo} alt="Logo" className="size-10 dark:invert" />
            <h4 className="text-3xl font-semibold">
              Simon<span className="text-primary">Blog</span>
            </h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggler />
          </div>
        </div>

        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggler />
          <LoginLink>
            <Button variant="secondary">Sign In</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Sign Up</Button>
          </RegisterLink>
        </nav>
      </div>

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-md text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
              Ultimate Blogging SaaS for Startups
            </span>

            <h1 className="mt-8 text-4xl sm:text-6-xl md:text-7xl lg:text-8xl font-medium leading-none">
              Setup your Blog{" "}
              <span className="block text-primary">in Minutes!</span>
            </h1>

            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Setting up your blog is hard and time consuming. We make it easy
              for you and your team.
            </p>

            <div className="flex items-center gap-x-5 w-full justify-center mt-5">
              <LoginLink>
                <Button variant="secondary">Sign In</Button>
              </LoginLink>

              <RegisterLink>
                <Button>Try for Free</Button>
              </RegisterLink>
            </div>
          </div>

          <div className="relative items-center w-full py-12 mx-auto mt-12">
            <Image
              src={HeroImage}
              alt="Hero Image"
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
