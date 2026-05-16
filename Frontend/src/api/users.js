import { axiosInstance } from './instance';

const normalizeUser = (user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    vacationDays: user.vacationDays,
});

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/users');

    return {
        success: true,
        data: response.data.map(normalizeUser),
    };
};

export const updateUserVacationDays = async ({ id, vacationDays }) => {
    const response = await axiosInstance.patch(`/users/${id}/vacation-days`, {
        vacationDays: Number(vacationDays),
    });

    return {
        success: true,
        data: normalizeUser(response.data),
    };
};