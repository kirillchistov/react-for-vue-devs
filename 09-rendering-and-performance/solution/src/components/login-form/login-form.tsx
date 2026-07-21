import { useState, type FormEvent } from 'react';
import { isValidEmail, isValidPassword } from '@/utils/validation';
import styles from './login-form.module.css';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const emailValid = isValidEmail(email);
  const passwordValid = isValidPassword(password);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (emailValid && passwordValid) {
      onSubmit({ email, password });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label>
        Email
        <input value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      {touched && !emailValid && <p className={styles.error}>Введите настоящий email</p>}

      <label>
        Пароль
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {touched && !passwordValid && <p className={styles.error}>Пароль должен быть не короче 6 символов</p>}

      <button type="submit">Войти</button>
    </form>
  );
}
