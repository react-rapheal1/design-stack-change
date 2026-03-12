import { SidePanel } from "./components/SidePanel";
import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex h-full flex-1 flex-col overflow-hidden px-8">
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="w-full max-w-[360px]">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Create your account</h1>
              <p className="mt-2 text-base text-tertiary">Get your team up and running in under 3 minutes.</p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-[55%] shrink-0">
        <SidePanel />
      </div>
    </div>
  );
}
