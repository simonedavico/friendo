import { Todo } from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

// TODO: we should add a validation layer for the response,
// such as zod or io-ts

export const deleteTodo = async (_todo: Todo) => {
  fetch(`${baseUrl}/${_todo.id}`, {
    method: 'DELETE',
  });
};

export const completeTodo = async (todo: Todo): Promise<Todo> => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: true,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => res.json());
};

export const addTodo = async ({
  friendId,
  todoText,
}: {
  friendId: number;
  todoText: string;
}): Promise<Todo> => {
  return fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      userId: friendId,
      title: todoText,
      completed: false,
    }),
  }).then((res) => res.json());
};

export const fetchTodos = async (): Promise<Todo[]> => {
  return fetch(baseUrl, {
    method: 'GET',
  }).then((res) => res.json());
};
