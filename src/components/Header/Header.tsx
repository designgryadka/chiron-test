import React from 'react';
import { Tag } from '../Tag/Tag';
import { ProfileMenu, type ThemeName } from '../ProfileMenu/ProfileMenu';
import '../Avatar/Avatar.css';
import './Header.css';

export interface HeaderNavItem {
  id: string;
  label: string;
}

export interface HeaderUser {
  name: string;
  avatarUrl?: string;
}

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  items?: HeaderNavItem[];
  /** id of the current page. */
  activeId?: string;
  onNavigate?: (id: string) => void;
  user?: HeaderUser;
  /** Show the XP tag next to the profile. */
  xp?: number;
  /** Show the coins tag next to the profile. */
  coins?: number;
  /** Current theme, shown in the profile menu. */
  theme?: ThemeName;
  /** If set, the avatar opens the profile menu with the theme switch. */
  onThemeChange?: (theme: ThemeName) => void;
}

export const defaultNavItems: HeaderNavItem[] = [
  { id: 'learning', label: 'Моё обучение' },
  { id: 'challenges', label: 'Челленджи' },
  { id: 'knowledge', label: 'База знаний' },
  { id: 'rewards', label: 'Награды' },
  { id: 'rating', label: 'Рейтинг' },
  { id: 'policies', label: 'Политики' },
];

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Current page. */
  active?: boolean;
  /** Force the hover look. Only for documentation and visual review. */
  state?: 'hover';
}

/** Figma: «Nav item» (State: Default / Hover / Active). */
export function NavItem({ active = false, state, className, type = 'button', children, ...rest }: NavItemProps) {
  return (
    <button
      {...rest}
      type={type}
      className={['chiron-nav-item', active && 'is-active', state && `is-${state}`, className]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </button>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

export function Header({
  items = defaultNavItems,
  activeId = items[0]?.id,
  onNavigate,
  user,
  xp,
  coins,
  theme = 'light',
  onThemeChange,
  className,
  ...rest
}: HeaderProps) {
  // One dropdown at a time: the profile menu or (narrow screens) the section menu.
  const [openMenu, setOpenMenu] = React.useState<'profile' | 'nav' | null>(null);
  const menuOpen = openMenu === 'profile';
  const navOpen = openMenu === 'nav';
  const profileRef = React.useRef<HTMLDivElement>(null);
  const avatarButtonRef = React.useRef<HTMLButtonElement>(null);
  const burgerRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();
  const navMenuId = React.useId();

  // Close on outside click and on Escape (focus goes back to the button that opened it).
  React.useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        (openMenu === 'nav' ? burgerRef : avatarButtonRef).current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  const avatar = user && (
    <span className="chiron-avatar" title={onThemeChange ? undefined : user.name}>
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={onThemeChange ? '' : user.name} />
      ) : (
        <span aria-label={onThemeChange ? undefined : user.name}>{initials(user.name)}</span>
      )}
    </span>
  );

  return (
    <header {...rest} className={['chiron-header', className].filter(Boolean).join(' ')}>
      <a className="chiron-header__logo t-heading-h1" href="#" onClick={(e) => e.preventDefault()}>
        Chiron
      </a>

      <nav className="chiron-header__nav" aria-label="Основная навигация">
        {items.map((item) => {
          return (
            <NavItem key={item.id} active={item.id === activeId} onClick={() => onNavigate?.(item.id)}>
              {item.label}
            </NavItem>
          );
        })}
      </nav>

      <div className="chiron-header__profile" ref={profileRef}>
        {xp !== undefined && <Tag kind="xp" value={xp} />}
        {coins !== undefined && <Tag kind="coins" value={coins} />}

        {/* Narrow screens (Figma «Урок 6 · Планшет 768 / Мобильный 390»): the menu moves under a burger. */}
        <div className="chiron-header__burger-wrap">
          <button
            ref={burgerRef}
            type="button"
            className="chiron-header__burger"
            aria-label="Меню разделов"
            aria-haspopup="menu"
            aria-expanded={navOpen}
            aria-controls={navOpen ? navMenuId : undefined}
            onClick={() => setOpenMenu((current) => (current === 'nav' ? null : 'nav'))}
          >
            <span />
            <span />
            <span />
          </button>
          {navOpen && (
            <nav id={navMenuId} className="chiron-header__menu chiron-nav-menu" aria-label="Основная навигация">
              {items.map((item) => (
                <NavItem
                  key={item.id}
                  active={item.id === activeId}
                  onClick={() => {
                    setOpenMenu(null);
                    onNavigate?.(item.id);
                  }}
                >
                  {item.label}
                </NavItem>
              ))}
            </nav>
          )}
        </div>

        {user && !onThemeChange && avatar}
        {user && onThemeChange && (
          <div className="chiron-header__account">
            <button
              ref={avatarButtonRef}
              type="button"
              className="chiron-header__avatar-button"
              aria-label={`Меню профиля: ${user.name}`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              onClick={() => setOpenMenu((current) => (current === 'profile' ? null : 'profile'))}
            >
              {avatar}
            </button>
            {menuOpen && (
              <ProfileMenu
                id={menuId}
                role="menu"
                aria-label="Профиль"
                className="chiron-header__menu"
                theme={theme}
                onThemeChange={onThemeChange}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
