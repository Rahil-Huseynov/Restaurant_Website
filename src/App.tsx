import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import user from './assets/user.png'
import searchicon from './assets/search_icon.png'
import cart from './assets/shopping-cart.png'
import { useAppSelector } from './redux/hook'
import { useGetMealQuery } from './Services/Api/MealApi'
import Modal from './components/Modal/Modal'

function App() {
  useGetMealQuery()

  const data = useAppSelector((state) => state.meal.meals)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<any>(null)
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>(() => {
    const savedFilteredData = localStorage.getItem('filteredData')
    return savedFilteredData ? JSON.parse(savedFilteredData) : []
  })

  const addRandomPrices = (meals: any[]) => {
    return meals.map(meal => ({
      ...meal,
      price: 10
    }))
  }

  useEffect(() => {
    if (data && !filteredData.length) {
      const mealsWithPrices = addRandomPrices(data)
      const initialFilteredMeals = mealsWithPrices.filter(meal =>
        meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredData(initialFilteredMeals)
      localStorage.setItem('filteredData', JSON.stringify(initialFilteredMeals))
    }
  }, [data, filteredData.length, searchQuery])

  const openModal = (meal: any) => {
    setSelectedMeal(meal)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedMeal(null)
    setIsModalOpen(false)
  }

  const addToCart = (meal: any, quantity: number) => {
    const updatedMeal = { ...meal, quantity, totalPrice: meal.price * quantity }
    const updatedCart = [...cartItems, updatedMeal]
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  }

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: value }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isModalOpen])

  return (
    <>
      <div className='container_header'>
        <a style={{textDecoration:'none', color:'black'}} href="/">
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
          <Link to="/profil">
            <img className='logo_cart' src={cart} alt="Cart" />
          </Link>
          <Link to='/profil'>
            <img className='logo_cart' src={user} alt="User" />
          </Link>
        </div>
      </div>
      <hr />
      <div className='meal_list'>
        {filteredData.map((meal: any) => (
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
      <Modal meal={selectedMeal} isOpen={isModalOpen} onClose={closeModal} onAddToCart={addToCart} />
    </>
  )
}

export default App
