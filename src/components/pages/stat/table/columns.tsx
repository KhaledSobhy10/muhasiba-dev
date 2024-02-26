import { TaskWithHistory } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { arEG } from "date-fns/locale";
import { format } from "date-fns";

//@ts-nocheck

export const columns: ColumnDef<TaskWithHistory>[] = [
  {
    accessorKey: "title",
    header: "الأعمال",
  },

  {
    accessorKey: "completed",
    header: "اليوم",
    cell: ({ row }) =>
      row.getValue("completed") ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
  },
];

const formateDate = (dateString: string) => {
  const dateParts = dateString.split("/").reverse(); // Reverse to get year first
  const date = new Date(dateParts.join("-")); // Create a Date object
  return format(date, "EEEE dd MMMM yyyy", {
    locale: arEG,
  });
};

export const getColumns = (dates: string[]): ColumnDef<TaskWithHistory>[] => {
  const datesColumns = dates.map((date) => {
    return {
      accessorKey: `history`,
      header: formateDate(date.split("_")[1]),
      cell: ({ row }: { row: Row<TaskWithHistory> }) =>
        // @ts-ignore
        row.getValue(`history`)[date] ? <CheckIcon /> : <CrossIcon />,
    };
  });
  return [
    {
      accessorKey: "title",
      header: "الأعمال",
    },
    ...datesColumns,
  ];
};

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-green-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-red-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
    />
  </svg>
);