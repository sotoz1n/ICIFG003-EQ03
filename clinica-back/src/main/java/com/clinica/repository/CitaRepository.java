package com.clinica.repository;

import com.clinica.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    
    boolean existsByFechaAndHora(LocalDate fecha, LocalTime hora);
    
    boolean existsByCorreo(String correo);
}