import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profil_Login.css';
import logo from './../../assets/logo.png';
import cart from './../../assets/shopping-cart.png';
import { useGetMealQuery } from '../../Services/Api/MealApi';
import { useAppSelector } from '../../redux/hook';
import Modal_Login from '../Modal_Login/Modal_Login';
import searchicon from './../../assets/search_icon.png'

function Profil_Login() {
  const { } = useGetMealQuery();

  const data = useAppSelector((state: any) => state.meal.meals);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const [searchQuery, setSearchQuery] = useState('');

  const [userName, setUserName] = useState('');

  const addRandomPrices = (meals: any[]) => {
    return meals.map(meal => ({
      ...meal,
      price: 10
    }));
  };

  const mealsWithPrices = addRandomPrices(data || []);

  const filteredMeals = mealsWithPrices.filter(meal =>
    meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (meal: any) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  const addToCart = (meal: any, quantity: number) => {
    const existingMealIndex = cartItems.findIndex(item => item.idCategory === meal.idCategory);

    if (existingMealIndex > -1) {
      const updatedCartItems = [...cartItems];
      const existingMeal = updatedCartItems[existingMealIndex];

      existingMeal.quantity += quantity;
      existingMeal.totalPrice = existingMeal.price * existingMeal.quantity;

      updatedCartItems[existingMealIndex] = existingMeal;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedMeal = { ...meal, quantity, totalPrice: meal.price * quantity };
      const updatedCart = [...cartItems, updatedMeal];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
  }, []);

  return (
    <>
      <div className='container_header'>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/profil_login'>
          <div className='logo_container'>
            <img className='logo' src={logo} alt="Logo" />
            <p className='logo_name'>MealOrder</p>
          </div>
        </Link>
        <div className='search_container'>
          <input
            className='search'
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img width={20} style={{ cursor: 'pointer' }} src={searchicon} />
        </div>
        <div className='user_cart_container'>
          <Link to="/cart_login">
            <img className='logo_cart' src={cart} alt="Cart" />
          </Link>
          <div className="dropdown">
            <p className="dropbtn">Hi, {userName}!</p>
            <div className="dropdown-content">
              <Link to='/'>Log out</Link>
            </div>
          </div>

        </div>
      </div>
      <hr />
      <div className='meal_list'>
        {filteredMeals.map((meal: any) => (
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
      <Modal_Login meal={selectedMeal} isOpen={isModalOpen} onClose={closeModal} onAddToCart={addToCart} />
    </>
  );
}

export default Profil_Login;
