"use client";

import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { projects } from "./projects";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-primary px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="text-sm font-semibold tracking-[0.16em] text-brand-secondary uppercase">Rayda Workspace</span>
          <h1 className="text-display-sm font-semibold text-primary sm:text-display-md">One server, four routed products.</h1>
          <p className="text-lg text-tertiary">Choose a product workspace below. Shared styling and components now load from a single Next.js runtime.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map(({ description, href, icon, links, name, status }) => (
            <article key={name} className="flex flex-col gap-6 rounded-3xl border border-secondary bg-primary p-8 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <FeaturedIcon color="brand" icon={icon} size="xl" theme="modern" />
                <span className="rounded-full border border-secondary px-3 py-1 text-sm font-medium text-secondary">{status}</span>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-display-xs font-semibold text-primary">{name}</h2>
                <p className="text-base text-tertiary">{description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className="rounded-lg border border-secondary px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-primary_hover hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Button href={href} target="_blank" size="lg" className="w-full justify-center sm:w-auto" iconTrailing={ArrowUpRight}>
                Open workspace
              </Button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
