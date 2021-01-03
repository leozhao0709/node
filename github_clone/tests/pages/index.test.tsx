import React from 'react';
import Home from '../../src/pages/index';
import { render } from '@testing-library/react';

describe('HomePage', () => {
  const getComponent = () => render(<Home />);

  it('should render Home Page', () => {
    const { container } = getComponent();
    expect(container).not.toBeNull();
  });
});
