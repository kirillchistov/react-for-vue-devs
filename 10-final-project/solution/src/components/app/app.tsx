import { Route, Routes, useLocation, useNavigate, type Location } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { NavMenu } from '../nav-menu/nav-menu';
import { Modal } from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';
import { IngredientDetailsRoute } from '../ingredient-details-route/ingredient-details-route';
import { HomePage } from '@/pages/home';
import { IngredientPage } from '@/pages/ingredient-page';
import { FeedPage } from '@/pages/feed';
import { ProfilePage } from '@/pages/profile';
import { LoginPage } from '@/pages/login';
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
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModal}>
                <IngredientDetailsRoute />
              </Modal>
            }
          />
        </Routes>
      )}
    </main>
  );
}
