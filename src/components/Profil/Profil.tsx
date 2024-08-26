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
    const [nameError, setNameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [userorder] = useState([]);
    const [usercart] = useState([]);
    const navigate = useNavigate();

    const nameRegex = /^[A-ZÇƏĞİıJKLNMÖPRSŞTUÜVWXYZa-zçəğııjklnmoprşтуüvwxyz]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleSignUp = () => {

        setEmailError(false);
        setNameError(false);
        setPasswordError(false);
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        if (!nameRegex.test(name)) {
            setNameError(true);
            return;
        }
        if (!passwordRegex.test(password)) {
            setPasswordError(true);
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const isEmailExists = storedUsers.some((user: { email: string }) => user.email === email);
        const isNameExists = storedUsers.some((user: { name: string }) => user.name === name);

        if (isEmailExists) {
            setEmailError(true);
            const errorPanel = document.getElementById('errorPanel');
            if (errorPanel) {
                errorPanel.classList.add('active');
                setTimeout(() => {
                    errorPanel.classList.remove('active');
                }, 2000);
            }
            return;
        }

        if (isNameExists) {
            setNameError(true);
            const errorPanel = document.getElementById('errorPanel');
            if (errorPanel) {
                errorPanel.classList.add('active');
                setTimeout(() => {
                    errorPanel.classList.remove('active');
                }, 2000);
            }
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            cartOrder: userorder,
            cart: usercart
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        const successPanel = document.getElementById('successPanel');
        if (successPanel) {
            successPanel.classList.add('active');
            setTimeout(() => {
                successPanel.classList.remove('active');
            }, 2000);
        }
        setTimeout(() => {
            location.reload()
        }, 1000);
    };

    const handleLogin = () => {
        setEmailError(false);
        setPasswordError(false);
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = storedUsers.find(
            (u: { email: string; password: string }) => u.email === email && u.password === password,
        );

        if (user) {
            localStorage.setItem('name', user.name);
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
            <div className='profil_all_item'>
                <div className='container_header_profil'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/home'>
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
                <div className="checkpanel_container">
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
                                    className={`input_profil ${nameError ? 'error' : ''}`}
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
            </div>
        </>
    );
};

export default Profil;