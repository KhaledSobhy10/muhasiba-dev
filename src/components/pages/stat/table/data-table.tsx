import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FAILURE_RATE } from "../TaskReportMessage";
import { FilterIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { desc: true, id: "title" },
  ]);

  const [filter, setFilter] = useState<ColumnFiltersState>([
    { value: "", id: "title" },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setFilter,
    state: {
      sorting,
      columnFilters: filter,
    },
  });

  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-between w-full">
        <Select
          dir="rtl"
          defaultValue={""}
          value={table.getColumn("title")?.getFilterValue() as string}
          onValueChange={(val) => table.getColumn("title")?.setFilterValue(val)}
        >
          <SelectTrigger className="w-[180px] my-2">
            <FilterIcon className="w-3" />
            <SelectValue placeholder="تصفية" />
          </SelectTrigger>
          <SelectContent id="filter-rate">
            <SelectItem value={"0"}>{"الكل"}</SelectItem>

            {Object.entries(FAILURE_RATE).map(([_, r]) => (
              <SelectItem value={r.text}>{r.text}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-col">
          {Object.entries(FAILURE_RATE).map(([_, r]) => (
            <div className="flex items-center gap-2 text-xs ">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: r.color }}
              ></span>{" "}
              {r.text}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md border w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-start">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap   p-2 md:p-4 relative  items-center"
                      data-cell={cell.column.columnDef.header}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  لا توجد بيانات متاحة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 px-2 gap-2">
          {" "}
          {table.getState().pagination.pageIndex + 1}
          {" من  "} {table.getPageCount()}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="select-none"
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="select-none"
          >
            التالي
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
