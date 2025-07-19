import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../button'

describe('Button Component', () => {
  it('renderiza corretamente com variante login', () => {
    render(<Button variant="login">Entrar</Button>)
    
    const button = screen.getByRole('button', { name: /entrar/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('w-full')
  })

  it('renderiza corretamente com variante primary', () => {
    render(<Button variant="primary">Salvar</Button>)
    
    const button = screen.getByRole('button', { name: /salvar/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-[linear-gradient(135deg,_#2b4c7e,_#1a1a2e)]')
  })

  it('chama onClick quando clicado', () => {
    const handleClick = jest.fn()
    render(<Button variant="primary" onClick={handleClick}>Clique aqui</Button>)
    
    const button = screen.getByRole('button', { name: /clique aqui/i })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('aplica classe disabled quando disabled é true', () => {
    render(<Button variant="primary" disabled>Botão Desabilitado</Button>)
    
    const button = screen.getByRole('button', { name: /botão desabilitado/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })

  it('aplica className customizada', () => {
    render(<Button variant="primary" className="custom-class">Botão Custom</Button>)
    
    const button = screen.getByRole('button', { name: /botão custom/i })
    expect(button).toHaveClass('custom-class')
  })

  it('define type correto', () => {
    render(<Button variant="primary" type="submit">Enviar</Button>)
    
    const button = screen.getByRole('button', { name: /enviar/i })
    expect(button).toHaveAttribute('type', 'submit')
  })
}) 