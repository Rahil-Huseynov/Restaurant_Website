import { useState } from 'react';
import './Profil.css';
import logo from './../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import user from './../../assets/user.png';

const Profil = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleSignUp = () => {
        if (!emailRegex.test(email)) {

            setEmailError(true);

            return;
        }

        if (!passwordRegex.test(password)) {

            setPasswordError(true);

            return;
        }

        localStorage.setItem('name', name);

        localStorage.setItem('userEmail', email);

        localStorage.setItem('userPassword', password);

        const successPanel = document.getElementById('successPanel');
        if (successPanel) {

            successPanel.classList.add('active');
            setTimeout(() => {
                successPanel.classList.remove('active');
            }, 2000);

        }

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleLogin = () => {
        const storedEmail = localStorage.getItem('userEmail');

        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {

            const successPanel = document.getElementById('successPanel');
            if (successPanel) {
                successPanel.classList.add('active');
                setTimeout(() => {
                    successPanel.classList.remove('active');
                }, 2000);
            }
            setTimeout(() => {
                navigate('/profil_login');
            }, 1000);
        }

        else if (email === 'admin' && password === 'admin') {
            const successPanel = document.getElementById('successPanel');
            if (successPanel) {
                successPanel.classList.add('active');
                setTimeout(() => {
                    successPanel.classList.remove('active');
                }, 2000);
            }
            setTimeout(() => {
                navigate('/admin');
            }, 1000);
        }
        else {
            const errorPanel = document.getElementById('errorPanel');

            if (errorPanel) {
                errorPanel.classList.add('active');
                setTimeout(() => {
                    errorPanel.classList.remove('active');
                }, 2000);
            }
            setEmailError(true);

            setPasswordError(true);

        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove('error');

        setEmailError(false);

        setPasswordError(false);
    };

    return (
        <>
            <div className='container_header'>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
                    <div className='logo_container'>
                        <img className='logo' src={logo} alt="Logo" />
                        <p className='logo_name'>MealOrder</p>
                    </div>
                </Link>
                <Link to='/profil'>
                    <div className='user_cart_container'>
                        <img className='logo_cart' src={user} alt="User" />
                    </div>
                </Link>
            </div>
            <div className="checkpanel_container" id="checkpanel_container">
                <div className="panel panel1" id="successPanel">Success</div>
                <div className="panel panel2" id="errorPanel">Error</div>
            </div>
            <hr />
            <div className='container_profil'>
                <div className="main">
                    <input
                        type="checkbox"
                        id="chk"
                        aria-hidden="true"
                        checked={!isSignUp}
                        onChange={() => setIsSignUp(!isSignUp)}
                    />
                    <div className={`signup ${isSignUp ? 'active' : 'inactive'}`}>
                        <div>
                            <label className='label_profil' htmlFor='chk' aria-hidden="true">Sign up</label>
                            <input
                                className='input_profil'
                                type="text"
                                name="txt"
                                placeholder="User name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                onFocus={handleFocus}
                            />
                            <input
                                className={`input_profil ${emailError ? 'error' : ''}`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                onFocus={handleFocus}
                            />
                            <input
                                className={`input_profil ${passwordError ? 'error' : ''}`}
                                type="password"
                                name="pswd"
                                placeholder="Password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                onFocus={handleFocus}
                            />
                            <button className='singup_login_button' onClick={handleSignUp}>Sign up</button>
                        </div>
                    </div>

                    <div className={`login ${!isSignUp ? 'active' : 'inactive'}`}>
                        <div>
                            <label className='label_profil' htmlFor='chk' aria-hidden="true">Login</label>
                            <input
                                className={`input_profil ${!isSignUp && emailError ? 'error' : ''}`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                onFocus={handleFocus}
                            />
                            <input
                                className={`input_profil ${!isSignUp && passwordError ? 'error' : ''}`}
                                type="password"
                                name="pswd"
                                placeholder="Password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                onFocus={handleFocus}
                            />
                            <button className='singup_login_button' onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profil;
