"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ForgeUiLogo } from "@/components/brand/forge-ui-logo";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#030303]/90">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white"
          aria-label="Forge-UI home"
        >
          <ForgeUiLogo className="h-9 w-[137px] text-zinc-950 dark:text-white" />
        </Link>

        {/* Navigation */}
        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/#workflow"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-white/55 dark:hover:text-white"
          >
            Workflow
          </Link>

          <Link
            href="/#about"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-white/55 dark:hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="hidden rounded-full px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white sm:block"
              >
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Get started
                <span className="ml-2" aria-hidden="true">→</span>
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Open dashboard
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>

            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
