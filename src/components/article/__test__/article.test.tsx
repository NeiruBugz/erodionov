import React from 'react';
import { render } from '@testing-library/react';

import { Article } from '../article';

describe('Article component', () => {
  it('should render component', () => {
    render(<Article body={'Text of the component'} title={'Test title'} sub={'Test sub'} />);
  })
});