/* Core */
import { v4 as uuidv4 } from 'uuid'


let items: {[key: string]: any}[] = [];

export const get = () => items

export const insert = (data: {[key: string]: any}) => {
  const newItem = {
    id: uuidv4(),
    ...data,
  }
  items = [newItem, ...items]

  return newItem
}

export const update = (id: string, data: {[key: string]: any}) => {
  items = items.map((el) => {
    if (el.id === id) return data
    return el
  })

  return data
}

export const remove = (id: string) => {
  items = items.filter((el) => el.id !== id)
}
