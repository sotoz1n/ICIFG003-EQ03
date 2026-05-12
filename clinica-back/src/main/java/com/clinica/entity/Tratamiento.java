package com.clinica.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tratamientos")
@Data
public class Tratamiento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    private String descripcion;
    
    private Integer precio;
    
    // Duración en minutos, útil para el futuro si quieres calcular ocupación de agenda
    private Integer duracionMinutos; 
}