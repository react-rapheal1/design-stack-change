"use client";

import { useState } from "react";
import { Check, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";

export function SelfReportModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [emails, setEmails] = useState("");
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-primary">Send self-report form</h2>
              <p className="mt-0.5 text-sm text-tertiary">Employees fill out a simple form listing their equipment.</p>
            </div>
            <CloseButton size="sm" onPress={onClose} />
          </div>
          {sent ? <SuccessState onClose={onClose} /> : <FormState emails={emails} onChange={setEmails} onClose={onClose} onSend={() => setSent(true)} />}
        </div>
      </div>
    </>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-25">
        <Check className="size-7 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">Invites sent!</h3>
      <p className="mt-2 text-sm text-tertiary">
        Your employees will receive an email with a link to report their equipment. Responses will appear here automatically.
      </p>
      <Button size="md" className="mt-6" onClick={onClose}>
        Done
      </Button>
    </div>
  );
}

function FormState({ emails, onChange, onClose, onSend }: { emails: string; onChange: (value: string) => void; onClose: () => void; onSend: () => void }) {
  return (
    <>
      <div className="p-6">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-sm font-semibold text-brand-700">How it works</p>
          <ol className="mt-2 flex flex-col gap-1.5 text-sm text-brand-600">
            <li>1. Enter your employees&apos; email addresses below</li>
            <li>2. They receive a simple form asking about their equipment</li>
            <li>3. Responses are automatically added to your inventory</li>
          </ol>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-secondary">Employee emails</label>
          <textarea
            rows={4}
            placeholder="olivia@company.com, phoenix@company.com, lana@company.com"
            value={emails}
            onChange={(event) => onChange(event.target.value)}
            className="w-full resize-none rounded-lg border border-[#d0d5dd] px-3 py-2.5 text-sm text-primary placeholder:text-placeholder focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
          />
          <p className="mt-1 text-xs text-tertiary">Separate multiple emails with a comma</p>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
        <Button color="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" iconLeading={Mail01} isDisabled={!emails.trim()} onClick={onSend}>
          Send invites
        </Button>
      </div>
    </>
  );
}
