package com.vacation.vacation_management.services;

import com.vacation.vacation_management.domain.dtos.UpdateVacationDaysDto;
import com.vacation.vacation_management.domain.dtos.UserResponse;
import org.jspecify.annotations.Nullable;

import java.util.List;
import java.util.UUID;

public interface UsersService {
    UserResponse updateVacationDays(UUID id, UpdateVacationDaysDto dto);

    List<UserResponse> getAllUsers();
}
