import { Card, CardContent } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import TaskItem from "./taskItem";
import { Category } from "@/types";
import { useState } from "react";

type Props = { category: Category; isOpen?: boolean };

export default function CategoryItem({ category, isOpen }: Props) {
  const [accordionOpen, setAccordionOpen] = useState(isOpen ? "item-1" : "");

  const toggleAccordion = () => {
    setAccordionOpen((prev) => (prev === "item-1" ? "" : "item-1"));
  };
  return (
    <Card className="w-full min-h-fit">
      <CardContent className="flex gap-2 flex-col justify-center items-start">
        <Accordion
          type="single"
          collapsible
          value={accordionOpen}
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl" onClick={toggleAccordion}>
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              {/* tasks */}
              <div className="flex flex-col gap-4">
                {category?.tasks.map((task) => (
                  <TaskItem taskDetails={task} key={task.id} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-4 flex justify-between items-center w-full">
          <div className="flex gap-2 ">
            <Badge
              className="bg-gray-500 cursor-pointer"
              onClick={() => toggleAccordion()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                />
              </svg>
              المهام {category.tasks.length}
            </Badge>
            <Badge className="cursor-pointer" onClick={() => toggleAccordion()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>{" "}
              تم {category?.tasks?.filter(({ completed }) => completed)?.length}
            </Badge>
          </div>
          {/* <CreateTask categoryId={category?.id} /> */}
        </div>
      </CardContent>
    </Card>
  );
}
