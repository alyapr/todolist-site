export interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date;
    user: { username: string; email: string };
    category: { name: string };
    isEditing?: boolean; // Properti untuk mode edit
  }
  
  export interface TodoResponse {
    message: string;
    todos: Todo[];
  }