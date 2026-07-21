import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClick: () => void;
}

export function ModalOverlay({ onClick }: ModalOverlayProps) {
  return <div className={styles.overlay} onClick={onClick} data-testid="modal-overlay" />;
}
