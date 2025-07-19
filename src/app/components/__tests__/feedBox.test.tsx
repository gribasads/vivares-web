import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FeedBox from '../feedBox'

describe('FeedBox Component', () => {
  it('renderiza com todas as informações', () => {
    render(
      <FeedBox
        userName="João Silva"
        timeAgo="há 2 horas"
        content="Esta é uma mensagem de teste no feed."
      />
    )
    
    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('há 2 horas')).toBeInTheDocument()
    expect(screen.getByText('Esta é uma mensagem de teste no feed.')).toBeInTheDocument()
  })

  it('renderiza avatar placeholder', () => {
    render(
      <FeedBox
        userName="Maria Santos"
        timeAgo="há 5 minutos"
        content="Conteúdo do feed"
      />
    )
    
    const container = screen.getByText('Maria Santos').closest('.bg-white')
    const avatar = container?.querySelector('.w-10.h-10')
    expect(avatar).toBeInTheDocument()
  })

  it('aplica classes CSS corretas', () => {
    render(
      <FeedBox
        userName="Teste"
        timeAgo="agora"
        content="Teste"
      />
    )
    
    const container = screen.getByText('Teste', { selector: 'h3' }).closest('.bg-white')
    expect(container).toHaveClass('bg-white', 'p-4', 'rounded-lg', 'shadow-sm')
  })

  it('renderiza nome do usuário como h3', () => {
    render(
      <FeedBox
        userName="Pedro Costa"
        timeAgo="há 1 dia"
        content="Mensagem"
      />
    )
    
    const userName = screen.getByText('Pedro Costa')
    expect(userName.tagName).toBe('H3')
    expect(userName).toHaveClass('font-medium')
  })

  it('renderiza tempo como texto pequeno e cinza', () => {
    render(
      <FeedBox
        userName="Ana"
        timeAgo="há 30 minutos"
        content="Mensagem"
      />
    )
    
    const timeAgo = screen.getByText('há 30 minutos')
    expect(timeAgo).toHaveClass('text-sm', 'text-gray-500')
  })

  it('renderiza conteúdo com margem inferior', () => {
    render(
      <FeedBox
        userName="Carlos"
        timeAgo="há 1 hora"
        content="Esta é uma mensagem longa que deve ser exibida corretamente no feed."
      />
    )
    
    const content = screen.getByText('Esta é uma mensagem longa que deve ser exibida corretamente no feed.')
    expect(content).toHaveClass('text-gray-800', 'mb-4')
  })

  it('renderiza múltiplos FeedBoxes corretamente', () => {
    const { rerender } = render(
      <FeedBox
        userName="Usuário 1"
        timeAgo="há 10 minutos"
        content="Primeira mensagem"
      />
    )
    
    expect(screen.getByText('Usuário 1')).toBeInTheDocument()
    expect(screen.getByText('Primeira mensagem')).toBeInTheDocument()
    
    rerender(
      <FeedBox
        userName="Usuário 2"
        timeAgo="há 20 minutos"
        content="Segunda mensagem"
      />
    )
    
    expect(screen.getByText('Usuário 2')).toBeInTheDocument()
    expect(screen.getByText('Segunda mensagem')).toBeInTheDocument()
  })
}) 