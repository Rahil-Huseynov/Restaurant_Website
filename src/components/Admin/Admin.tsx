import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import logo from './../../assets/logo.png';
import add from './../../assets/add_meals.png';
import order from './../../assets/order.png';
import searchicon from './../../assets/search_icon.png';
import Admin_Modal from '../Admin_Modal/Admin_Modal';
import Admin_AddMeals_Modal from '../Admin_AddMeals_Modal/Admin_AddMeals_Modal';

interface Meal {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
  price?: number;
  quantity?: number;
  totalPrice?: number;
}

function Admin() {
  const storedData = localStorage.getItem('filteredData');
  const data: Meal[] = storedData ? JSON.parse(storedData) : [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addMeals, setAddMeals] = useState<boolean>(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    const cartItemsParsed: Meal[] = cartItems ? JSON.parse(cartItems) : [];
    setOrderCount(cartItemsParsed.reduce((count, item) => count + (item.quantity || 0), 0));
  }, []);

  const addRandomPrices = (meals: Meal[]): Meal[] => {
    return meals.map(meal => ({
      ...meal,
      price: meal.price ?? 10,
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

  const openAddModal = () => {
    setAddMeals(true);
  };

  const closeAddModal = () => {
    setAddMeals(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEditMeal = (updatedMeal: Meal) => {
    const updatedMeals = data.map(meal =>
      meal.idCategory === updatedMeal.idCategory ? updatedMeal : meal
    );
    localStorage.setItem('filteredData', JSON.stringify(updatedMeals));
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  const handleDeleteMeal = (mealId: number) => {
    const updatedMeals = data.filter(meal => meal.idCategory !== mealId);
    localStorage.setItem('filteredData', JSON.stringify(updatedMeals));
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='container_header'>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin'>
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
          <img width={20} style={{ cursor: 'pointer' }} src={searchicon} alt="Search Icon" />
        </div>
        <div className='user_cart_container'>
          <div>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/admin/adminorders">
              <img className='logo_cart' src={order} alt="order" />
              <span>{orderCount}</span>
            </Link>
          </div>
          <div className="dropdown">
            <p className="dropbtn">Hi, Admin</p>
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
                <p>Price: ${meal.price}</p>
              </div>
              <div className='button_container'>
                <button className='button-24' onClick={() => openModal(meal)}>Edit</button>
              </div>
            </div>
          ))}
          <div className='meal_items'>
            <img width={200} src={add} alt="Add Meals" />
            <h3>Add Meals</h3>
            <div className='button_container'>
              <button className='button-24' onClick={openAddModal}>Add Meals</button>
            </div>
          </div>
          <Admin_Modal
            meal={selectedMeal}
            isOpen={isModalOpen}
            onClose={closeModal}
            onEditMeal={handleEditMeal}
            onDeleteMeal={handleDeleteMeal}
          />
          <Admin_AddMeals_Modal
            isOpen={addMeals}
            onClose={closeAddModal}
          />
        </div>
      </div>
    </>
  );
}

export default Admin;
