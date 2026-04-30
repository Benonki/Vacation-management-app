import { axiosInstance } from './instance';

const mockLeaves = [
    {
        id: 1,
        dateFrom: '2024-12-23',
        dateTo: '2024-12-27',
        reason: 'Urlop wypoczynkowy - święta',
        status: 'pending',
        submissionDate: '2024-12-15'
    },
    {
        id: 2,
        dateFrom: '2025-01-10',
        dateTo: '2025-01-12',
        reason: 'Sprawy osobiste',
        status: 'approved',
        submissionDate: '2024-12-20'
    },
    {
        id: 3,
        dateFrom: '2025-02-01',
        dateTo: '2025-02-05',
        reason: 'Wyjazd rodzinny',
        status: 'rejected',
        submissionDate: '2025-01-15'
    }
];

export const submitLeaveRequest = async (leaveData) => {
    console.log('Wysyłanie wniosku urlopowego:', leaveData);

    // tutaj bedzie szlo api

    return {
        success: true,
        message: 'Wniosek został złożony pomyślnie',
        data: {
            id: Math.floor(Math.random() * 1000) + 4,
            ...leaveData,
            status: 'pending',
            submissionDate: new Date().toISOString().split('T')[0]
        }
    };
};

export const fetchUserLeaves = async () => {
    // tutaj bedzie szlo api

    return {
        success: true,
        data: mockLeaves
    };
};