import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Table } from '../Table'

describe('Table Component', () => {
  const mockHeaders = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ]

  const mockData = [
    <tr key="1">
      <td className="px-4 py-3">João Silva</td>
      <td className="px-4 py-3">joao@exemplo.com</td>
      <td className="px-4 py-3">Ativo</td>
    </tr>,
    <tr key="2">
      <td className="px-4 py-3">Maria Santos</td>
      <td className="px-4 py-3">maria@exemplo.com</td>
      <td className="px-4 py-3">Inativo</td>
    </tr>,
  ]

  it('renderiza cabeçalhos corretamente', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renderiza dados corretamente', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('joao@exemplo.com')).toBeInTheDocument()
    expect(screen.getByText('Ativo')).toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.getByText('maria@exemplo.com')).toBeInTheDocument()
    expect(screen.getByText('Inativo')).toBeInTheDocument()
  })

  it('renderiza cabeçalhos como elementos th', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(3)
    
    headers.forEach(header => {
      expect(header.tagName).toBe('TH')
    })
  })

  it('aplica classes CSS corretas aos cabeçalhos', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const headers = screen.getAllByRole('columnheader')
    headers.forEach(header => {
      expect(header).toHaveClass('px-4', 'py-3', 'text-left', 'text-sm', 'font-semibold')
    })
  })

  it('aplica classes CSS corretas ao container', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const container = screen.getByText('Nome').closest('.w-full')
    expect(container).toHaveClass('w-full', 'overflow-x-auto', 'shadow-md')
  })

  it('renderiza tabela com classes corretas', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const table = screen.getByRole('table')
    expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200', 'table-auto')
  })

  it('renderiza thead com classes corretas', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const thead = screen.getByText('Nome').closest('thead')
    expect(thead).toHaveClass('bg-gray-100')
  })

  it('renderiza tbody com classes corretas', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const tbody = screen.getByText('João Silva').closest('tbody')
    expect(tbody).toHaveClass('bg-white', 'divide-y', 'divide-gray-200')
  })

  it('renderiza tabela vazia sem dados', () => {
    render(<Table headers={mockHeaders} data={[]} />)
    
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    
    // Não deve ter dados
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
  })

  it('renderiza com diferentes tipos de dados', () => {
    const complexData = [
      <tr key="1">
        <td className="px-4 py-3">
          <div className="flex items-center">
            <span>João</span>
            <span className="ml-2 text-gray-500">Silva</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <button className="bg-blue-500 text-white px-2 py-1 rounded">
            Editar
          </button>
        </td>
      </tr>,
    ]

    const simpleHeaders = [
      { key: 'name', label: 'Nome' },
      { key: 'actions', label: 'Ações' },
    ]

    render(<Table headers={simpleHeaders} data={complexData} />)
    
    expect(screen.getByText('João')).toBeInTheDocument()
    expect(screen.getByText('Silva')).toBeInTheDocument()
    expect(screen.getByText('Editar')).toBeInTheDocument()
  })

  it('renderiza todos os cabeçalhos', () => {
    render(<Table headers={mockHeaders} data={mockData} />)
    
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(3)
    expect(headers[0]).toHaveTextContent('Nome')
    expect(headers[1]).toHaveTextContent('Email')
    expect(headers[2]).toHaveTextContent('Status')
  })
}) 