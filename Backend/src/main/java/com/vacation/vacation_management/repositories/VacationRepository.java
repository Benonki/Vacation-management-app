package com.vacation.vacation_management.repositories;

import com.vacation.vacation_management.domain.entity.User;
import com.vacation.vacation_management.domain.entity.VacationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VacationRepository extends JpaRepository<VacationRequest, UUID> {
    List<VacationRequest> findByUser(User user);
}
