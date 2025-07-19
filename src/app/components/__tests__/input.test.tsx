import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from '../input'

describe('Input Component', () => {
  it('renderiza corretamente com label e placeholder', () => {
    render(
      <Input
        label="Email"
        placeholder="Digite seu email"
        type="email"
        id="email"
      />
    )
    
    const label = screen.getByText('Email')
    const input = screen.getByPlaceholderText('Digite seu email')
    
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
  })

  it('aplica valor quando fornecido', () => {
    const handleChange = jest.fn()
    render(
      <Input
        label="Nome"
        placeholder="Digite seu nome"
        type="text"
        id="nome"
        value="João Silva"
        onChange={handleChange}
      />
    )
    
    const input = screen.getByDisplayValue('João Silva')
    expect(input).toBeInTheDocument()
  })

  it('chama onChange quando valor é alterado', () => {
    const handleChange = jest.fn()
    render(
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        id="senha"
        onChange={handleChange}
      />
    )
    
    const input = screen.getByPlaceholderText('Digite sua senha')
    fireEvent.change(input, { target: { value: '123456' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('associa label com input através do id', () => {
    render(
      <Input
        label="Telefone"
        placeholder="Digite seu telefone"
        type="tel"
        id="telefone"
      />
    )
    
    const label = screen.getByText('Telefone')
    const input = screen.getByLabelText('Telefone')
    
    expect(label).toHaveAttribute('for', 'telefone')
    expect(input).toHaveAttribute('id', 'telefone')
  })

  it('aplica classes CSS corretas', () => {
    render(
      <Input
        label="Teste"
        placeholder="Teste"
        type="text"
        id="teste"
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('w-full')
    expect(input).toHaveClass('p-5')
    expect(input).toHaveClass('border-2')
  })
}) 