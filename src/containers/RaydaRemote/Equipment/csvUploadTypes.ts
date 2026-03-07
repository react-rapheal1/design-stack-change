type CsvUploadStage = "upload" | "mapping" | "done";

const mappingRows = [
  { csv: "Device Name", rayda: "Device name" },
  { csv: "Serial No.", rayda: "Serial number" },
  { csv: "Assigned To", rayda: "Assigned employee" },
  { csv: "Condition", rayda: "Device condition" },
];

export { mappingRows };
export type { CsvUploadStage };
