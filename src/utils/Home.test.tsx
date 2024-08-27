import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Home from '../../src/components/Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Home Component', () => {
  it('should render the component', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByAltText('Cart')).toBeInTheDocument();
    expect(screen.getByAltText('User')).toBeInTheDocument();
  });
  
});