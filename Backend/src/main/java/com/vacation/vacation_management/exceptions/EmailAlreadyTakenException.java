package com.vacation.vacation_management.exceptions;

public class EmailAlreadyTakenException extends RuntimeException{
    public EmailAlreadyTakenException(String email){
        super("Email already taken: " + email);
    }
}
