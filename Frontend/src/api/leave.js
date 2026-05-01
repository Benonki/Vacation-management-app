import { axiosInstance } from './instance';

const statusMap = {
    WAITING: 'pending',
    APPROVED: 'approved',
    DECLINED: 'rejected',
};

const normalizeLeave = (leave) => ({
    id: leave.id,
    userName: leave.userName,
    userSurname: leave.userSurname,
    dateFrom: leave.fromDate,
    dateTo: leave.toDate,
    reason: leave.reason,
    status: statusMap[leave.status] || leave.status?.toLowerCase(),
    submissionDate: leave.submissionDate,
});

export const submitLeaveRequest = async ({ dateFrom, dateTo, reason }) => {
    const response = await axiosInstance.post('/vacations', {
        fromDate: dateFrom,
        toDate: dateTo,
        reason,
    });

    return {
        success: true,
        message: 'Wniosek został złożony pomyślnie',
        data: normalizeLeave(response.data),
    };
};

export const fetchUserLeaves = async () => {
    const response = await axiosInstance.get('/vacations/my');

    return {
        success: true,
        data: response.data.map(normalizeLeave),
    };
};

export const fetchAllLeaves = async () => {
    const response = await axiosInstance.get('/vacations');

    return {
        success: true,
        data: response.data.map(normalizeLeave),
    };
};
