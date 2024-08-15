import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profil_Login.css';
import logo from './../../assets/logo.png';
import cart from './../../assets/shopping-cart.png';
import Modal_Login from '../Modal_Login/Modal_Login';
import searchicon from './../../assets/search_icon.png';

interface Meal {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  price?: number;
  quantity?: number;
  totalPrice?: number;
}

function Profil_Login() {
  const storedData = localStorage.getItem('filteredData');
  const data: Meal[] = storedData ? JSON.parse(storedData) : [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [cartItems, setCartItems] = useState<Meal[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen]);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setUserName(savedName);
    }
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);

      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === savedName);

      if (userIndex !== -1) {
        const userCart = storedUsers[userIndex].cart || [];

        const updatedCart = [...userCart, ...parsedCartItems];

        storedUsers[userIndex].cart = updatedCart;

        localStorage.setItem('users', JSON.stringify(storedUsers));
        localStorage.removeItem('cartItems');
        setCartItems([]);
      }
    }

  }, []);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === userName);
    if (userIndex !== -1) {
      const userCart = storedUsers[userIndex].cart || [];
      setOrderCount(userCart.length);
      setCartItems(userCart);
    }
  }, [userName]);

  useEffect(() => {
    if (userName) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === userName);
      if (userIndex !== -1) {
        storedUsers[userIndex].cart = cartItems;
        localStorage.setItem('users', JSON.stringify(storedUsers));
      }
    }
  }, [cartItems, userName]);

  const addRandomPrices = (meals: Meal[]): Meal[] => {
    return meals.map(meal => ({
      ...meal,
      price: meal.price || 10,
    }));
  };

  const mealsWithPrices = addRandomPrices(data);

  const filteredMeals = mealsWithPrices.filter(meal =>
    meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  const addToCart = (meal: Meal, quantity: number) => {
    const existingMealIndex = cartItems.findIndex(item => item.idCategory === meal.idCategory);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === userName);

    if (existingMealIndex > -1) {
      const updatedCartItems = [...cartItems];

      const existingMeal = updatedCartItems[existingMealIndex];

      existingMeal.quantity = (existingMeal.quantity || 0) + quantity;

      existingMeal.totalPrice = existingMeal.price! * existingMeal.quantity;

      updatedCartItems[existingMealIndex] = existingMeal;

      setCartItems(updatedCartItems);

      if (userIndex !== -1) {

        storedUsers[userIndex].cart = updatedCartItems;

        localStorage.setItem('users', JSON.stringify(storedUsers));

      }
    } else {
      const updatedMeal: Meal = { ...meal, quantity, totalPrice: meal.price! * quantity };

      const updatedCart = [...cartItems, updatedMeal];

      setCartItems(updatedCart);

      if (userIndex !== -1) {

        storedUsers[userIndex].cart = updatedCart;

        localStorage.setItem('users', JSON.stringify(storedUsers));

      }
    }
    location.reload()
  };

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  return (
    <>
      <div className='container_header'>
        <a style={{ textDecoration: 'none', color: 'black' }} href='/profil_login'>
          <div className='logo_container'>
            <img className='logo' src={logo} alt="Logo" />
            <p className='logo_name'>MealOrder</p>
          </div>
        </a>
        <div className='search_container'>
          <input
            className='search'
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img width={20} style={{ cursor: 'pointer' }} src={searchicon} alt="Search Icon" />
        </div>
        <div className='user_cart_container'>
          <div>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/cart_login">
              <img className='logo_cart' src={cart} alt="Cart" />
              <span className='ordercount_profil_login'>{orderCount}</span>
            </Link>
          </div>
          <div className="dropdown">
            <p className="dropbtn">Hi, {userName}!</p>
            <div className="dropdown-content">
              <Link to='/home'>Log out</Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='container_all_items'>
        <div className='meal_list'>
          {filteredMeals.map((meal: Meal) => (
            <div className='meal_items' key={meal.idCategory}>
              <img width={200} src={meal.strCategoryThumb} alt={meal.strCategory} />
              <h3>{meal.strCategory}</h3>
              <div>
                <span>Quantity: </span>
                <input
                  type="number"
                  min="1"
                  value={quantities[meal.idCategory] || 1}
                  onChange={(e) => handleQuantityChange(meal.idCategory, parseInt(e.target.value))}
                  style={{ width: '50px' }}
                />
                <p>Price: ${meal.price}</p>
              </div>
              <div className='button_container'>
                <button className='button-24' onClick={() => addToCart(meal, quantities[meal.idCategory] || 1)}>Add to Cart</button>
                <button className='button-24' onClick={() => openModal(meal)}>Detail</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal_Login meal={selectedMeal} isOpen={isModalOpen} onClose={closeModal} onAddToCart={addToCart} />
    </>
  );
}

export default Profil_Login;
