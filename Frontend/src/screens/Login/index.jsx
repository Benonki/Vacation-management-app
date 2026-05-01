import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { loginUser } from '../../api/auth';
import './index.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser({
                email,
                password,
                });

                Cookies.set('authToken', data.token);
                navigate('/');
            } catch (error) {
                alert(error.response?.data?.message || 'Logowanie nie powiodlo sie');
            }
        };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Wprowadź email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Wprowadź hasło"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">
                        Zaloguj się
                    </button>
                </form>
                <p className="auth-link">
                    Nie masz konta?{' '}
                    <Link to="/register" className="auth-link-text">
                        Zarejestruj się
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;