import React, { useState } from 'react'
import './Modal.css'
import { Link } from 'react-router-dom'

interface ModalProps {
    meal: any
    isOpen: boolean
    onClose: () => void
    onAddToCart: (meal: any, quantity: number) => void
}

const Modal: React.FC<ModalProps> = ({ meal, isOpen, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1)

    if (!isOpen || !meal) return null

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value))
    }

    const handleAddToCart = () => {
        onAddToCart(meal, quantity)
        onClose()
    }

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{meal.strCategory}</h2>
                <div className='edit_meal_img_container'>
                    <img className='edit_meal_img' src={meal.strCategoryThumb} alt={meal.strCategory} />
                </div>
                <p>{meal.strCategoryDescription}</p>
                <p>Price: ${meal.price}</p>
                <div className='quantity_container'>
                    <div>
                        <span>Quantity:</span>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            style={{ width: '50px' }}
                        />
                    </div>
                    <div className='button_add_cart_modal_container'>
                        <Link style={{ textDecoration: 'none' }} className='button-87' to='/profil' onClick={handleAddToCart}>Add to Cart</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal
