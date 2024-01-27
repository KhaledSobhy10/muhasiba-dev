import { Category, Task } from "@/types";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  Reducer,
} from "react";
import data from "../assets/data.json";
import { format } from "date-fns";

// Import your Task and Category types here...
type State = {
  categories: Category[];
};
export type Action =
  | { type: "COMPLETE_TASK"; taskId: string }
  | { type: "UNCOMPLETE_TASK"; taskId: string }
  | { type: "ADD_CATEGORY"; category: Category }
  | { type: "ADD_TASK_TO_CATEGORY"; categoryId: string; task: Task }
  | {
      type: "INITIAL";
      state: State;
    };

type Dispatch = (action: Action) => void;

const DateStateContext = createContext<
  { date: Date; changeDate: (date: Date) => void } | undefined
>(undefined);

const TaskStateContext = createContext<State | undefined>(undefined);
const TaskDispatchContext = createContext<Dispatch | undefined>(undefined);
const taskReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return action.state;
    case "COMPLETE_TASK":
      return {
        ...state,
        categories: state.categories.map((category) => {
          const updatedTasks = category.tasks.map((task) =>
            task.id === action.taskId
              ? {
                  ...task,
                  completed: true,
                  completeDate: new Date().toISOString(),
                }
              : task
          );
          const currentScore = updatedTasks.reduce(
            (sum, task) => sum + (task.completed ? task.score : 0),
            0
          );
          return {
            ...category,
            tasks: updatedTasks,
            currentScore,
          };
        }),
      };

    case "UNCOMPLETE_TASK":
      return {
        ...state,
        categories: state.categories.map((category) => {
          const updatedTasks = category.tasks.map((task) =>
            task.id === action.taskId
              ? { ...task, completed: false, completeDate: undefined }
              : task
          );
          const currentScore = updatedTasks.reduce(
            (sum, task) => sum + (task.completed ? task.score : 0),
            0
          );
          return {
            ...category,
            tasks: updatedTasks,
            currentScore,
          };
        }),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.category],
      };
    case "ADD_TASK_TO_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.categoryId
            ? {
                ...category,
                tasks: [...category.tasks, action.task],
                maxScore: category.maxScore + action.task.score,
              }
            : category
        ),
      };
    default:
      return state;
  }
};

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const changeDate = (newDate: Date) => {
    setDate(newDate);
  };
  const currentDate = format(date, "dd/MM/yyyy");
  const localStorageKey = `tasks_${currentDate}_v1`;
  const storedData = localStorage.getItem(localStorageKey);

  const [state, dispatch] = useReducer(taskReducer, storedData ?  JSON.parse(storedData) : data);

  // Update localStorage whenever the state changes
  useEffect(() => {

    if (!storedData) {
      dispatch({ type: "INITIAL", state: data });
    } else {
      dispatch({ type: "INITIAL", state: JSON.parse(storedData) });
    }
  }, [localStorageKey]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        <DateStateContext.Provider value={{ date, changeDate }}>
          {children}
        </DateStateContext.Provider>
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
};

const useTaskState = (): State => {
  const context = useContext(TaskStateContext);
  if (context === undefined) {
    console.error("useTaskState must be used within a TaskProvider");
    return data;
  }
  return context;
};

const useTaskDispatch = (): Dispatch => {
  const context = useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within a TaskProvider");
  }
  return context;
};

const useDateState = (): { date: Date; changeDate: (date: Date) => void } => {
  const context = useContext(DateStateContext);
  if (context === undefined) {
    console.error(
      "DateStateContext must be used within a DateStateContextProvider"
    );
    throw new Error(
      "useDateState must be used within a DateStateContextProvider"
    );
  }
  return context;
};

const calculateCategorySums = (categories: Category[]) => {
  const totalMaxScore = categories.reduce(
    (sum, category) => sum + category.maxScore,
    0
  );
  const totalCurrentScore = categories.reduce(
    (sum, category) => sum + category.currentScore,
    0
  );
  return { totalMaxScore, totalCurrentScore };
};

const addCategory = (dispatch: Dispatch, category: Category) => {
  dispatch({ type: "ADD_CATEGORY", category });
};

const addTaskToCategory = (
  dispatch: Dispatch,
  categoryId: string,
  task: Task
) => {
  dispatch({ type: "ADD_TASK_TO_CATEGORY", categoryId, task });
};

export {
  TaskProvider,
  useTaskState,
  useTaskDispatch,
  addCategory,
  calculateCategorySums,
  addTaskToCategory,
  useDateState,
};
