import CategoryItem from "./categoryItem";
import { useDateState, useTaskState } from "@/context/TaskContext";
import CreateCategory from "./createCategory";
import { DatePickerWithPresets } from "./datePicker";

type Props = {};
function isFriday(date: Date) {
  return date.getDay() === 5; // 5 corresponds to Friday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
}

export default function CategoriesContainer({}: Props) {
  const state = useTaskState();
  const dateState = useDateState();

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 mt-8">
      <div className="w-full flex justify-between">
        <DatePickerWithPresets />
        <CreateCategory />
      </div>
      {state?.categories
        .slice(
          0,
          isFriday(dateState.date)
            ? state.categories.length
            : state.categories.length - 1
        )
        .map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
    </div>
  );
}
