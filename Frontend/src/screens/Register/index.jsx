import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { registerUser } from '../../api/auth';
import './index.css';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Hasła nie są zgodne!');
            return;
        }

        try {
            await registerUser({
                name,
                surname,
                email,
                password,
            });

            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Rejestracja nie powiodła się');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Imię</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Wprowadź imię"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Nazwisko</label>
                        <input
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            placeholder="Wprowadź nazwisko"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Potwierdź hasło</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Potwierdź hasło"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">
                        Zarejestruj się
                    </button>
                </form>
                <p className="auth-link">
                    Masz już konto?{' '}
                    <Link to="/login" className="auth-link-text">
                        Zaloguj się
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
