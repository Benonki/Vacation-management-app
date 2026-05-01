package com.vacation.vacation_management.services;

import com.vacation.vacation_management.domain.dtos.AuthResponse;
import com.vacation.vacation_management.domain.dtos.LoginRequest;
import com.vacation.vacation_management.domain.dtos.RegisterRequest;

public interface AuthService {
    public AuthResponse register(RegisterRequest request);
    public AuthResponse login(LoginRequest request);
}
