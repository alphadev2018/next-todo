'use client'

/* Core */
import { Button, List, Skeleton, Typography } from 'antd'
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons'

/* Instruments */
import {
  useSelector,
  selectTodoRowInProgress,
} from '@/lib/redux'
import { TodoItem } from '@/lib/redux'


const { Text } = Typography
type PropsType = {
  data: TodoItem & { loading: boolean }
  onEdit: () => void
  onChangeStatus: () => void
  onDelete: () => void
}

export const TodoCard: React.FC<PropsType> = ({
  data,
  onEdit,
  onChangeStatus,
  onDelete,
}) => {
  const rowInProgress = useSelector(selectTodoRowInProgress)
  const { id, label, isCompleted, loading } = data

  return (
    <List.Item
      actions={[
        <Button
          key="edit" 
          type="ghost"
          icon={<EditOutlined />}
          disabled={rowInProgress === id}
          loading={rowInProgress === id}
          onClick={onEdit}
        />,
        <Button
          key="changeStatus" 
          type="ghost"
          icon={isCompleted ? <RollbackOutlined /> : <CheckOutlined />}
          disabled={rowInProgress === id}
          loading={rowInProgress === id}
          onClick={onChangeStatus}
        />,
        <Button
          key="delete" 
          type="ghost"
          icon={<DeleteOutlined />}
          disabled={rowInProgress === id}
          loading={rowInProgress === id}
          onClick={onDelete}
        />,
      ]}
    >
      <Skeleton title={false} loading={loading} active>
        <Text strong delete={isCompleted}>{label}</Text>
      </Skeleton>
    </List.Item>
  )
}
