import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modal-root') ?? document.body;

export function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal} role="dialog">
        <button className={styles.close} onClick={onClose} aria-label="Закрыть">
          ✕
        </button>
        {children}
      </div>
    </>,
    modalRoot,
  );
}
