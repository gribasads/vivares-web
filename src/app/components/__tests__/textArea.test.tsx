import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TextArea from '../textArea'

// Mock do Draft.js
jest.mock('draft-js', () => ({
  Editor: ({ placeholder }: any) => (
    <div data-testid="draft-editor">
      <textarea placeholder={placeholder} />
    </div>
  ),
  EditorState: {
    createEmpty: jest.fn(() => ({})),
    createWithContent: jest.fn(() => ({})),
  },
  ContentState: {
    createFromText: jest.fn(() => ({})),
  },
}))

// Mock do emoji-mart
jest.mock('@emoji-mart/react', () => ({
  __esModule: true,
  default: () => <div data-testid="emoji-picker" />,
}))

// Mock do emoji-mart/data
jest.mock('@emoji-mart/data', () => ({
  __esModule: true,
  default: {},
}))

// Mock do Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('TextArea Component', () => {
  it('renderiza o editor com placeholder padrão', () => {
    render(<TextArea />)
    
    expect(screen.getByTestId('draft-editor')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument()
  })

  it('renderiza com placeholder customizado', () => {
    render(<TextArea placeholder="Digite seu comentário..." />)
    
    expect(screen.getByPlaceholderText('Digite seu comentário...')).toBeInTheDocument()
  })

  it('renderiza com valor inicial', () => {
    render(<TextArea initialValue="Texto inicial" />)
    
    expect(screen.getByTestId('draft-editor')).toBeInTheDocument()
  })

  it('aplica classes CSS corretas', () => {
    render(<TextArea />)
    
    const container = screen.getByTestId('draft-editor').closest('.border')
    expect(container).toHaveClass('border', 'rounded-lg', 'p-4', 'bg-white')
  })

  it('renderiza input de arquivo oculto', () => {
    render(<TextArea />)
    
    const buttons = screen.getAllByRole('button')
    const fileInput = buttons[1].nextElementSibling
    expect(fileInput).toHaveClass('hidden')
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('accept', 'image/*')
  })

  it('renderiza loading state inicialmente', () => {
    render(<TextArea />)
    
    expect(screen.getByTestId('draft-editor')).toBeInTheDocument()
  })
}) 