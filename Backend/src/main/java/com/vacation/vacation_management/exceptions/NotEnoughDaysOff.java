package com.vacation.vacation_management.exceptions;

public class NotEnoughDaysOff extends RuntimeException {
    public NotEnoughDaysOff(String message) {
        super(message);
    }
}
