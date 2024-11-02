import { AxiosRequestConfig } from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { customAxios } from '@/api';
import { z } from 'zod';
import { todoSchema } from '@/models/todo';

export type TodosQueryKey = [
  string,
  {
    completed?: boolean;
    page?: number;
    limit?: number;
    sort: 'title' | 'date';
    order: 'asc' | 'desc';
  }
];

export const todosResponseSchema = z.object({
  todos: z.array(todoSchema),
  totalTodos: z.number(),
  hasNextPage: z.boolean(),
  nextPage: z.number().nullable(),
});

export type TodosResponse = z.infer<typeof todosResponseSchema>;

export const getTodos: QueryFunction<TodosResponse, TodosQueryKey> = async ({
  queryKey,
}) => {
  const [
    path,
    { completed, page = 1, limit = 10, sort = 'date', order = 'asc' },
  ] = queryKey;

  const apiPath = `/${path}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { completed, page, limit, sort, order },
  };

  const response = await customAxios.get<TodosResponse>(
    apiPath,
    axiosRequestConfig
  );

  return todosResponseSchema.parse(response.data);
};
