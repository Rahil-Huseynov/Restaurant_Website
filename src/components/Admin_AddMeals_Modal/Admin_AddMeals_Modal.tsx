import React, { useState, useEffect } from 'react';
import './Admin_AddMeals_Modal.css';

interface Meal {
    idCategory: number;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
    price?: number;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Admin_AddMeals_Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [newMeal, setNewMeal] = useState<Meal>({
        idCategory: 15,
        strCategory: '',
        strCategoryThumb: '',
        strCategoryDescription: '',
        price: undefined
    });

    useEffect(() => {
        if (isOpen) {
            setNewMeal({
                idCategory: 15,
                strCategory: '',
                strCategoryThumb: '',
                strCategoryDescription: '',
                price: undefined
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMeal(prevMeal => ({
            ...prevMeal,
            [name]: name === 'price' ? (value ? parseFloat(value) : undefined) : value
        }));
    };

    const handleAdd = () => {
        const data = localStorage.getItem('filteredData');

        const existingData: Meal[] = data ? JSON.parse(data) : [];

        const maxIdCategory = existingData.reduce((max, meal) => meal.idCategory > max ? meal.idCategory : max, 14);

        const newIdCategory = maxIdCategory + 1;

        const updatedMeal = { ...newMeal, idCategory: newIdCategory };

        const updatedData = [...existingData, updatedMeal];

        localStorage.setItem('filteredData', JSON.stringify(updatedData));

        onClose();
    };

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="edit_container">
                    <h2>Add New Meal</h2>
                    <div className="input_edit_container">
                        <span>Name:</span>
                        <input
                            className="input_edit"
                            type="text"
                            name="strCategory"
                            value={newMeal.strCategory}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                    </div>
                    <div className="input_edit_container">
                        <span>Image URL:</span>
                        <input
                            className="input_edit"
                            type="text"
                            name="strCategoryThumb"
                            value={newMeal.strCategoryThumb}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                        />
                    </div>
                    <div className="textarea_edit_container">
                        <span>Description:</span>
                        <textarea
                            className="textarea"
                            name="strCategoryDescription"
                            value={newMeal.strCategoryDescription}
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
                            value={newMeal.price !== undefined ? newMeal.price : ''}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                    </div>
                </div>
                <div className="button_container">
                    <button className="button-87" onClick={handleAdd}>Add Meal</button>
                </div>
            </div>
        </div>
    );
};

export default Admin_AddMeals_Modal;
