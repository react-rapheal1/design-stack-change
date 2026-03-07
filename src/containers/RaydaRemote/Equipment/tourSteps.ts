export interface TourStep {
  actionStep?: number;
  description: string;
  title: string;
}

export const tourSteps: Record<string, TourStep[]> = {
  csv: [
    {
      title: "Welcome to All Equipment",
      description: "This is your central device inventory. Everything your team owns or has been assigned will live here.",
    },
    {
      title: "Import your CSV",
      description: "Click 'Import CSV' to upload your spreadsheet. We'll walk you through mapping your columns to Rayda fields.",
      actionStep: 1,
    },
    {
      title: "Map your columns",
      description: "Match your spreadsheet headers to Rayda fields. We auto-detect most common formats. Just confirm and import.",
    },
    {
      title: "Review and confirm",
      description: "After importing, check for any devices flagged as unassigned or with missing data, then confirm your inventory.",
    },
  ],
  manual: [
    {
      title: "Welcome to All Equipment",
      description: "This is your central device inventory. You can add devices here one at a time with full control over every field.",
    },
    {
      title: "Add your first device",
      description: "Click 'Add Device' to manually enter a device. You'll fill in the name, serial number, assigned employee, and condition.",
      actionStep: 1,
    },
    {
      title: "Keep building your inventory",
      description: "Add as many devices as you need. You can always come back and add more, or switch to CSV import for bulk uploads.",
    },
  ],
  "self-report": [
    {
      title: "Welcome to All Equipment",
      description: "This is your central device inventory. Once employees submit their self-report forms, their equipment appears here automatically.",
    },
    {
      title: "Send the self-report form",
      description: "Click 'Send self-report' to email your team. Each employee gets a simple form asking what equipment they're using.",
      actionStep: 1,
    },
    {
      title: "Responses fill your inventory",
      description: "As employees submit responses, devices are automatically added here. You can review, edit, or merge entries as needed.",
    },
  ],
};
