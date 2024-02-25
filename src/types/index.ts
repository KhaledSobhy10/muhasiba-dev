export type Task = {
  id: string;
  title: string;
  description: string;
  score: number;
  completed: boolean;
  completeDate?: string;
  priority: number;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  maxScore: number;
  currentScore: number;
  tasks: Task[];
  priority: number;
  dateMilliseconds?: number;
};
type DateHistory = {
  [key: string]: boolean; // Key is always a date string
};

export type TaskWithHistory = Task & {
  history: DateHistory; // Completion status for each date
};

export type CategoryWithHistory = {
  id: string;
  title: string;
  description: string;
  maxScore: number;
  currentScore: number;
  tasks: TaskWithHistory[];
  priority: number;
};
