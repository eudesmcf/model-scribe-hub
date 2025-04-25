
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Report {
  id: string;
  name: string;
  type: string;
}

export function ExportReportsCheckbox() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Example reports - replace with your actual reports data
  const reports: Report[] = [
    { id: "1", name: "Model Overview", type: "PDF" },
    { id: "2", name: "Session History", type: "Excel" },
    { id: "3", name: "Audit Log", type: "PDF" },
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map(report => report.id));
    }
    setSelectAll(!selectAll);
  };

  const handleReportSelect = (reportId: string) => {
    setSelectedReports(prev => {
      const isSelected = prev.includes(reportId);
      if (isSelected) {
        setSelectAll(false);
        return prev.filter(id => id !== reportId);
      } else {
        const newSelection = [...prev, reportId];
        setSelectAll(newSelection.length === reports.length);
        return newSelection;
      }
    });
  };

  const handleExport = () => {
    console.log("Exporting reports:", selectedReports);
    // Add your export logic here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={selectAll}
          onCheckedChange={handleSelectAll}
        />
        <label
          htmlFor="select-all"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select All Reports
        </label>
      </div>
      
      <div className="space-y-2">
        {reports.map(report => (
          <div key={report.id} className="flex items-center space-x-2">
            <Checkbox
              id={report.id}
              checked={selectedReports.includes(report.id)}
              onCheckedChange={() => handleReportSelect(report.id)}
            />
            <label
              htmlFor={report.id}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {report.name} ({report.type})
            </label>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleExport}
        disabled={selectedReports.length === 0}
        className="mt-4"
      >
        Export Selected Reports
      </Button>
    </div>
  );
}
