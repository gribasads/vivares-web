import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import VerificationCodeInput from '../VerificationCodeInput'

describe('VerificationCodeInput Component', () => {
  it('renderiza 6 campos de input', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(6)
  })

  it('permite digitar apenas um caractere por campo', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    const firstInput = inputs[0] as HTMLInputElement
    
    fireEvent.change(firstInput, { target: { value: '1' } })
    
    expect(firstInput.value).toBe('1')
  })

  it('move foco para próximo campo quando dígito é inserido', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    const firstInput = inputs[0] as HTMLInputElement
    const secondInput = inputs[1] as HTMLInputElement
    
    fireEvent.change(firstInput, { target: { value: '1' } })
    
    expect(document.activeElement).toBe(secondInput)
  })

  it('move foco para campo anterior quando backspace é pressionado em campo vazio', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    const firstInput = inputs[0] as HTMLInputElement
    const secondInput = inputs[1] as HTMLInputElement
    
    // Preenche primeiro campo
    fireEvent.change(firstInput, { target: { value: '1' } })
    
    // Vai para segundo campo
    fireEvent.change(secondInput, { target: { value: '2' } })
    
    // Limpa segundo campo
    fireEvent.change(secondInput, { target: { value: '' } })
    
    // Pressiona backspace no campo vazio
    fireEvent.keyDown(secondInput, { key: 'Backspace' })
    
    expect(document.activeElement).toBe(firstInput)
  })

  it('chama onComplete quando todos os campos são preenchidos', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    
    // Preenche todos os campos
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } })
    })
    
    expect(handleComplete).toHaveBeenCalledWith('123456')
  })

  it('aplica classes CSS corretas aos inputs', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => {
      expect(input).toHaveClass(
        'w-12',
        'h-12',
        'text-center',
        'text-xl',
        'border-2',
        'border-[#e8eef9]',
        'rounded-xl',
        'bg-[#f8fafd]'
      )
    })
  })

  it('aplica classes CSS corretas ao container', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const container = screen.getAllByRole('textbox')[0].closest('.flex')
    expect(container).toHaveClass('flex', 'gap-2', 'justify-center')
  })

  it('define maxLength como 1 em todos os inputs', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => {
      expect(input).toHaveAttribute('maxLength', '1')
    })
  })

  it('define type como text em todos os inputs', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'text')
    })
  })

  it('não chama onComplete quando campos estão incompletos', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    
    // Preenche apenas 3 campos
    inputs.slice(0, 3).forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } })
    })
    
    expect(handleComplete).not.toHaveBeenCalled()
  })

  it('chama onComplete apenas uma vez quando código é completado', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    
    // Preenche todos os campos
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } })
    })
    
    expect(handleComplete).toHaveBeenCalledTimes(1)
  })

  it('mantém foco no último campo quando código é completado', () => {
    const handleComplete = jest.fn()
    render(<VerificationCodeInput onComplete={handleComplete} />)
    
    const inputs = screen.getAllByRole('textbox')
    const lastInput = inputs[5] as HTMLInputElement
    
    // Preenche todos os campos
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } })
    })
    
    expect(document.activeElement).toBe(lastInput)
  })
}) 