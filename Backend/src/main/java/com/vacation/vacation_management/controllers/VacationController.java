package com.vacation.vacation_management.controllers;

import com.vacation.vacation_management.domain.dtos.VacationRequestDto;
import com.vacation.vacation_management.domain.dtos.VacationRequestResponse;
import com.vacation.vacation_management.domain.entity.User;
import com.vacation.vacation_management.services.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/vacations")
@RequiredArgsConstructor
public class VacationController {
    private final VacationService vacationService;

    @PostMapping
    public ResponseEntity<VacationRequestResponse> createRequest(
            @RequestBody VacationRequestDto requestDto,
            @AuthenticationPrincipal User user){
        return  ResponseEntity.status(HttpStatus.CREATED).body(vacationService.createRequest(requestDto, user.getEmail()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<VacationRequestResponse>> getMyRequests(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(vacationService.getMyRequests(user.getEmail()));
    }

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<VacationRequestResponse>> getAllRequests(){
        return ResponseEntity.ok(vacationService.getAllRequests());
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<VacationRequestResponse> approveRequest(@PathVariable UUID id){
        return ResponseEntity.ok(vacationService.approveRequest(id));
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<VacationRequestResponse> rejectRequest(@PathVariable UUID id){
        return ResponseEntity.ok(vacationService.rejectRequest(id));
    }
}
