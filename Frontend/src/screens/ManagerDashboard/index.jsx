import { useEffect, useState } from 'react';
import { FiCalendar, FiFileText, FiUser } from 'react-icons/fi';
import { fetchAllLeaves } from '../../api/leave';
import './index.css';

const statusLabels = {
    pending: 'Oczekujący',
    approved: 'Zaakceptowany',
    rejected: 'Odrzucony',
};

function ManagerDashboard() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadLeaves();
    }, []);

    const loadLeaves = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetchAllLeaves();
            if (response.success) {
                setLeaves(response.data);
            }
        } catch (err) {
            const status = err.response?.status;
            const message = status === 403
                ? 'Nie masz uprawnień do przeglądania wszystkich wniosków'
                : err.response?.data?.message || 'Nie udało się pobrać wniosków';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pl-PL');
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Wnioski pracowników</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Ładowanie...</div>
            ) : leaves.length === 0 && !error ? (
                <div className="no-leaves">Brak wniosków urlopowych</div>
            ) : (
                <div className="manager-leaves-list">
                    {leaves.map((leave) => (
                        <div key={leave.id} className="manager-leave-card">
                            <div className="manager-leave-header">
                                <div>
                                    <h3>{leave.userName} {leave.userSurname}</h3>
                                    <span className="request-id">Wniosek #{leave.id}</span>
                                </div>
                                <span className={`status-badge status-${leave.status}`}>
                                    {statusLabels[leave.status] || leave.status}
                                </span>
                            </div>

                            <div className="manager-leave-details">
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <FiUser className="detail-icon" />
                                        Pracownik:
                                    </span>
                                    <span className="detail-value">{leave.userName} {leave.userSurname}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <FiCalendar className="detail-icon" />
                                        Data złożenia:
                                    </span>
                                    <span className="detail-value">{formatDate(leave.submissionDate)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <FiCalendar className="detail-icon" />
                                        Okres:
                                    </span>
                                    <span className="detail-value">
                                        {formatDate(leave.dateFrom)} - {formatDate(leave.dateTo)}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <FiFileText className="detail-icon" />
                                        Przyczyna:
                                    </span>
                                    <span className="detail-value">{leave.reason}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManagerDashboard;
