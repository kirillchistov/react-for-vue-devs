import { useState, type FormEvent } from 'react';

interface Touched {
  name: boolean;
  message: boolean;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState<Touched>({ name: false, message: false });
  const [sent, setSent] = useState(false);

  const nameError = name.trim().length === 0 ? 'Как к вам обращаться?' : null;
  const messageError = message.trim().length < 10 ? 'Сообщение слишком короткое (минимум 10 символов)' : null;

  const handleBlur = (field: keyof Touched) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, message: true });
    if (!nameError && !messageError) {
      setSent(true);
    }
  };

  if (sent) {
    return <p>Спасибо, {name}! Сообщение получено.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя
        <input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => handleBlur('name')} />
      </label>
      {touched.name && nameError && <p role="alert">{nameError}</p>}

      <label>
        Сообщение
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => handleBlur('message')}
        />
      </label>
      {touched.message && messageError && <p role="alert">{messageError}</p>}

      <button type="submit">Отправить</button>
    </form>
  );
}
