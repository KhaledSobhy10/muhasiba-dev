import { TaskForReport } from "./table/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TaskReportMessage = ({ task }: { task: TaskForReport }) => {
  const { title, completedNo, total } = task;
  const completionPercentage = (completedNo / total) * 100;

  return (
    <div className="m-2 flex gap-4 items-center">
      <PointToolTip completionPercentage={completionPercentage} />
      <span>{title}</span>
      {`${completedNo} / ${total}`}
    </div>
  );
};

export default TaskReportMessage;

export const FAILURE_RATE = {
  H: { color: "red", text: " تقصير كبير" },
  M: { color: "rgb(200 129 0)", text: " تقصير متوسط" },
  L: { color: "#ffc600", text: " تقصير قليل" },
};

const PointToolTip = ({
  completionPercentage,
}: {
  completionPercentage: number;
}) => {
  let data = FAILURE_RATE.H;
  if (completionPercentage > 75) {
    data = FAILURE_RATE.L;
  } else if (completionPercentage >= 50) {
    data = FAILURE_RATE.M;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: data.color }}
          ></span>
        </TooltipTrigger>
        <TooltipContent>{data.text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
