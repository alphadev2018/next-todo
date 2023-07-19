'use client'

/* Core */
import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'

/* Instruments */
import {
  useSelector,
  useDispatch,
  selectTodoRowInProgress,
  updateTodoItem,
  TodoItem,
} from '@/lib/redux'


type PropsType = {
  row: TodoItem | null
  onClose: () => void
}

export const TodoModal: React.FC<PropsType> = ({
  row,
  onClose
}) => {
  const dispatch = useDispatch()
  const rowInProgress = useSelector(selectTodoRowInProgress)
  const [form] = Form.useForm()

  useEffect(() => {
    if (row) {
      form.setFieldValue('label', row.label)
    }
  }, [row])

  const onFinish =  async (values: { label: string }) => {
    if (
      await dispatch(
        updateTodoItem({
          ...row!,
          ...values,
        })
      )
    ) {
      onClose()
    }
  };

  return (
    <Modal
      title="Edit"
      open={Boolean(row)}
      okText="Save"
      okButtonProps={{
        disabled: rowInProgress === row?.id,
        loading: rowInProgress === row?.id,
      }}
      onOk={form.submit}
      onCancel={onClose}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="label"
          rules={[
            {
              required: true,
              message: 'This field is required!'
            }
          ]}
        >
          <Input placeholder="Type content here" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
