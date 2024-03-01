import { Category, CategoryWithHistory } from "@/types";

export const mergeCategoriesAndTasks = (
  categoriesWithDate: Record<string, Category[]>
): CategoryWithHistory[] => {
  const mergedCategoriesMap: Record<string, CategoryWithHistory> = {};

  // Merge categories with the same ID
  Object.keys(categoriesWithDate).forEach((date) => {
    const categories = categoriesWithDate[date];
    categories.forEach((category) => {
      if (mergedCategoriesMap[category.id]) {
        // Merge tasks
        const existingCategory = mergedCategoriesMap[category.id];
        category.tasks.forEach((task) => {
          const existingTask = existingCategory.tasks.find(
            (t) => t.id === task.id
          );
          if (existingTask) {
            existingTask.completed = existingTask.completed || task.completed;
            existingTask.completeDate = existingTask.completed
              ? existingTask.completeDate
              : undefined;
            existingTask.history[date] = task.completed;
          } else {
            existingCategory.tasks.push({
              ...task,
              completeDate: task.completed ? date : undefined,
              history: { [date]: task.completed },
            });
          }
        });
      } else {
        // Create new category
        mergedCategoriesMap[category.id] = {
          ...category,
          tasks: category.tasks.map((task) => ({
            ...task,
            completeDate: task.completed ? date : undefined,
            history: { [date]: task.completed },
          })),
        };
      }
    });
  });

  // Convert the map to an array
  const mergedCategories: CategoryWithHistory[] =
    Object.values(mergedCategoriesMap);

  return mergedCategories;
};

export type TaskForReport = {
  title: string;
  completedNo: number;
  total: number;
};

type TaskMap = {
  [key: string]: TaskForReport;
};

export const mergeTasksByTitle = (
  categoriesWithDate: Record<string, Category[]>
): TaskMap => {
  const taskMap: TaskMap = {};
  // loop over categoriesWithDate
  Object.keys(categoriesWithDate).forEach((date) => {
    const categories = categoriesWithDate[date];
    categories.forEach((category) => {
      category.tasks.forEach((task) => {
        const isCompleted = task.completed ? 1 : 0;
        const savedTask = taskMap[task.title];
        if (savedTask) {
          taskMap[task.title] = {
            title: task.title,
            completedNo: savedTask.completedNo + isCompleted,
            total: savedTask.total + 1,
          };
        } else {
          taskMap[task.title] = {
            title: task.title,
            completedNo: isCompleted,
            total: 1,
          };
        }
      });
    });
  });

  return taskMap;
};
