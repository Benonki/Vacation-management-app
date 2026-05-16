package com.vacation.vacation_management.services.impl;

import com.vacation.vacation_management.domain.dtos.*;
import com.vacation.vacation_management.domain.entity.User;
import com.vacation.vacation_management.domain.entity.VacationRequest;
import com.vacation.vacation_management.domain.enums.VacationStatus;
import com.vacation.vacation_management.exceptions.NotEnoughDaysOff;
import com.vacation.vacation_management.exceptions.ResourceNotFoundException;
import com.vacation.vacation_management.mappers.VacationRequestMapper;
import com.vacation.vacation_management.repositories.UserRepository;
import com.vacation.vacation_management.repositories.VacationRepository;
import com.vacation.vacation_management.services.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found " + email));

        if(dto.getToDate().isBefore(dto.getFromDate())){
            throw new RuntimeException("End date cannot be before start date");
        }

        validateNumberOfDays(dto, user);

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

    private void validateNumberOfDays(VacationRequestDto dto, User user) {

        long daysBetween = ChronoUnit.DAYS.between(dto.getFromDate(), dto.getToDate()) + 1;

        System.out.println("Days between start date and end date is " + daysBetween);

        if(daysBetween > user.getVacationDays()){
            throw new NotEnoughDaysOff("Not enough days off");
        }
    }

    @Override
    public List<VacationRequestResponse> getMyRequests(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found " + email));

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
        return changeStatus(id, VacationStatus.APPROVED, null);
    }

    @Override
    public VacationRequestResponse rejectRequest(RejectRequestDto requestDto) {
        return changeStatus(requestDto.requestId, VacationStatus.DECLINED, requestDto.rejectionReason);
    }

    private VacationRequestResponse changeStatus(UUID id, VacationStatus status,  String reason) {
        VacationRequest request = vacationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Request not found " + id));


        switch (status){
            case APPROVED:
                User user = request.getUser();
                long amountOfDaysOff = ChronoUnit.DAYS.between(request.getFromDate(), request.getToDate()) + 1;

                if(amountOfDaysOff > user.getVacationDays()){
                    throw new NotEnoughDaysOff("Not enough days off");
                }

                user.setVacationDays(user.getVacationDays() - (int) amountOfDaysOff);
                userRepository.save(user);
                break;

            case DECLINED:
                request.setRejectionReason(reason);
                break;
        }


        request.setStatus(status);
        vacationRepository.save(request);
        return vacationRequestMapper.toDto(request);
    }
}
