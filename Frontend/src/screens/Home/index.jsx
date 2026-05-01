import React, { useState, useEffect } from 'react';
import { FiSend, FiCalendar, FiFileText } from 'react-icons/fi';
import { submitLeaveRequest, fetchUserLeaves } from '../../api/leave';
import './index.css';

function Home() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [reason, setReason] = useState('');
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadLeaves();
    }, []);

    const loadLeaves = async () => {
        setLoading(true);
        try {
            const response = await fetchUserLeaves();
            if (response.success) {
                setLeaves(response.data);
            }
        } catch (error) {
            console.error('Błąd podczas pobierania wniosków:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setSuccessMessage('');

        if (!dateFrom || !dateTo || !reason.trim()) {
            setFormError('Wszystkie pola są wymagane');
            return;
        }

        if (new Date(dateTo) < new Date(dateFrom)) {
            setFormError('Data zakończenia nie może być wcześniejsza niż data rozpoczęcia');
            return;
        }

        const leaveData = {
            dateFrom,
            dateTo,
            reason: reason.trim()
        };

        try {
            const response = await submitLeaveRequest(leaveData);
            if (response.success) {
                setSuccessMessage('Wniosek urlopowy został złożony pomyślnie!');
                setDateFrom('');
                setDateTo('');
                setReason('');
                loadLeaves();
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Spróbuj ponownie później';
            setFormError(`Wystąpił błąd podczas składania wniosku: ${message}`);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pl-PL');
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="leaves-history">
                    <h2>Historia wniosków urlopowych</h2>
                    {loading ? (
                        <div className="loading">Ładowanie...</div>
                    ) : leaves.length === 0 ? (
                        <div className="no-leaves">Brak złożonych wniosków</div>
                    ) : (
                        <div className="leaves-list">
                            {leaves.map((leave) => (
                                <div key={leave.id} className="leave-card">
                                    <div className="leave-header">
                                        <h3>Wniosek #{leave.id}</h3>
                                        <span className={`status-badge status-${leave.status}`}>
                                            {leave.status === 'pending' && 'Oczekujący'}
                                            {leave.status === 'approved' && 'Zaakceptowany'}
                                            {leave.status === 'rejected' && 'Odrzucony'}
                                        </span>
                                    </div>
                                    <div className="leave-details">
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

                <div className="leave-form-container">
                    <h2>Nowy wniosek urlopowy</h2>
                    <form onSubmit={handleSubmit} className="leave-form">
                        {formError && <div className="error-message">{formError}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}

                        <div className="form-group">
                            <label htmlFor="dateFrom">
                                <FiCalendar className="label-icon" />
                                Data od:
                            </label>
                            <input
                                type="date"
                                id="dateFrom"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateTo">
                                <FiCalendar className="label-icon" />
                                Data do:
                            </label>
                            <input
                                type="date"
                                id="dateTo"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reason">
                                <FiFileText className="label-icon" />
                                Przyczyna:
                            </label>
                            <textarea
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Podaj przyczynę urlopu..."
                                className="form-textarea"
                                rows="4"
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            <FiSend className="button-icon" />
                            <span className="button-text">Złóż wniosek</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
