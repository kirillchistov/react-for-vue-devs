import { Route, Routes, useLocation, useNavigate, type Location } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { NavMenu } from '../nav-menu/nav-menu';
import { Modal } from '../modal/modal';
import { IngredientDetailsRoute } from '../ingredient-details-route/ingredient-details-route';
import { HomePage } from '@/pages/home';
import { IngredientPage } from '@/pages/ingredient-page';
import { FeedPage } from '@/pages/feed';
import { ProfilePage } from '@/pages/profile';
import { NotFoundPage } from '@/pages/not-found';
import styles from './app.module.css';

interface NavigationState {
  background?: Location;
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as NavigationState | null)?.background;

  const closeModal = () => navigate(-1);

  return (
    <main className={styles.app}>
      <AppHeader />
      <NavMenu />
      {/*
        TODO: два блока <Routes>.

        1) Обычные маршруты, но со свойством location={background || location}.
           Если background есть (перешли на "/ingredients/:id" изнутри
           приложения, не напрямую по ссылке), React Router отрендерит эти
           маршруты так, будто адрес всё ещё background — то есть HomePage
           останется на экране и не размонтируется. Маршруты:
             "/"               -> <HomePage />
             "/ingredients/:id" -> <IngredientPage />
             "/feed"            -> <FeedPage />
             "/profile"         -> <ProfilePage />
             "*"                -> <NotFoundPage />

        2) Если background есть — второй <Routes> (уже без location, то есть
           по настоящему текущему URL) с одним маршрутом "/ingredients/:id",
           который рендерит <Modal onClose={closeModal}><IngredientDetailsRoute /></Modal>.
           Это и есть модальное окно поверх фона.
      */}
    </main>
  );
}
