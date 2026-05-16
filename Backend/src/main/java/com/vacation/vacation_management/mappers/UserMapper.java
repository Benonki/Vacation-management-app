package com.vacation.vacation_management.mappers;

import com.vacation.vacation_management.domain.dtos.UserResponse;
import com.vacation.vacation_management.domain.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toDto(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .role(user.getRole())
                .vacationDays(user.getVacationDays())
                .build();
    }
}
