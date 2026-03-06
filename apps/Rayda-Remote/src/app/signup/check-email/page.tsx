"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail01, RefreshCw01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";

function CheckEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "your email";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9fafb] px-4">
            {/* Logo at top */}
            <div className="absolute left-8 top-8">
                <RaydaLogo />
            </div>

            {/* Card */}
            <div className="w-full max-w-[400px] rounded-2xl bg-white px-8 py-10 shadow-lg ring-1 ring-[#eaecf0]">
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-25">
                    <Mail01 className="size-7 text-brand-600" />
                </div>

                {/* Heading */}
                <div className="mt-6 text-center">
                    <h1 className="text-2xl font-bold text-primary">Check your email</h1>
                    <p className="mt-3 text-base leading-6 text-tertiary">
                        We sent a verification link to
                    </p>
                    <p className="mt-1 font-semibold text-secondary">{email}</p>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-3">
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() => router.push("/onboarding")}
                    >
                        Open email app
                    </Button>

                    <Button color="secondary" size="lg" className="w-full" iconLeading={RefreshCw01}>
                        Resend email
                    </Button>
                </div>

                {/* Helper text */}
                <p className="mt-6 text-center text-sm text-tertiary">
                    Didn&apos;t receive the email? Check your spam folder or{" "}
                    <button className="font-semibold text-brand-600 hover:text-brand-700 transition duration-100">
                        try another email address
                    </button>
                    .
                </p>

                {/* Back to sign in */}
                <div className="mt-8 flex justify-center border-t border-[#eaecf0] pt-6">
                    <Button href="/signup" color="link-gray" size="sm" className="text-sm">
                        ← Back to sign up
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <p className="mt-8 text-sm text-quaternary">
                © {new Date().getFullYear()} Rayda. All rights reserved.
            </p>
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
