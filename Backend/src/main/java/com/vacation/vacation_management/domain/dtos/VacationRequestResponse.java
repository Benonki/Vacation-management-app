package com.vacation.vacation_management.domain.dtos;

import com.vacation.vacation_management.domain.enums.VacationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class VacationRequestResponse {
    private UUID id;
    private String userName;
    private String userSurname;
    private LocalDate submissionDate;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private VacationStatus status;
}
