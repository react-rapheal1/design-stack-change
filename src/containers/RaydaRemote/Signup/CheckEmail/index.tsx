"use client";

import { Suspense } from "react";
import { Mail01, RefreshCw01 } from "@untitledui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { appRoutes } from "@/lib/app-routes";

function CheckEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9fafb] px-4">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <RaydaLogo />
      </div>
      <div className="w-full max-w-[400px] rounded-2xl bg-white px-8 py-10 shadow-lg ring-1 ring-[#eaecf0]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-25">
          <Mail01 className="size-7 text-brand-600" />
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-primary">Check your email</h1>
          <p className="mt-3 text-base leading-6 text-tertiary">We sent a verification link to</p>
          <p className="mt-1 font-semibold text-secondary">{email}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={() => router.push(appRoutes.raydaRemote.onboarding)}>
            Open email app
          </Button>
          <Button color="secondary" size="lg" className="w-full" iconLeading={RefreshCw01}>
            Resend email
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-tertiary">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <button className="font-semibold text-brand-600 transition duration-100 hover:text-brand-700">try another email address</button>.
        </p>
        <div className="mt-8 flex justify-center border-t border-[#eaecf0] pt-6">
          <Button href={appRoutes.raydaRemote.signup} color="link-gray" size="sm" className="text-sm">
            ← Back to sign up
          </Button>
        </div>
      </div>
      <p className="mt-8 text-sm text-quaternary">© {new Date().getFullYear()} Rayda. All rights reserved.</p>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailContent />
    </Suspense>
  );
}
