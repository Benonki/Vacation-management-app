import { useEffect, useState } from 'react';
import { FiEdit2, FiMail, FiSave, FiUser, FiX } from 'react-icons/fi';
import { fetchUsers, updateUserVacationDays } from '../../api/users';
import './index.css';

const roleLabels = {
    MANAGER: 'Kierownik',
    WORKER: 'Pracownik',
};

function Employees() {
    const [users, setUsers] = useState([]);
    const [editedDays, setEditedDays] = useState({});
    const [editingId, setEditingId] = useState('');
    const [updatingId, setUpdatingId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetchUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (err) {
            const status = err.response?.status;
            const message = status === 403
                ? 'Nie masz uprawnień do przeglądania pracowników'
                : err.response?.data?.message || 'Nie udało się pobrać listy pracowników';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditedDays((current) => ({
            ...current,
            [user.id]: user.vacationDays,
        }));
        setError('');
        setSuccessMessage('');
    };

    const cancelEditing = () => {
        setEditingId('');
        setEditedDays({});
        setError('');
    };

    const handleDaysChange = (userId, value) => {
        setEditedDays((current) => ({
            ...current,
            [userId]: value,
        }));
    };

    const replaceUser = (updatedUser) => {
        setUsers((currentUsers) => currentUsers.map((user) => (
            user.id === updatedUser.id ? updatedUser : user
        )));
    };

    const handleSave = async (userId) => {
        const vacationDays = Number(editedDays[userId]);

        if (Number.isNaN(vacationDays) || vacationDays < 0) {
            setError('Liczba dni urlopowych nie może być mniejsza niż 0');
            return;
        }

        setUpdatingId(userId);
        setError('');
        setSuccessMessage('');

        try {
            const response = await updateUserVacationDays({
                id: userId,
                vacationDays,
            });

            if (response.success) {
                replaceUser(response.data);
                setEditingId('');
                setEditedDays({});
                setSuccessMessage('Liczba dni urlopowych została zaktualizowana');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Nie udało się zaktualizować dni urlopowych');
        } finally {
            setUpdatingId('');
        }
    };

    return (
        <div className="employees-container">
            <div className="employees-header">
                <div>
                    <h2>Pracownicy</h2>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {loading ? (
                <div className="loading">Ładowanie...</div>
            ) : users.length === 0 && !error ? (
                <div className="no-users">Brak pracowników</div>
            ) : (
                <div className="employees-table-wrapper">
                    <table className="employees-table">
                        <thead>
                        <tr>
                            <th>Pracownik</th>
                            <th>E-mail</th>
                            <th>Rola</th>
                            <th>Dni urlopowe</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>

                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="employee-name">
                                        <FiUser />
                                        <span>{user.name} {user.surname}</span>
                                    </div>
                                </td>

                                <td>
                                    <div className="employee-email">
                                        <FiMail />
                                        <span>{user.email}</span>
                                    </div>
                                </td>

                                <td>
                                        <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                                            {roleLabels[user.role] || user.role}
                                        </span>
                                </td>

                                <td>
                                    {editingId === user.id ? (
                                        <input
                                            className="vacation-days-input"
                                            type="number"
                                            min="0"
                                            value={editedDays[user.id] ?? ''}
                                            onChange={(event) => handleDaysChange(user.id, event.target.value)}
                                        />
                                    ) : (
                                        <strong>{user.vacationDays}</strong>
                                    )}
                                </td>

                                <td>
                                    {editingId === user.id ? (
                                        <div className="employees-actions">
                                            <button
                                                type="button"
                                                className="save-button"
                                                onClick={() => handleSave(user.id)}
                                                disabled={updatingId === user.id}
                                            >
                                                <FiSave />
                                                Zapisz
                                            </button>

                                            <button
                                                type="button"
                                                className="cancel-button"
                                                onClick={cancelEditing}
                                                disabled={updatingId === user.id}
                                            >
                                                <FiX />
                                                Anuluj
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            className="edit-button"
                                            onClick={() => startEditing(user)}
                                        >
                                            <FiEdit2 />
                                            Edytuj dni
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Employees;