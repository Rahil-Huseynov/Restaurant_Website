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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const [newMeal, setNewMeal] = useState<Meal>({
        idCategory: 15,
        strCategory: '',
        strCategoryThumb: '',
        strCategoryDescription: '',
        price: undefined
    });

    useEffect(() => {
        setIsModalOpen(isOpen);
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

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

    if (!isModalOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMeal(prevMeal => ({
            ...prevMeal,
            [name]: name === 'price' ? (value ? parseFloat(value) : undefined) : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewMeal(prevMeal => ({
                    ...prevMeal,
                    strCategoryThumb: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
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
                    {newMeal.strCategoryThumb && (
                        <div className='meal-thumbnail-container'>
                            <img
                                src={newMeal.strCategoryThumb}
                                alt="Meal Thumbnail"
                                className="meal-thumbnail"
                            />
                        </div>
                    )}
                    <div className="input_edit_container">
                        <span style={{ paddingRight: '3rem' }}>Name:</span>
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
                        <span>Image:</span>
                        <input
                            className="input_edit"
                            type="file"
                            accept="image/png"
                            onChange={handleImageChange}
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
