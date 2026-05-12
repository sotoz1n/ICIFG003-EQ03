package com.clinica.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "usuarios")
// CAMBIO CLAVE: Usamos Getter y Setter por separado
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private String rol;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore // Evita que el servidor envíe información cíclica
    private List<Cita> citas;
}