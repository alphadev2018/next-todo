'use client'

/* Core */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, List } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

/* Instruments */
import { TodoCard } from './components/TodoCard'
import { TodoForm } from './components/TodoForm'
import { TodoModal } from './components/TodoModal'
import {
  useDispatch,
  useSelector,
  selectTodoIsLoading,
  selectTodoItems,
  fetchTodoItems,
  updateTodoItem,
  deleteTodoItem,
  doLogout,
  TodoItem,
} from '@/lib/redux'
import styles from './styles/layout.module.css'

const pageSize = 10


export default function IndexPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectTodoItems)
  const isLoading = useSelector(selectTodoIsLoading)
  const [rowSelected, setRowSelected] = useState<TodoItem | null>(null)

  const source = useMemo(() => {
    const data = items.data.map((el) => ({ ...el, loading: false }))

    if (isLoading && data.length) {
      return [
        ...data,
        ...new Array(pageSize).fill(
          {
            label: '',
            isCompleted: false,
            loading: true
          }
        )
      ]
    }

    return data;
  }, [isLoading, items])

  const onLoadMore = useCallback(() => {
    dispatch(
      fetchTodoItems(Math.ceil(items.data.length / pageSize), pageSize)
    )
  }, [items.data.length])

  const onEdit = useCallback((row: TodoItem) => {
    setRowSelected(row)
  }, [])

  const onChangeStatus = useCallback((row: TodoItem) => {
    if (row.id) {
      dispatch(
        updateTodoItem({
          ...row,
          isCompleted: !row.isCompleted
        })
      )
    }
  }, [])

  const onDelete = useCallback((row: TodoItem) => {
    if (row.id) {
      dispatch(deleteTodoItem(row.id))
    }
  }, [])

  const onLogout = useCallback(() => {
    dispatch(doLogout())
  }, [])

  useEffect(() => {
    dispatch(fetchTodoItems(0, pageSize))
  }, [])

  return (
    <>
      <Button
        className={styles.btnLogout}
        type="ghost"
        icon={<LogoutOutlined />}
        onClick={onLogout}
      >
        Logout
      </Button>

      <TodoForm />

      <List
        loading={isLoading && !items.data.length}
        itemLayout="horizontal"
        loadMore={!isLoading && items.hasMore && (
          <div
            style={{
              textAlign: 'center',
              marginTop: 12,
              height: 32,
              lineHeight: '32px',
            }}
          >
            <Button onClick={onLoadMore}>Load more</Button>
          </div>
        )}
        dataSource={source}
        renderItem={(item) => (
          <TodoCard
            data={item}
            onEdit={() => onEdit(item)}
            onChangeStatus={() => onChangeStatus(item)}
            onDelete={() => onDelete(item)}
          />
        )}
      />

      <TodoModal
        row={rowSelected}
        onClose={() => setRowSelected(null)}
      />
    </>
  )
}
