package com.clinica.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "citas")
@Data 
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombrePaciente;
    private String correo;
    private String tratamiento;
    private LocalDate fecha;
    private LocalTime hora;
}