package com.vacation.vacation_management.exceptions;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {

        super("Invalid email or password");
    }
}
