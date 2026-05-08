package com.clinica.repository;

import com.clinica.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    
    // Método que ya tenías para evitar cruces de horario
    boolean existsByFechaAndHora(LocalDate fecha, LocalTime hora);
    
    // NUEVO: Método para la Opción B (verificar si el paciente ya tiene cita)
    boolean existsByCorreo(String correo);
}