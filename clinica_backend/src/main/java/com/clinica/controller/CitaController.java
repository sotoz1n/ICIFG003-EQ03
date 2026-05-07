package com.clinica.controller;

import com.clinica.model.Cita;
import com.clinica.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200")
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @GetMapping
    public List<Cita> listarCitas() {
        return citaRepository.findAll();
    }

    @PostMapping
    public Cita agendarCita(@RequestBody Cita cita) {
        return citaRepository.save(cita);
    }

    @DeleteMapping("/{id}")
    public void eliminarCita(@PathVariable Long id) {
        citaRepository.deleteById(id);
    }
}