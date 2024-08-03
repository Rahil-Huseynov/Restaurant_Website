import { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import cart from './../../assets/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Cart_Login.css';
import searchicon from './../../assets/search_icon.png'


const Cart_Login = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const [order, setOrder] = useState<any[]>([]);

    const [userName, setUserName] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const [address, setAddress] = useState('');

    const [isAddressValid, setIsAddressValid] = useState(true);

    const [orderCount, setorderCount] = useState<number>(0)

    useEffect(() => {
        const counter = cartItems.filter(item => item).length
        setorderCount(counter)
    }, [cartItems])


    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');

        const savedOrders = localStorage.getItem('orders');

        const savedName = localStorage.getItem('name');

        if (savedCart) setCartItems(JSON.parse(savedCart));

        if (savedOrders) setOrder(JSON.parse(savedOrders));

        if (savedName) setUserName(savedName);
    }, []);

    const handleDelete = (index: number) => {
        const updatedCartItems = [...cartItems];

        updatedCartItems.splice(index, 1);

        setCartItems(updatedCartItems);

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    const handlePlaceOrder = () => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');

        if (!address.trim()) {
            setIsAddressValid(false);
            return;
        }


        const today = new Date()

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, '0');

        const day = String(today.getDate()).padStart(2, '0');

        const hour = String(today.getHours()).padStart(2, '0');

        const minute = String(today.getMinutes()).padStart(2, '0');

        const nowdate = `${year}-${month}-${day} (${hour}:${minute})`;

        const newOrder = {

            items: cartItems,

            orderDate: nowdate,

            totalPrice,

            address,
        };

        const updatedOrders = [...orders, newOrder];

        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        setCartItems([]);

        localStorage.removeItem('cartItems');

        setAddress('');

        window.location.reload()
    };

    const filteredItems = cartItems.filter(item =>
        item.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <img width={20} style={{ cursor: 'pointer' }} src={searchicon} />
                </div>
                <div className='user_cart_container'>
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/cart_login">
                            <img className='logo_cart' src={cart} alt="Cart" />
                            <span>{orderCount}</span>
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
            <h2 style={{ textAlign: 'center' }}>Order History</h2>
            {order.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No orders found.</p>
            ) : (
                <div className="order_history">
                    {order.map((orderItem, orderIndex) => (
                        <div key={orderIndex} className="order_item">
                            <div className="order_items">
                                <div className='order_items_item'>
                                    <div className='container_meal'>
                                        <img width={50} src={logo} />
                                    </div>
                                    <div className='order_product_container'>
                                        {orderItem.items.slice(0, 2).map((item: any, itemIndex: any) => (
                                            <div key={itemIndex} className="order_product">
                                                <p>{item.strCategory}
                                                    {(orderItem.items.length > 2 || (orderItem.items.length === 2 && itemIndex === 0)) && (
                                                        <span>,</span>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                        {orderItem.items.length > 2 && (
                                            <p>...and {orderItem.items.length - 2} </p>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <p>Order Date: {orderItem.orderDate}</p>
                            <p>Total: ${orderItem.totalPrice}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart">
                <h1 style={{ textAlign: 'center' }}>Shopping Cart</h1>
                {filteredItems.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No items found.</p>
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
                                        <button className='button-77' onClick={() => handleDelete(index)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
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
                                <div className='address_container'>
                                    <p className='address'>Your Address: </p>
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
                                <div>
                                    <button className='button-79' onClick={handlePlaceOrder}>Place an order!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart_Login;
