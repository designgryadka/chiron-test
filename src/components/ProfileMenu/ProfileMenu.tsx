import React from 'react';
import { Icon } from '../../icons/Icon';
import './ProfileMenu.css';

export type ThemeName = 'light' | 'dark';

export interface ProfileMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  theme: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
}

const themeOptions: { value: ThemeName; label: string }[] = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Тёмная' },
];

/** Profile dropdown: link to the profile (not active yet) and the theme switch. */
export function ProfileMenu({ theme, onThemeChange, className, ...rest }: ProfileMenuProps) {
  return (
    <div {...rest} className={['chiron-profile-menu', className].filter(Boolean).join(' ')}>
      {/* The profile page does not exist yet: the link is shown but disabled. */}
      <a className="chiron-profile-menu__item t-label-default" role="menuitem" aria-disabled="true">
        <Icon name="user" size={20} color="var(--color-icon-secondary)" />
        Профиль
      </a>

      <hr className="chiron-profile-menu__divider" />

      <div className="chiron-profile-menu__theme">
        <span className="chiron-profile-menu__label t-caption-medium" id="chiron-profile-menu-theme">
          Тема
        </span>
        <div className="chiron-segmented" role="radiogroup" aria-labelledby="chiron-profile-menu-theme">
          {themeOptions.map((option) => {
            const selected = option.value === theme;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                className={['chiron-segmented__option t-label-default', selected && 'is-selected']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => !selected && onThemeChange?.(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
