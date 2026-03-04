import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@web/styles/Navbar.scss';

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const navItems: NavItem[] = [
  { to: '/calculator', label: '戰場計算機', end: true },
  { to: '/contact', label: 'Contact' },
];

const NavBar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Click outside to close (mobile)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (buttonRef && buttonRef.current?.contains(e.target as Node)) return;
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  return (
    <>
      {/* Sidebar */}
      <aside ref={sidebarRef} className={`sidebar${open ? ' is-open' : ''}`}>
        <div className="sidebar__header">
          <NavLink to="/" className="sidebar__brand" onClick={() => setOpen(false)}>
            ◎ Mabinogi Misc
          </NavLink>
        </div>

        <nav className="sidebar__nav" aria-label="Sidebar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'sidebar__link' + (isActive ? ' is-active' : '')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Floating hamburger (always visible on small screens) */}
      <div className="sidebar__mobile-toggle">
        <NavLink to="/" className="sidebar__brand" onClick={() => setOpen(false)}>
          ◎
        </NavLink>
        <button type="button" ref={buttonRef} className="" aria-label="Toggle menu" onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      {/* Optional backdrop (closes sidebar when clicked) */}
      {open && <div className="sidebar__backdrop" onClick={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
