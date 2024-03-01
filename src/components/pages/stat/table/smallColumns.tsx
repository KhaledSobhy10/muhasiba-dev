import { ColumnDef } from "@tanstack/react-table";

import { TaskForReport } from "./helpers";
import TaskReportMessage, { FAILURE_RATE } from "../TaskReportMessage";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const smallColumns: ColumnDef<TaskForReport>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ArrowUpDown className="me-2 h-4 w-4" />
        الأعمال
      </Button>
    ),
    cell: ({ row }) => {
      return <TaskReportMessage task={row.original} />;
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const deficiencyRateA = rowA.original.completedNo / rowA.original.total;
      const deficiencyRateB = rowB.original.completedNo / rowB.original.total;

      return deficiencyRateA < deficiencyRateB
        ? 1
        : deficiencyRateA > deficiencyRateB
        ? -1
        : 0;
    },
    filterFn: (row, _, value) => {
      console.log("🚀 ~ value:", value);
      if (value === "" || value === "0") return true;
      const deficiencyRateA =
        (row.original.completedNo / row.original.total) * 100;
      console.log("🚀 ~ deficiencyRateA:", deficiencyRateA);
      let data = FAILURE_RATE.H;
      if (deficiencyRateA > 75) {
        data = FAILURE_RATE.L;
      } else if (deficiencyRateA >= 50) {
        data = FAILURE_RATE.M;
      }
      if (data.text === value) return true;
      return false;
    },
  },
];
