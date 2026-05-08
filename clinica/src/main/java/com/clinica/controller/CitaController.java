package com.clinica.controller;

import com.clinica.entity.Cita; // Import corregido para usar la entidad
import com.clinica.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200")
public class CitaController {

    @Autowired
    private CitaService citaService; // Ahora usamos el servicio

    @GetMapping
    public List<Cita> listarCitas() {
        return citaService.listarTodas();
    }

    @PostMapping
    public Cita agendarCita(@RequestBody Cita cita) {
        return citaService.guardar(cita); // Ahora sí pasa por la regla de negocio
    }

    @DeleteMapping("/{id}")
    public void eliminarCita(@PathVariable Long id) {
        citaService.eliminar(id);
    }
}