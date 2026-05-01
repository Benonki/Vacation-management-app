package com.vacation.vacation_management.domain.dtos;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
