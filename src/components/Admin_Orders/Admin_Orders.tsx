import './Admin_Orders.css';
import logo from './../../assets/logo.png';
import order from './../../assets/order.png';
import searchicon from './../../assets/search_icon.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderDetailsModal from './../OrderDetailsModal_Admin/OrderDetailsModal_Admin';

interface Meal {
    idCategory: number;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
    price?: number;
    quantity?: number;
}

interface Order {
    items: Meal[];
    orderDate: string;
    address: string;
    totalPrice: number;
    phone: string;
    userName: string;
}

const Admin_Orders = () => {
    const storedData = localStorage.getItem('AllOrderForAdmin');
    const data: Order[] = storedData ? JSON.parse(storedData) : [];
    const [orderCount, setOrderCount] = useState<number>(data.length);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = data.filter(order =>
        order.items.some(meal =>
            meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    useEffect(() => {
        const storedOrders = localStorage.getItem('AllOrderForAdmin');
        const ordersParsed: Order[] = storedOrders ? JSON.parse(storedOrders) : [];
        setOrderCount(ordersParsed.length);
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleDetailsClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
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
                            <img className='logo_cart_order' src={order} alt="order" />
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

            <div className='orders'>
                <p className='order'>Orders</p>
            </div>
            <div className='container_admin_orders'>
                <div className="order_list">
                    {filteredOrders.map((order, index) => (
                        <div key={index} className="order_item">
                            <p>Order Date: {order.orderDate}</p>
                            {order.items.slice(0, 1).map((meal, index) => (
                                <div key={index} className="meal_item">
                                    <img className='img' src={meal.strCategoryThumb} alt={meal.strCategory} />
                                    <div className="meal_details">
                                        <div className='moreitems'>
                                            <p>{meal.strCategory}</p>
                                            {order.items.length > 1 && (
                                                <span>and {order.items.length - 1} more items...</span>
                                            )}
                                        </div>
                                        <p>Quantity: {meal.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            <p>Total Price: ${order.totalPrice}</p>
                            <button className='button-9' onClick={() => handleDetailsClick(order)}>Details</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Admin_Orders;
