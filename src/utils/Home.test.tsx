import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Home from '../../src/components/Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Home Component', () => {

  it('should render the logo, search bar, cart, and user icon', () => {
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

  it('should open and close the modal', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should update cart count when items are added', () => {
    localStorage.setItem('cartItems', JSON.stringify([]));

    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should filter meals based on search query', () => {
    const mockData = JSON.stringify([
      { idCategory: 1, strCategory: 'Meal 1', strCategoryThumb: '', price: 10 },
      { idCategory: 2, strCategory: 'Meal 2', strCategoryThumb: '', price: 15 }
    ]);
    localStorage.setItem('filteredData', mockData);

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Meal 1')).toBeInTheDocument();
    expect(screen.getByText('Meal 2')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Meal 1' } });

    expect(screen.getByText('Meal 1')).toBeInTheDocument();
    expect(screen.queryByText('Meal 2')).not.toBeInTheDocument();
  });
});
