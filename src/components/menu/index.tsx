import React from 'react';

const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="sidemenu">
      {children}
    </aside>
  );
};

export { Menu };
