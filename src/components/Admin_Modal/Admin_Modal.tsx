import React, { useState, useEffect } from 'react';
import './Admin_Modal.css';

interface Meal {
    idCategory: number;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
    price?: number;
}

interface ModalProps {
    meal: Meal | null;
    isOpen: boolean;
    onClose: () => void;
    onEditMeal: (meal: Meal) => void;
    onDeleteMeal: (mealId: number) => void;
}

const Admin_Modal: React.FC<ModalProps> = ({ meal, isOpen, onClose, onEditMeal, onDeleteMeal }) => {
    const [editedMeal, setEditedMeal] = useState<Meal | null>(meal);

    useEffect(() => {
        if (meal) {
            setEditedMeal(meal);
        }
    }, [meal]);

    if (!isOpen || !editedMeal) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedMeal(prevMeal => prevMeal ? {
            ...prevMeal,
            [name]: name === 'price' ? (value ? parseFloat(value) : undefined) : value
        } : null);
    };

    const handleEdit = () => {
        if (editedMeal) {
            onEditMeal(editedMeal);
        }
    };

    const handleDelete = () => {
        if (meal) {
            onDeleteMeal(meal.idCategory);
        }
    };

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="edit_container">
                    <h2>{editedMeal.strCategory}</h2>
                    <div className='edit_meal_img_container'>
                        <img className='edit_meal_img' src={editedMeal.strCategoryThumb} alt={editedMeal.strCategory} />
                    </div>
                    <div className="textarea_edit_container">
                        <span>Description: </span>
                        <textarea
                            className="textarea"
                            name="strCategoryDescription"
                            value={editedMeal.strCategoryDescription}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                    </div>
                    <div className="input_edit_container">
                        <span>Price:</span>
                        <input
                            className="input_edit"
                            type="number"
                            name="price"
                            value={editedMeal.price !== undefined ? editedMeal.price : ''}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                    </div>
                </div>
                <div className="button_container">
                    <button className="button-87" onClick={handleEdit}>Save</button>
                    <button className="button-87" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Admin_Modal;
