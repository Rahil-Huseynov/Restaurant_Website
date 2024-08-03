import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import user from './../../assets/user.png';
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

function Home() {
  const storedData = localStorage.getItem('filteredData');

  const data: Meal[] = storedData ? JSON.parse(storedData) : [];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const [cartItems, setCartItems] = useState<Meal[]>(() => {

    const savedCart = localStorage.getItem('cartItems');

    return savedCart ? JSON.parse(savedCart) : [];

  });

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [orderCount, setorderCount] = useState<number>(0)

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen]);


  useEffect(() => {
    const counter = cartItems.filter(item => item).length
    setorderCount(counter)
  }, [cartItems])


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

    if (existingMealIndex > -1) {

      const updatedCartItems = [...cartItems];

      const existingMeal = updatedCartItems[existingMealIndex];

      existingMeal.quantity = (existingMeal.quantity || 0) + quantity;

      existingMeal.totalPrice = existingMeal.price! * existingMeal.quantity;

      updatedCartItems[existingMealIndex] = existingMeal;

      setCartItems(updatedCartItems);

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    } else {
      const updatedMeal: Meal = { ...meal, quantity, totalPrice: meal.price! * quantity };

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

  return (
    <>

      <div className='container_header'>
        <a style={{ textDecoration: 'none', color: 'black' }} href="/home">
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
          <img width={20} style={{ cursor: 'pointer' }} src={searchicon} />
        </div>
        <div className='user_cart_container'>
          <div>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/profil">
              <img className='logo_cart' src={cart} alt="Cart" />
              <span>{orderCount}</span>
            </Link>
          </div>
          <Link to='/profil'>
            <img className='logo_cart' src={user} alt="User" />
          </Link>
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
                <Link className='button-24' style={{ textDecoration: 'none' }} to='/profil' onClick={() => addToCart(meal, quantities[meal.idCategory] || 1)}>Add to Cart</Link>
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

export default Home;
