import CategoryItem from "./categoryItem";
import { useTaskState } from "@/context/TaskContext";
import CreateCategory from "./createCategory";
import { DatePickerWithPresets } from "./datePicker";

type Props = {};

export default function CategoriesContainer({}: Props) {
  const state = useTaskState();

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 mt-8">
      <div className="w-full flex justify-between">
       <DatePickerWithPresets/>
        <CreateCategory />
      </div>
      {state?.categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
}
