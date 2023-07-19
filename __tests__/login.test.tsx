import { render, screen } from '@testing-library/react'
import Login from '@/app/login/page'
import { Providers } from '@/lib/providers'

describe('Login', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {}
        };
      }
    });
  })

  it('renders login form', () => {
    render(<Login />, { wrapper: Providers })

    const emailInput = screen.getByPlaceholderText('Your email')
    expect(emailInput).toBeInTheDocument()

    const pwdInput = screen.getByPlaceholderText('Your password')
    expect(pwdInput).toBeInTheDocument()

    const loginBtn = screen.getByText('Login')
    expect(loginBtn).toBeInTheDocument()
  })
})