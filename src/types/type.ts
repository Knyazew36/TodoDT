export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface todoSLiceInitial {
  todoList: ITodo[];
  filterStatus: string;
}
