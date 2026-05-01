package com.vacation.vacation_management.mappers;

import com.vacation.vacation_management.domain.dtos.VacationRequestResponse;
import com.vacation.vacation_management.domain.entity.VacationRequest;
import org.springframework.stereotype.Component;

@Component
public class VacationRequestMapper {

    public VacationRequestResponse toDto(VacationRequest vacationRequest){
        return VacationRequestResponse.builder()
                .id(vacationRequest.getId())
                .userName(vacationRequest.getUser().getName())
                .userSurname(vacationRequest.getUser().getSurname())
                .submissionDate(vacationRequest.getSubmissionDate())
                .fromDate(vacationRequest.getFromDate())
                .toDate(vacationRequest.getToDate())
                .reason(vacationRequest.getReason())
                .status(vacationRequest.getStatus())
                .build();
    }
}
