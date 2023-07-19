'use client'

/* Core */
import { useCallback } from 'react';
import { Button, Form, Input } from 'antd';

/* Instruments */
import {
  useDispatch,
  useSelector,
  selectAuthIsSubmitting,
  doLogin
} from '@/lib/redux';
import type { LoginData } from '@/lib/redux';
import styles from './styles.module.css'

export default function LoginPage() {
  const dispatch = useDispatch()
  const isSubmitting = useSelector(selectAuthIsSubmitting)

  const onFinish = useCallback((values: LoginData) => {
    dispatch(doLogin(values))
  }, [])

  return (
    <div className={styles.content}>
      <Form
        className={styles.form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'This field is required!'
            },
            {
              type: 'email',
              message: 'Please type valid email!'
            }
          ]}
        >
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'This field is required!'
            }
          ]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <div className={styles['text-center']}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  )
}
