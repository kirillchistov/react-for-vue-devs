import { useState } from 'react';
import { LoginForm, type LoginFormValues } from '@/components/login-form/login-form';

export function LoginPage() {
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);

  const handleSubmit = (values: LoginFormValues) => {
    setLoggedInEmail(values.email);
  };

  if (loggedInEmail) {
    return <p>Добро пожаловать, {loggedInEmail}!</p>;
  }

  return (
    <div>
      <h1>Вход</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
