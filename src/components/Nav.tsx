import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import LanguageToggle from './LanguageToggle';
import { Logo } from './Logo';

export function Nav() {
  const { t } = useTranslation();
  return (
    <header className="header">
      <nav className="nav">
        <Logo />
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}>
          {t('products')}
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive }) => (isActive ? 'active' : '')}>
          {t('applications')}
        </NavLink>
      </nav>
      <LanguageToggle />
    </header>
  );
}
