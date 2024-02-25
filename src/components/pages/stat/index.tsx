import { NavLink } from "react-router-dom";
import { DataTable } from "./table/data-table";
import { getColumns } from "./table/columns";
import { Category } from "@/types";
import { format } from "date-fns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { mergeCategoriesAndTasks } from "./table/helpers";

type Props = {};

enum Duration {
  Today = "today",
  Last3Days = "last_3d",
  Last7Days = "last_7d",
}
const getTasksByDuration = (duration: Duration) => {
  switch (duration) {
    case Duration.Today:
      return getTasksByDateRange(1); // Get tasks for last 3 days
    case Duration.Last3Days:
      return getTasksByDateRange(3); // Get tasks for last 3 days
    case Duration.Last7Days:
      return getTasksByDateRange(7); // Get tasks for last 7 days
    default:
      return [];
  }
};

const getTasksByDateRange = (daysToSubtract: number) => {
  const endDate = new Date();
  const categoriesWithDate: Record<string, Category[]> = {};
  for (let i = 0; i < daysToSubtract; i++) {
    const currentDate = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
    const currentDateKey = `tasks_${format(currentDate, "dd/MM/yyyy")}_v1`;
    const storedData = localStorage.getItem(currentDateKey);
    console.log(
      `🚀 ~ getTasksByDateRange ~ currentDateKey: ${i}`,
      currentDateKey
    );
    if (storedData) {
      categoriesWithDate[currentDateKey] = JSON.parse(storedData)
        .categories as Category[];
    }
  }
  return mergeCategoriesAndTasks(categoriesWithDate);
};

const getDateRange = (duration: Duration) => {
  let daysToSubtract = 0;
  switch (duration) {
    case Duration.Today:
      daysToSubtract = 1;
      break;
    case Duration.Last3Days:
      daysToSubtract = 3;
      break;
    case Duration.Last7Days:
      daysToSubtract = 7;
      break;
    default:
      daysToSubtract = 0;
  }
  const endDate = new Date();
  const dates = [];
  for (let i = 0; i < daysToSubtract; i++) {
    const currentDate = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
    dates.push(`tasks_${format(currentDate, "dd/MM/yyyy")}_v1`);
  }
  return dates;
};

export default function Stat({}: Props) {
  const [duration, setDuration] = useState<Duration>(Duration.Today); // Set initial value
  const [categories, setCategories] = useState(getTasksByDuration(duration));
  const [dates, setDates] = useState([
    `tasks_${format(new Date(), "dd/MM/yyyy")}_v1`,
  ]);
  useEffect(() => {
    setDates(getDateRange(duration));
    setCategories(getTasksByDuration(duration));
  }, [duration]);
  console.log(`🚀 ~ Stat ~ categories: ${duration}`, categories);
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <NavLink to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </NavLink>
          <h2 className="border-b  text-3xl font-semibold  first:mt-0">
            التقارير
          </h2>
        </div>
        <div className="mt-2">
          <Select
            dir="rtl"
            defaultValue={duration}
            value={duration}
            onValueChange={(newDuration: Duration) => setDuration(newDuration)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر مدة التقرير" />
            </SelectTrigger>
            <SelectContent id="duration">
              <SelectItem value={Duration.Today}>اليوم</SelectItem>
              <SelectItem value={Duration.Last3Days}>آخر 3 أيام</SelectItem>
              <SelectItem value={Duration.Last7Days}>آخر 7 أيام</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs
        defaultValue={categories[0]?.id}
        className="max-w-full mt-4"
        dir="rtl"
      >
        <TabsList className="max-w-full flex flex-wrap h-fit">
          {categories.map(({ id, title }) => (
            <TabsTrigger value={id}>{title}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map(({ id, tasks }) => (
          <TabsContent value={id}>
            <DataTable columns={getColumns(dates)} data={tasks} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
