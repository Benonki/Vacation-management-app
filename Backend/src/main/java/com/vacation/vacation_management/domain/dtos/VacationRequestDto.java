package com.vacation.vacation_management.domain.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class VacationRequestDto {
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
}
