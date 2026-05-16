package com.vacation.vacation_management.services;

import com.vacation.vacation_management.domain.dtos.*;
import org.jspecify.annotations.Nullable;

import java.util.List;
import java.util.UUID;

public interface VacationService {
    public VacationRequestResponse createRequest(VacationRequestDto dto, String email);
    public List<VacationRequestResponse> getMyRequests(String email);
    public List<VacationRequestResponse> getAllRequests();
    public VacationRequestResponse approveRequest(UUID id);
    public VacationRequestResponse rejectRequest(RejectRequestDto requestDto);
}
