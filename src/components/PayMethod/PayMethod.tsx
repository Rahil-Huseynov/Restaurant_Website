import React from 'react';
import './PayMethod.css';

interface PayMethodProps {
    onClose: () => void;
    onPay: () => void;
}

const PayMethod: React.FC<PayMethodProps> = ({ onClose, onPay }) => {
    return (
        <>
            <div className="demo">
                <form className="payment-card">
                    <span className="closepay" onClick={onClose}>&times;</span>
                    <div className="bank-card">
                        <div className="bank-card__side bank-card__side_front">
                            <div className="bank-card__inner">
                                <label className="bank-card__label bank-card__label_holder">
                                    <span className="bank-card__hint">Holder of card</span>
                                    <input
                                        type="text"
                                        className="bank-card__field"
                                        placeholder="Holder of card"
                                        pattern="[A-Za-z, ]{2,}"
                                        name="holder-card"
                                        required
                                    />
                                </label>
                            </div>
                            <div className="bank-card__inner">
                                <label className="bank-card__label bank-card__label_number">
                                    <span className="bank-card__hint">Number of card</span>
                                    <input
                                        type="text"
                                        className="bank-card__field"
                                        placeholder="Number of card"
                                        pattern="[0-9]{16}"
                                        name="number-card"
                                        required
                                    />
                                </label>
                            </div>
                            <div className="bank-card__inner">
                                <span className="bank-card__caption">valid thru</span>
                            </div>
                            <div className="bank-card__inner bank-card__footer">
                                <label className="bank-card__label bank-card__month">
                                    <span className="bank-card__hint">Month</span>
                                    <input
                                        type="text"
                                        className="bank-card__field"
                                        placeholder="MM"
                                        maxLength={2}
                                        pattern="[0-9]{2}"
                                        name="mm-card"
                                        required
                                    />
                                </label>
                                <span className="bank-card__separator">/</span>
                                <label className="bank-card__label bank-card__year">
                                    <span className="bank-card__hint">Year</span>
                                    <input
                                        type="text"
                                        className="bank-card__field"
                                        placeholder="YY"
                                        maxLength={2}
                                        pattern="[0-9]{2}"
                                        name="year-card"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="bank-card__side bank-card__side_back">
                            <div className="bank-card__inner">
                                <label className="bank-card__label bank-card__cvc">
                                    <span className="bank-card__hint">CVC</span>
                                    <input
                                        type="text"
                                        className="bank-card__field"
                                        placeholder="CVC"
                                        maxLength={3}
                                        pattern="[0-9]{3}"
                                        name="cvc-card"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="payment-card__footer">
                        <button type='submit' onClick={onPay} className="payment-card__button">Pay To Card</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PayMethod;
