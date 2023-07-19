'use client'

/* Core */
import { useCallback } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'

/* Instruments */
import {
  useSelector,
  useDispatch,
  selectTodoRowInProgress,
  createTodoItem,
} from '@/lib/redux'


export const TodoForm = () => {
  const dispatch = useDispatch()
  const rowInProgress = useSelector(selectTodoRowInProgress)
  const [form] = Form.useForm()

  const onFinish = useCallback(
    (values: { label: string }) => {
      dispatch(
        createTodoItem({
          ...values,
          isCompleted: false
        })
      )
      form.resetFields()
    },
    []
  )

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col flex={1}>
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
        </Col>
        <Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={rowInProgress === 'new'}
              disabled={rowInProgress === 'new'}
            >
              Add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
