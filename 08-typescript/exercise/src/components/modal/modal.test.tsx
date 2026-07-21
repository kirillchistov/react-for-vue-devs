import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './modal';

describe('Modal', () => {
  it('рендерит children', () => {
    render(
      <Modal onClose={() => {}}>
        <p>Содержимое модалки</p>
      </Modal>,
    );
    expect(screen.getByText('Содержимое модалки')).toBeInTheDocument();
  });

  it('вызывает onClose по клику на оверлей', () => {
    const handleClose = vi.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Содержимое</p>
      </Modal>,
    );
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('вызывает onClose по нажатию Escape', () => {
    const handleClose = vi.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Содержимое</p>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });
});
