import { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import cart from './../../assets/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Cart_Login.css';
import searchicon from './../../assets/search_icon.png';
import OrderDetailsModal from '../OrderDetailsModal_Admin/OrderDetailsModal_Admin';
import PayMethod from '../PayMethod/PayMethod';

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
}

const Cart_Login = () => {
    const [cartItems, setCartItems] = useState<Meal[]>([]);
    const [order, setOrder] = useState<Order[]>([]);
    const [userName, setUserName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [orderCount, setOrderCount] = useState<number>(0);
    const [showPayMethod, setShowPayMethod] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    useEffect(() => {
        const savedName = localStorage.getItem('name');
        if (savedName) setUserName(savedName);

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === userName);
        if (userIndex !== -1) {
            const userCart = storedUsers[userIndex].cart || [];
            setOrderCount(userCart.length);
            setCartItems(userCart);
            const userCartOrder = storedUsers[userIndex].cartOrder || [];
            setOrder(userCartOrder)
        }
    }, [userName]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        const savedOrders = localStorage.getItem('orders');
        if (savedCart) setCartItems(JSON.parse(savedCart));
        if (savedOrders) setOrder(JSON.parse(savedOrders));
    }, []);

    const handleDelete = (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === userName);
        if (userIndex !== -1) {
            storedUsers[userIndex].cart = updatedCartItems;
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }

        setOrderCount(updatedCartItems.length);
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

    const handlePlaceOrder = () => {
        if (!address.trim() || !phone.trim()) {
            setIsAddressValid(false);
            return;
        }
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }


        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hour = String(today.getHours()).padStart(2, '0');
        const minute = String(today.getMinutes()).padStart(2, '0');
        const nowdate = `${year}-${month}-${day} (${hour}:${minute})`;

        const newOrder: Order = {
            items: cartItems,
            orderDate: nowdate,
            totalPrice,
            address,
            phone,
            userName,
        };

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = storedUsers.findIndex((user: { name: string }) => user.name === userName);
        if (userIndex !== -1) {
            storedUsers[userIndex].cartOrder = [...storedUsers[userIndex].cartOrder, newOrder];
            storedUsers[userIndex].cart = [];
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
        setCartItems([]);
        setAddress('');
        setPhone('');
        setPaymentMethod(null);
        setIsAddressValid(true);
        window.location.reload();
    };

    const filteredItems = cartItems.filter(item =>
        item.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDetailsClick = (order: Order) => {
        setSelectedOrder(order);
    };
    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
        if (method === 'card') {
            setShowPayMethod(true);
        } else {
            setShowPayMethod(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };
    return (
        <>
            <div className='all_item_cart_login'>
                <div className='container_header'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/profil_login'>
                        <div className='logo_container'>
                            <img className='logo' src={logo} alt="Logo" />
                            <p className='logo_name_cart'>MealOrder</p>
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
                                <img className='logo_cart_cart' src={cart} alt="Cart" />
                                <span className='ordercount'>{orderCount}</span>
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
                <h2 style={{ textAlign: 'center', color: 'white' }}>Order History</h2>
                {order.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'white' }}>No orders found.</p>
                ) : (
                    <div className="order_history">
                        {order.map((orderItem, orderIndex) => (
                            <div key={orderIndex} className="order_item">
                                <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => handleDetailsClick(orderItem)}>
                                    <div className="order_items">
                                        <div className='order_items_item' style={{ color: 'white' }}>
                                            <div className='container_meal'>
                                                <img width={50} src={logo} />
                                            </div>
                                            <div className='order_product_container' style={{ color: 'white' }}>
                                                {orderItem.items.slice(0, 2).map((item: any, itemIndex: any) => (
                                                    <div key={itemIndex} className="order_product" >
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
                                    <p style={{ color: 'white' }}>Order Date: {orderItem.orderDate}</p>
                                    <p style={{ color: 'white' }}>Total: ${orderItem.totalPrice}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
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
                                                <div className="checkbox-wrapper-13">
                                                    <input
                                                        id="c1-13-cash"
                                                        type="radio"
                                                        name='pay'
                                                        onChange={() => handlePaymentMethodChange('cash')}
                                                    />
                                                    <label htmlFor="c1-13-cash">Pay To Cash</label>
                                                </div>

                                                <div className="checkbox-wrapper-13">
                                                    <input
                                                        id="c1-13-card"
                                                        type="radio"
                                                        name='pay'
                                                        onChange={() => handlePaymentMethodChange('card')}
                                                    />
                                                    <label htmlFor="c1-13-card">Pay to Card</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='button_cart_container'>
                                            <button className='button-79' onClick={handlePlaceOrder}>Place an order!</button>
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
            {showPayMethod && (
                <div className="paymethod-modal">
                    {showPayMethod && <PayMethod onClose={() => setShowPayMethod(false)} />}
                </div>
            )}
        </>
    );
};

export default Cart_Login;
