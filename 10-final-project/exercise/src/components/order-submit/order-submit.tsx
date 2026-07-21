import { useState } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { clearItems } from '@/services/slices/burger-slice';
import { submitOrder, type TOrderResponse } from '@/utils/api';
import type { TBurgerItem } from '@/types';
import styles from './order-submit.module.css';

type TOrderStatus = 'idle' | 'pending' | 'success' | 'error';
type TLastOrder = Pick<TOrderResponse, 'orderNumber'>;

interface OrderSubmitProps {
  items: TBurgerItem[];
}

export function OrderSubmit({ items }: OrderSubmitProps) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<TOrderStatus>('idle');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [lastOrder, setLastOrder] = useLocalStorage<TLastOrder | null>('stellar-last-order', null);

  const handleSubmit = () => {
    setStatus('pending');
    submitOrder(items.map((item) => item.ingredient.id))
      .then((response) => {
        setOrderNumber(response.orderNumber);
        setStatus('success');
        setLastOrder({ orderNumber: response.orderNumber });
        dispatch(clearItems());
      })
      .catch(() => {
        setStatus('error');
      });
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
      {status === 'idle' && lastOrder && (
        <p className={styles.lastOrder} data-testid="last-order">
          Последний заказ на станции: #{lastOrder.orderNumber}
        </p>
      )}
    </div>
  );
}
