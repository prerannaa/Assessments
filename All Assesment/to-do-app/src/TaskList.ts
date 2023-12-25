import { Task } from './Task';

export interface ITaskList {
  list: Task[];

  getTaskById: (id: string) => Task | null;
  getTaskByIndex: (index: number) => Task | null;

  addTask: (task: Task) => Task[];
}

export class TaskList implements ITaskList {
  list: Task[];

  constructor(tasks?: Task[]) {
    this.list = tasks || [];
  }

  addTask = (task: Task) => {
    this.list.push(task);

    return this.list;
  };

  removeTask = (id: string) => {
    const index = this.list.findIndex(item => item.id === id);

    if (index !== -1) {
        this.list.splice(index, 1);
    }
};

  getTaskById = (id: string) => {
    return this.list.find(item => item.id === id) || null;
  };

  getTaskByIndex = (index: number) => {
    return this.list[index] || null;
  };
}