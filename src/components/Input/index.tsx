import { InputHTMLAttributes } from 'react'
import { Container, InputStyle } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input({ ...rest }: InputProps) {
  return (
    <Container>
      <InputStyle {...rest} />
    </Container>
  )
}
