import { TodoItem, TodoItems } from './slice';


export const createItem = async (data: TodoItem): Promise<{ data: TodoItem }> => {
  const response = await fetch(
    '/api/todo',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
  const result = await response.json()

  return result
}

export const fetchItems = async (page: number, pageSize: number): Promise<TodoItems> => {
  const response = await fetch(
    `/api/todo?page=${page}&pageSize=${pageSize}`,
  )
  const result = await response.json()

  return result
}

export const updateItem = async (data: TodoItem): Promise<{ data: TodoItem }> => {
  const response = await fetch(
    `/api/todo/${data.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
  const result = await response.json()

  return result
}

export const deleteItem = async (id: string): Promise<{}> => {
  const response = await fetch(
    `/api/todo/${id}`,
    { method: 'DELETE' }
  )
  const result = await response.json()

  return result
}
