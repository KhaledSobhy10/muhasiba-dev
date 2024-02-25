import { calculateCategorySums, useTaskState } from "@/context/TaskContext";
import { Progress } from "./ui/progress";
import { ModeToggle } from "./mode-toggle";
import InstallButton from "./installButton";

type Props = {};

export default function Header({}: Props) {
  const s = useTaskState();
  const calc = calculateCategorySums(s.categories);
  return (
    <header className="flex justify-between w-full sticky flex-wrap ">
      <div className="md:w-fit w-full flex  flex-col gap-2">
        <div className="md:w-fit w-full flex items-center gap-2">
          <ModeToggle />
          <h2 className="border-b  text-3xl font-semibold  first:mt-0">
            المحاسبة اليومية
          </h2>
          <InstallButton />
        </div>
        <div>اخر تحديث {process.env.BUILD_DATE} </div>
      </div>
      <div className="md:w-1/2 w-full flex flex-col justify-end items-end mt-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {`${calc.totalCurrentScore} / ${calc.totalMaxScore}`}
        </h4>
        <Progress value={(calc.totalCurrentScore / calc.totalMaxScore) * 100} />
      </div>
    </header>
  );
}
