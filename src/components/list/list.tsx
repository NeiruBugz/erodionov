import React from 'react';
import { ListProps } from '../../types';

const List = ({ items, title, onClick }: ListProps) => {
  return (
    <section>
      <h3>{title}</h3>
      <ol>
        {items.map(({ sha, name, url }) =>
          <li
            key={sha}
          >
            <button type="button" onClick={() => onClick(url)}>{name.slice(3, name.length - 3)}</button>
          </li>)}
      </ol>
    </section>
  );
};

export { List };
