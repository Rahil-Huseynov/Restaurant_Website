import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Cart from '../../src/components/Cart/Cart';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
  localStorage.clear(); 
});

describe('Cart Component', () => {

  it('should render the logo, search bar, cart, and user icon', () => {
    render(
      <Router>
        <Cart />
      </Router>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByAltText('Cart')).toBeInTheDocument();
    expect(screen.getByAltText('User')).toBeInTheDocument();
  });

  it('should display cart items correctly and handle deletion', () => {
    const mockCartItems = [
      { idCategory: 1, strCategory: 'Meal 1', strCategoryThumb: '', price: 10, quantity: 2, totalPrice: 20 },
      { idCategory: 2, strCategory: 'Meal 2', strCategoryThumb: '', price: 15, quantity: 1, totalPrice: 15 }
    ];
    localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

    render(
      <Router>
        <Cart />
      </Router>
    );
    expect(screen.getByText('Total Price: 35')).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]); 

    expect(screen.queryByText('Meal 1')).not.toBeInTheDocument();
    expect(screen.getByText('Total Price: 15')).toBeInTheDocument();
  });

  it('should filter cart items based on search query', () => {
    const mockCartItems = [
      { idCategory: 1, strCategory: 'Meal 1', strCategoryThumb: '', price: 10, quantity: 2, totalPrice: 20 },
      { idCategory: 2, strCategory: 'Meal 2', strCategoryThumb: '', price: 15, quantity: 1, totalPrice: 15 }
    ];
    localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

    render(
      <Router>
        <Cart />
      </Router>
    )
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Meal 1' } });

  });



});
