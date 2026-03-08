import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { SidePanel } from "./components/SidePanel";
import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex h-full flex-1 flex-col overflow-hidden px-6 sm:px-10 lg:max-w-[560px] lg:px-16">
        <div className="shrink-0 pt-8">
          <RaydaLogo />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="w-full max-w-[400px]">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Create your account</h1>
              <p className="mt-2 text-base text-tertiary">Get your team up and running in under 3 minutes.</p>
            </div>
            <SignupForm />
          </div>
        </div>
        <p className="shrink-0 pb-8 text-center text-xs text-quaternary">© {new Date().getFullYear()} Rayda. All rights reserved.</p>
      </div>
      <div className="hidden flex-1 lg:block">
        <SidePanel />
      </div>
    </div>
  );
}
