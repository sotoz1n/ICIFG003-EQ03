package com.clinica.controller;

import com.clinica.entity.Tratamiento;
import com.clinica.service.TratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tratamientos")
@CrossOrigin(origins = "http://localhost:4200")
public class TratamientoController {

    @Autowired
    private TratamientoService tratamientoService;

    @GetMapping
    public List<Tratamiento> listarTratamientos() {
        return tratamientoService.listarTodos();
    }

    @PostMapping
    public Tratamiento guardarTratamiento(@RequestBody Tratamiento tratamiento) {
        return tratamientoService.guardar(tratamiento);
    }

    @DeleteMapping("/{id}")
    public void eliminarTratamiento(@PathVariable Long id) {
        tratamientoService.eliminar(id);
    }
}