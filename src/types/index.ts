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
  currentScore:number;
  tasks: Task[];
  priority: number;
};

