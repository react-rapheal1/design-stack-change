"use client";

import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";

export interface EmployeeFormData {
  name: string;
  taxId: string;
  personalEmail: string;
  workEmail: string;
  phone: string;
  jobTitle: string;
  employmentType: string;
  level: string;
  department: string;
  country: string;
  address: string;
  landmark: string;
}

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Intern"].map((v) => ({ label: v, value: v }));
const LEVELS = ["Junior", "Mid", "Senior", "Lead", "Director", "VP", "C-Level"].map((v) => ({ label: v, value: v }));
const DEPARTMENTS = ["Engineering", "Design", "Product", "Sales", "Marketing", "Finance", "HR", "Operations"].map((v) => ({ label: v, value: v }));
const COUNTRIES = ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Nigeria"].map((v) => ({ label: v, value: v }));

const PLACEHOLDER_OPT = { label: "Select", value: "" };

interface AddEmployeeFormProps {
  data: EmployeeFormData;
  onChange: (field: keyof EmployeeFormData, value: string) => void;
}

export function AddEmployeeForm({ data, onChange }: AddEmployeeFormProps) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Input size="md" label="Name" placeholder="John Doe" value={data.name} onChange={(v) => onChange("name", v)} />
      <Input size="md" label="Employee tax identification number (Optional)" placeholder="123-45-6789" value={data.taxId} onChange={(v) => onChange("taxId", v)} />
      <Input size="md" label="Personal email" type="email" placeholder="john@example.com" value={data.personalEmail} onChange={(v) => onChange("personalEmail", v)} />
      <Input size="md" label="Work email" type="email" placeholder="john@company.com" value={data.workEmail} onChange={(v) => onChange("workEmail", v)} />
      <Input size="md" label="Phone number" placeholder="+1 (555) 000-0000" value={data.phone} onChange={(v) => onChange("phone", v)} />
      <Input size="md" label="Job title" placeholder="Software Engineer" value={data.jobTitle} onChange={(v) => onChange("jobTitle", v)} />
      <div className="grid grid-cols-2 gap-4">
        <NativeSelect label="Employment type" options={[PLACEHOLDER_OPT, ...EMPLOYMENT_TYPES]} value={data.employmentType} onChange={(e) => onChange("employmentType", e.target.value)} />
        <NativeSelect label="Level" options={[PLACEHOLDER_OPT, ...LEVELS]} value={data.level} onChange={(e) => onChange("level", e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <NativeSelect label="Department" options={[PLACEHOLDER_OPT, ...DEPARTMENTS]} value={data.department} onChange={(e) => onChange("department", e.target.value)} />
        <NativeSelect label="Country" options={[PLACEHOLDER_OPT, ...COUNTRIES]} value={data.country} onChange={(e) => onChange("country", e.target.value)} />
      </div>
      <Input size="md" label="Address" placeholder="123 Main St" value={data.address} onChange={(v) => onChange("address", v)} />
      <TextArea label="Nearest landmark" placeholder="Near the central park..." value={data.landmark} onChange={(v) => onChange("landmark", v)} rows={3} />
    </div>
  );
}
