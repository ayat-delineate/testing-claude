import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI, medicineAPI, categoryAPI } from '../services/api';

// Auth hooks
export const useLogin = () => {
    return useMutation({
        mutationFn: authAPI.login,
        onSuccess: (response) => {
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: authAPI.register,
    });
};

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: authAPI.getProfile,
        enabled: !!localStorage.getItem('token'),
    });
};

// Medicine hooks
export const useMedicines = (params = {}) => {
    return useQuery({
        queryKey: ['medicines', params],
        queryFn: () => medicineAPI.getMedicines(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useMedicine = (id) => {
    return useQuery({
        queryKey: ['medicine', id],
        queryFn: () => medicineAPI.getMedicine(id),
        enabled: !!id,
    });
};

export const useCreateMedicine = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: medicineAPI.createMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] });
        },
    });
};

// Category hooks
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categoryAPI.getCategories,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};
