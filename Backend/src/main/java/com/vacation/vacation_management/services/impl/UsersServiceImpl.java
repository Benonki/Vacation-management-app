package com.vacation.vacation_management.services.impl;

import com.vacation.vacation_management.domain.dtos.UpdateVacationDaysDto;
import com.vacation.vacation_management.domain.dtos.UserResponse;
import com.vacation.vacation_management.domain.entity.User;
import com.vacation.vacation_management.exceptions.ResourceNotFoundException;
import com.vacation.vacation_management.mappers.UserMapper;
import com.vacation.vacation_management.repositories.UserRepository;
import com.vacation.vacation_management.services.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UsersServiceImpl implements UsersService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;



    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
    }

    @Override
    public UserResponse updateVacationDays(UUID id, UpdateVacationDaysDto dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found " + id));

        if(dto.getVacationDays() < 0){
            throw new RuntimeException("Vacation days cannot be less than 0");
        }

        user.setVacationDays(dto.getVacationDays());
        userRepository.save(user);

        return userMapper.toDto(user);
    }

}
