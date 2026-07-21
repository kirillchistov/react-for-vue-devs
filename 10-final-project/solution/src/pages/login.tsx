import { Navigate, useNavigate } from 'react-router-dom';
import { LoginForm, type LoginFormValues } from '@/components/login-form/login-form';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { login } from '@/services/slices/auth-slice';

export function LoginPage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(login({ email: values.email }));
    navigate('/profile');
  };

  return (
    <div>
      <h1>Вход</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
