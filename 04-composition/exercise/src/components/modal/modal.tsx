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
    // TODO: подпишитесь на keydown у document и закрывайте модалку (onClose)
    // по нажатию Escape. Не забудьте отписаться в функции очистки — иначе
    // после закрытия модалки обработчик так и останется висеть на document
    // и сработает ещё раз для следующей открытой модалки, а то и не только.
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
