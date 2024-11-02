import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  date: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;
export type NewTodo = Omit<Todo, 'id' | 'date'>;
