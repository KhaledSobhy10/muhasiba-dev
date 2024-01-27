import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Task } from "@/types";
import { useTaskDispatch } from "@/context/TaskContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
// import Fireworks from "@fireworks-js/react";
// import { useState } from "react";

type Props = { taskDetails: Task };

export default function TaskItem({ taskDetails }: Props) {
  const dispatch = useTaskDispatch();
  // const [showFireWorks, setShowFireWorks] = useState(false);

  return (
    <div className="items-top flex space-x-2 gap-2 relative">
      {/* {showFireWorks && (
        <div className="fixed top w-screen h-screen">
          <Fireworks
            options={{
              rocketsPoint: {
                min: 2,
                max: 5,
              },
            }}
          />
        </div>
      )} */}
      <Checkbox
        id={taskDetails.id}
        checked={taskDetails.completed}
        onCheckedChange={() => {
          // if (!taskDetails.completed) {
          //   setShowFireWorks(true);
          //   setTimeout(() => {
          //     setShowFireWorks(false);
          //   }, 3000);
          // }
          dispatch({
            taskId: taskDetails.id,
            type: taskDetails.completed ? "UNCOMPLETE_TASK" : "COMPLETE_TASK",
          });
        }}
      />
      <div className="grid grid-cols-3 gap-1.5 leading-none w-full">
        <label
          htmlFor={taskDetails.id}
          className=" cursor-pointer col-span-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {taskDetails.title}
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className=" w-fit justify-self-end">
              <Badge
                className={`${
                  taskDetails.completed ? "" : "bg-gray-400"
                } w-fit justify-self-end`}
              >
                {taskDetails.score}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>درجة</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
