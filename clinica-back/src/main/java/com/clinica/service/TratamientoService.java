package com.clinica.service;

import com.clinica.entity.Tratamiento;
import com.clinica.repository.TratamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TratamientoService {

    @Autowired
    private TratamientoRepository tratamientoRepository;

    public List<Tratamiento> listarTodos() {
        return tratamientoRepository.findAll();
    }

    public Tratamiento guardar(Tratamiento tratamiento) {
        if (tratamiento.getId() == null && tratamientoRepository.existsByNombre(tratamiento.getNombre())) {
            throw new RuntimeException("Ya existe un tratamiento registrado con ese nombre.");
        }
        return tratamientoRepository.save(tratamiento);
    }

    public void eliminar(Long id) {
        tratamientoRepository.deleteById(id);
    }
}