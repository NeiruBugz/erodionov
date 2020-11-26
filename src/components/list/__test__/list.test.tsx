import React from 'react';
import { render } from '@testing-library/react';

import { List } from '../list';
import { LessonsMock } from '../../../mocks';

describe('List component tests', () => {
  it('should render component', () => {
    render(<List items={LessonsMock} title="Test list" onClick={jest.fn()}/>);
  });

  it('should handle click on list item', () => {
    render(<List items={LessonsMock} title="Test list" onClick={jest.fn()}/>);
  });
});