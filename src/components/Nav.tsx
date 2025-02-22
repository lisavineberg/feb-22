import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import LanguageToggle from './LanguageToggle';
import { Logo } from './Logo';
import { LogoFR } from './LogoFr';

export function Nav() {
  const { t, i18n } = useTranslation();
  return (
    <header className="header">
      <nav className="nav">
        {i18n.language === 'en' ? <Logo /> : <LogoFR />}

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
