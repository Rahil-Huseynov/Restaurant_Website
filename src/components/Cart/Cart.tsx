import { useEffect, useState } from 'react';
import user from './../../assets/user.png';
import logo from './../../assets/logo.png';
import cart from './../../assets/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Cart.css';
import searchicon from './../../assets/search_icon.png';
import OrderDetailsModal from '../OrderDetailsModal_Admin/OrderDetailsModal_Admin';

interface Meal {
    idCategory: number;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
    price?: number;
    quantity?: number;
    totalPrice?: number;
}

interface Order {
    items: Meal[];
    orderDate: string;
    address: string;
    totalPrice: number;
    userName: string;
    phone: string;
    paymentMethod:string;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<Meal[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [orderCount, setOrderCount] = useState<number>(0);


    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) setCartItems(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        const counter = cartItems.filter(item => item).length
        setOrderCount(counter)
    }, [cartItems])

    const handleDelete = (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        setOrderCount(updatedCartItems.length);
    };


    const totalPrice = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

    const filteredItems = cartItems.filter(item =>
        item.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };
    return (
        <>
            <div className='all_item_cart'>
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
                                <span style={{color:'white'}}>{orderCount}</span>
                            </Link>
                        </div>
                        <Link to='/profil'>
                            <img className='logo_cart' src={user} alt="User" />
                        </Link>
                    </div>
                </div>
                <hr />

                <div className="cart">
                    <h1 style={{ textAlign: 'center', color: 'white' }}>Shopping Cart</h1>
                    {filteredItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'white' }}>No items found.</p>
                    ) : (
                        <div className='all_items_cart_container'>
                            <div className='container'>
                                {filteredItems.map((item, index) => (
                                    <div key={index} className='container_item'>
                                        <div>
                                            <img width={100} src={item.strCategoryThumb} />
                                            <h3>{item.strCategory}</h3>
                                            <p>Price: ${item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Total: ${item.totalPrice}</p>
                                        </div>
                                        <div>
                                            <button className='button-24' onClick={() => handleDelete(index)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className='container_cart_buy_container'>
                                    <div className='container_cart_buy'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Meal</td>
                                                    <td>Price</td>
                                                    <td>Quantity</td>
                                                    <td>Total</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.strCategory}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.totalPrice}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className='TotalPriceContainer'>
                                            <p>Total Price: {totalPrice}</p>
                                        </div>
                                        <div>
                                            <div className='address_container'>
                                                <p className='address' style={{ color: 'white' }}>Your Address: </p>
                                                <input
                                                    className={`address_input ${!isAddressValid ? 'invalid' : ''}`}
                                                    type="text"
                                                    placeholder='Your Address'
                                                    value={address}
                                                    onChange={(e) => {
                                                        setAddress(e.target.value);
                                                        setIsAddressValid(true);
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className='phone_container'>
                                                <p className='address' style={{ color: 'white' }}>Phone: </p>
                                                <input
                                                    className={`address_input ${!isAddressValid ? 'invalid' : ''}`}
                                                    type="number"
                                                    placeholder='Phone'
                                                    value={phone}
                                                    onChange={(e) => {
                                                        setPhone(e.target.value);
                                                        setIsAddressValid(true);
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className='container_pay_method'>
                                                <div className="wrapper">
                                                    <input type="radio" id="option-1" name='pay' />
                                                    <input type="radio" id="option-2" name='pay' />
                                                    <label htmlFor="option-1" className="option option-1">
                                                        <div className="dot"></div>
                                                        <span>Pay To Cash</span>
                                                    </label>
                                                    <label htmlFor="option-2" className="option option-2">
                                                        <div className="dot"></div>
                                                        <span>Pay to Card</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='button_cart_container'>
                                            <Link className='button-79' to='/profil'>Place an order!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Cart;
