package com.vacation.vacation_management.domain.dtos;

import com.vacation.vacation_management.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String name;
    private String surname;
    private String email;
    private Role role;
    private int vacationDays;
}
