import { useEffect, useState } from 'react';
import { FiCalendar, FiCheck, FiFileText, FiUser, FiX } from 'react-icons/fi';
import { approveLeaveRequest, fetchAllLeaves, rejectLeaveRequest } from '../../api/leave';
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
    const [updatingId, setUpdatingId] = useState('');

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

    const replaceLeave = (updatedLeave) => {
        setLeaves((currentLeaves) => currentLeaves.map((leave) => (
            leave.id === updatedLeave.id ? updatedLeave : leave
        )));
    };

    const handleApprove = async (id) => {
        setUpdatingId(id);
        setError('');

        try {
            const response = await approveLeaveRequest(id);
            if (response.success) {
                replaceLeave(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Nie udało się zaakceptować wniosku');
        } finally {
            setUpdatingId('');
        }
    };

    const handleReject = async (id) => {
        setUpdatingId(id);
        setError('');

        try {
            const response = await rejectLeaveRequest(id);
            if (response.success) {
                replaceLeave(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Nie udało się odrzucić wniosku');
        } finally {
            setUpdatingId('');
        }
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

                            {leave.status === 'pending' && (
                                <div className="manager-actions">
                                    <button
                                        type="button"
                                        className="decision-button approve-button"
                                        onClick={() => handleApprove(leave.id)}
                                        disabled={updatingId === leave.id}
                                    >
                                        <FiCheck className="button-icon" />
                                        <span>Akceptuj</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="decision-button reject-button"
                                        onClick={() => handleReject(leave.id)}
                                        disabled={updatingId === leave.id}
                                    >
                                        <FiX className="button-icon" />
                                        <span>Odrzuć</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManagerDashboard;
