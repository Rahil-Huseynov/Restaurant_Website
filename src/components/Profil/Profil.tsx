import { useState } from 'react';
import './Profil.css';
import logo from './../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import user from './../../assets/user.png';

const Profil = () => {
    const [isSignUp, setIsSignUp] = useState(true);

    const [email, setEmail] = useState('');

    const [name, setName] = useState('')

    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUp = () => {

        localStorage.setItem('name', name);

        localStorage.setItem('userEmail', email);

        localStorage.setItem('userPassword', password);

        alert('Sign-up successful!');
        
        window.location.reload();

    };

    const handleLogin = () => {

        const storedEmail = localStorage.getItem('userEmail');

        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
            alert('Login successful!');
            navigate('/profil_login');
        } else {
            alert('Invalid credentials!');
        }
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
            <hr />
            <div className='container_profil'>
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true" checked={!isSignUp} onChange={() => setIsSignUp(!isSignUp)} />
                    <div className={`signup ${isSignUp ? 'active' : 'inactive'}`}>
                        <div>
                            <label className='label_profil' htmlFor='chk' aria-hidden="true">Sign up</label>
                            <input
                                className='input_profil'
                                type="text"
                                name="txt"
                                placeholder="User name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className='input_profil'
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className='input_profil'
                                type="password"
                                name="pswd"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='singup_login_button' onClick={handleSignUp}>Sign up</button>
                        </div>
                    </div>

                    <div className={`login ${!isSignUp ? 'active' : 'inactive'}`}>
                        <div>
                            <label className='label_profil' htmlFor='chk' aria-hidden="true">Login</label>
                            <input
                                className='input_profil'
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className='input_profil'
                                type="password"
                                name="pswd"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
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
