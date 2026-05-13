package com.clinica.controller;

import com.clinica.entity.Tratamiento;
import com.clinica.service.TratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public Tratamiento crearTratamiento(@RequestBody Tratamiento tratamiento) {
        return tratamientoService.guardar(tratamiento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tratamiento> actualizarTratamiento(@PathVariable Long id, @RequestBody Tratamiento detalles) {
        Tratamiento existe = tratamientoService.buscarPorId(id);
        
        if (existe == null) {
            return ResponseEntity.notFound().build();
        }

        existe.setNombre(detalles.getNombre());
        existe.setDescripcion(detalles.getDescripcion());
        existe.setPrecio(detalles.getPrecio());
        existe.setDuracionMinutos(detalles.getDuracionMinutos());

        Tratamiento actualizado = tratamientoService.guardar(existe);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarTratamiento(@PathVariable Long id) {
        tratamientoService.eliminar(id);
    }
}