"use client";

import { type FormEvent, useState } from "react";
import { Eye, EyeOff } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { appRoutes } from "@/lib/app-routes";
import { PhoneCountrySelect } from "./PhoneCountrySelect";

interface FormState {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  workEmail: string;
}

export function SignupForm() {
  const router = useRouter();
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormState>({ firstName: "", lastName: "", workEmail: "", phone: "", password: "" });
  const isValid = formData.firstName.trim() && formData.lastName.trim() && formData.workEmail.trim() && formData.password.length >= 8;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    router.push(`${appRoutes.raydaRemote.signupCheckEmail}?email=${encodeURIComponent(formData.workEmail)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Input size="md" label="First Name" placeholder="Enter your first name" value={formData.firstName} onChange={(firstName) => setFormData((items) => ({ ...items, firstName }))} />
        <Input size="md" label="Last Name" placeholder="Enter your last name" value={formData.lastName} onChange={(lastName) => setFormData((items) => ({ ...items, lastName }))} />
      </div>
      <Input
        size="md"
        label="Work email"
        placeholder="you@company.com"
        type="email"
        value={formData.workEmail}
        onChange={(workEmail) => setFormData((items) => ({ ...items, workEmail }))}
      />
      <PhoneCountrySelect
        country={phoneCountry}
        phone={formData.phone}
        onCountryChange={setPhoneCountry}
        onPhoneChange={(phone) => setFormData((items) => ({ ...items, phone }))}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Password</label>
        <div className="relative flex items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ring-inset focus-within:ring-2 focus-within:ring-brand">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={(event) => setFormData((items) => ({ ...items, password: event.target.value }))}
            className="w-full bg-transparent px-3.5 py-2.5 text-md text-primary outline-none placeholder:text-placeholder"
          />
          <button
            type="button"
            className="absolute right-3 text-fg-quaternary transition hover:text-fg-tertiary"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        <p className="text-sm text-tertiary">Must be at least 8 characters.</p>
      </div>
      <Button type="submit" size="lg" className="mt-1 w-full" isDisabled={!isValid}>
        Get started
      </Button>
      <p className="text-center text-sm text-tertiary">
        Already have an account?{" "}
        <Button href="/login" color="link-color" size="sm" className="font-semibold">
          Sign in
        </Button>
      </p>
    </form>
  );
}
