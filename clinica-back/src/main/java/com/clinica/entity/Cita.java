package com.clinica.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "citas")
@Getter
@Setter
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombrePaciente;
    private String correo;
    private String tratamiento;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fecha;
    
    @JsonFormat(pattern = "HH:mm")
    private LocalTime hora;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
