package com.vacation.vacation_management.services.impl;

import com.vacation.vacation_management.domain.dtos.VacationRequestDto;
import com.vacation.vacation_management.domain.dtos.VacationRequestResponse;
import com.vacation.vacation_management.domain.entity.User;
import com.vacation.vacation_management.domain.entity.VacationRequest;
import com.vacation.vacation_management.domain.enums.VacationStatus;
import com.vacation.vacation_management.mappers.VacationRequestMapper;
import com.vacation.vacation_management.repositories.UserRepository;
import com.vacation.vacation_management.repositories.VacationRepository;
import com.vacation.vacation_management.services.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VacationServiceImpl implements VacationService {

    private final VacationRepository vacationRepository;
    private final UserRepository userRepository;
    private final VacationRequestMapper vacationRequestMapper;


    @Override
    public VacationRequestResponse createRequest(VacationRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if(dto.getToDate().isBefore(dto.getToDate())){
            throw new RuntimeException("End date cannot be before start date");
        }

        VacationRequest request = VacationRequest.builder()
                .user(user)
                .submissionDate(LocalDate.now())
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .reason(dto.getReason())
                .status(VacationStatus.WAITING)
                .build();

        vacationRepository.save(request);
        return vacationRequestMapper.toDto(request);

    }

    @Override
    public List<VacationRequestResponse> getMyRequests(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return vacationRepository.findByUser(user)
                .stream()
                .map(vacationRequestMapper::toDto)
                .toList();
    }

    @Override
    public List<VacationRequestResponse> getAllRequests() {
        return vacationRepository.findAll()
                .stream()
                .map(vacationRequestMapper::toDto)
                .toList();
    }

    @Override
    public VacationRequestResponse approveRequest(UUID id) {
        return changeStatus(id, VacationStatus.APPROVED);
    }

    @Override
    public VacationRequestResponse rejectRequest(UUID id) {
        return changeStatus(id, VacationStatus.DECLINED);
    }

    private VacationRequestResponse changeStatus(UUID id, VacationStatus status){
        VacationRequest request = vacationRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(status);
        vacationRepository.save(request);
        return vacationRequestMapper.toDto(request);
    }
}
