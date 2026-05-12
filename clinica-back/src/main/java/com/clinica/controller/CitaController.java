package com.clinica.controller;

import com.clinica.entity.Cita; 
import com.clinica.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CitaController {

    @Autowired
    private CitaService citaService;

    @GetMapping
    public List<Cita> listarCitas() {
        return citaService.listarTodas();
    }

    @PostMapping
    public Cita agendarCita(@RequestBody Cita cita) {
        return citaService.guardar(cita); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cita> actualizarCita(@PathVariable Long id, @RequestBody Cita citaDetalles) {
        Cita citaExistente = citaService.buscarPorId(id);
        
        if (citaExistente == null) {
            return ResponseEntity.notFound().build();
        }

        citaExistente.setNombrePaciente(citaDetalles.getNombrePaciente());
        citaExistente.setCorreo(citaDetalles.getCorreo());
        citaExistente.setTratamiento(citaDetalles.getTratamiento());
        citaExistente.setFecha(citaDetalles.getFecha());
        citaExistente.setHora(citaDetalles.getHora());

        Cita citaActualizada = citaService.guardar(citaExistente);
        return ResponseEntity.ok(citaActualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminarCita(@PathVariable Long id) {
        citaService.eliminar(id);
    }
}