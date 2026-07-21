import { useState } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { clearItems } from '@/services/slices/burger-slice';
import { submitOrder } from '@/utils/api';
import type { TBurgerItem } from '@/types';
import styles from './order-submit.module.css';

type TOrderStatus = 'idle' | 'pending' | 'success' | 'error';

interface OrderSubmitProps {
  items: TBurgerItem[];
}

export function OrderSubmit({ items }: OrderSubmitProps) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<TOrderStatus>('idle');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const handleSubmit = () => {
    // TODO:
    // 1. поставьте status в 'pending';
    // 2. вызовите submitOrder(items.map((item) => item.ingredient.id));
    // 3. в .then — запишите orderNumber из ответа через setOrderNumber,
    //    поставьте status в 'success' и задиспатчьте clearItems(), чтобы
    //    очистить конструктор;
    // 4. в .catch — поставьте status в 'error'.
  };

  if (status === 'success' && orderNumber !== null) {
    return (
      <div className={styles.wrapper} data-testid="order-success">
        <p>Заказ #{orderNumber} принят!</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handleSubmit} disabled={items.length === 0 || status === 'pending'}>
        {status === 'pending' ? 'Отправляем…' : 'Оформить заказ'}
      </button>
      {status === 'error' && (
        <p className={styles.error} role="alert">
          Не получилось оформить заказ. Попробуйте ещё раз.
        </p>
      )}
    </div>
  );
}
