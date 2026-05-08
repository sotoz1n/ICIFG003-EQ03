package com.clinica.service;

import com.clinica.entity.Cita;
import com.clinica.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class CitaService {
    
    @Autowired
    private CitaRepository citaRepository;

    public List<Cita> listarTodas() {
        return citaRepository.findAll();
    }

    public Cita guardar(Cita cita) {
        // 1. Opción A: Validar el horario comercial (09:00 a 18:00)
        if (cita.getHora().isBefore(LocalTime.of(9, 0)) || cita.getHora().isAfter(LocalTime.of(18, 0))) {
            throw new RuntimeException("El horario de atención es de 09:00 a 18:00.");
        }

        // 2. Opción B: Validar si el paciente ya tiene una cita activa (usando el correo)
        if (citaRepository.existsByCorreo(cita.getCorreo())) {
            throw new RuntimeException("El paciente ya tiene una cita agendada en el sistema.");
        }

        // 3. Validar que la fecha y hora solicitadas no estén ocupadas
        if (citaRepository.existsByFechaAndHora(cita.getFecha(), cita.getHora())) {
            throw new RuntimeException("El horario ya está ocupado por otro paciente.");
        }

        // Si pasa todas las validaciones, se guarda la cita
        return citaRepository.save(cita);
    }

    public void eliminar(Long id) {
        citaRepository.deleteById(id);
    }
}