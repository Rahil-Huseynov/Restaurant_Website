import React, { useEffect, useState } from 'react';
import './OrderDetailsModal_Admin.css';

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
    phone:string;
    paymentMethod:string;
    userName:string;
}

interface OrderDetailsModalProps {
    order: Order | null;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsModalOpen(true);
        return () => {
            setIsModalOpen(false);
            document.body.classList.remove('no-scroll');
        };
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isModalOpen]);

    if (!order) return null;

    return (
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
            <div className="modal_content">
                <span className="close" onClick={() => { setIsModalOpen(false); onClose(); }}>&times;</span>
                <h2>Order Details</h2>
                {order.items.map((meal, index) => (
                    <div key={index} className="meal_item">
                        <img className='img' src={meal.strCategoryThumb} alt={meal.strCategory} />
                        <div className="meal_details">
                            <p>{meal.strCategory}</p>
                            <p>{meal.strCategoryDescription}</p>
                            <p>Quantity: {meal.quantity}</p>
                            <p>Price: ${meal.price}</p>
                        </div>
                        <hr />
                    </div>
                ))}
                <p>Order Date: {order.orderDate}</p>
                <div className='address_modal_container'>
                    <p>Name: </p>
                    <p className='address_modal'>{order.userName}</p>
                </div>
                <div className='address_modal_container'>
                    <p>Address: </p>
                    <p className='address_modal'>{order.address}</p>
                </div>
                <div className='address_modal_container'>
                    <p>Phone: </p>
                    <p className='address_modal'>{order.phone}</p>
                </div>
                <div className='address_modal_container'>
                    <p>Payment Method: </p>
                    <p className='address_modal'>{order.paymentMethod}</p>
                </div>
                <p>Total Price: ${order.totalPrice}</p>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
