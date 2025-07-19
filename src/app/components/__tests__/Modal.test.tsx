import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from '../Modal'

describe('Modal Component', () => {
  it('não renderiza quando isOpen é false', () => {
    render(
      <Modal title="Teste" isOpen={false}>
        <p>Conteúdo do modal</p>
      </Modal>
    )
    
    expect(screen.queryByText('Teste')).not.toBeInTheDocument()
    expect(screen.queryByText('Conteúdo do modal')).not.toBeInTheDocument()
  })

  it('renderiza quando isOpen é true', () => {
    render(
      <Modal title="Modal Teste" isOpen={true}>
        <p>Conteúdo do modal</p>
      </Modal>
    )
    
    expect(screen.getByText('Modal Teste')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument()
  })

  it('renderiza com título correto', () => {
    render(
      <Modal title="Título Personalizado" isOpen={true}>
        <div>Conteúdo</div>
      </Modal>
    )
    
    const title = screen.getByText('Título Personalizado')
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H2')
  })

  it('chama onClose quando botão X é clicado', () => {
    const handleClose = jest.fn()
    render(
      <Modal title="Teste" isOpen={true} onClose={handleClose}>
        <div>Conteúdo</div>
      </Modal>
    )
    
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renderiza children corretamente', () => {
    render(
      <Modal title="Teste" isOpen={true}>
        <div data-testid="modal-content">
          <h3>Subtítulo</h3>
          <p>Parágrafo de teste</p>
        </div>
      </Modal>
    )
    
    expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    expect(screen.getByText('Subtítulo')).toBeInTheDocument()
    expect(screen.getByText('Parágrafo de teste')).toBeInTheDocument()
  })

  it('aplica classes CSS corretas', () => {
    render(
      <Modal title="Teste" isOpen={true}>
        <div>Conteúdo</div>
      </Modal>
    )
    
    const modalOverlay = screen.getByText('Teste').closest('.fixed')
    expect(modalOverlay).toHaveClass('fixed', 'inset-0', 'backdrop-blur-sm')
    
    const modalContent = screen.getByText('Teste').closest('.bg-white')
    expect(modalContent).toHaveClass('bg-white', 'rounded-lg')
  })
}) 