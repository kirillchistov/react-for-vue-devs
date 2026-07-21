import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { logout } from '@/services/slices/auth-slice';

export function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>Вы вошли как {user?.email}.</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
