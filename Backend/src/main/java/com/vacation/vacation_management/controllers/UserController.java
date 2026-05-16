package com.vacation.vacation_management.controllers;

import com.vacation.vacation_management.domain.dtos.UpdateVacationDaysDto;
import com.vacation.vacation_management.domain.dtos.UserResponse;
import com.vacation.vacation_management.services.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor

public class UserController {

    private final UsersService usersService;

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        return ResponseEntity.ok(usersService.getAllUsers());
    }


    @PatchMapping("/{id}/vacation-days")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<UserResponse> updateVacationDays(
            @PathVariable UUID id,
            @RequestBody UpdateVacationDaysDto dto){
        return ResponseEntity.ok(usersService.updateVacationDays(id,dto));
    }
}
