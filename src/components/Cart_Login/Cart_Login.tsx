import React, { useEffect, useState } from 'react'
import logo from './../../assets/logo.png'
import cart from './../../assets/shopping-cart.png'
import { Link } from 'react-router-dom'
import './Cart_Login.css'

const Cart_Login: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([])

    const [userName, setUserName] = useState('');

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems')

        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }

    }, [])

    const handleDelete = (index: number) => {

        const updatedCartItems = [...cartItems]

        updatedCartItems.splice(index, 1)

        setCartItems(updatedCartItems)

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }

    const filteredItems = cartItems.filter(item =>

        item.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
            <div className="cart">
                <h1 style={{ textAlign: 'center' }}>Shopping Cart</h1>
                {filteredItems.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No items found.</p>
                ) : (
                    <div className='container'>
                        {filteredItems.map((item, index) => (
                            <div key={index} className='container_item'>
                                <div>
                                    <img width={100} src={item.strCategoryThumb} alt={item.strCategory} />
                                    <h3>{item.strCategory}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Total: ${item.totalPrice}</p>
                                </div>
                                <div>
                                    <button className='delete_button' onClick={() => handleDelete(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Cart_Login