package com.vacation.vacation_management.services.impl;

import com.vacation.vacation_management.domain.dtos.AuthResponse;
import com.vacation.vacation_management.domain.dtos.LoginRequest;
import com.vacation.vacation_management.domain.dtos.RegisterRequest;
import com.vacation.vacation_management.domain.entity.User;
import com.vacation.vacation_management.repositories.UserRepository;
import com.vacation.vacation_management.services.AuthService;
import com.vacation.vacation_management.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already taken");
        }

        User userToSave = User.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .email(request.getEmail())
                .hashPassword(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(userToSave);

        return new AuthResponse(jwtUtil.generateToken(userToSave));
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(), user.getHashPassword())){
            throw new RuntimeException("Invalid email or password");
        }

        return new AuthResponse(jwtUtil.generateToken(user));
    }
}
