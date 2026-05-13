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
        return tratamientoRepository.save(tratamiento);
    }

    public void eliminar(Long id) {
        tratamientoRepository.deleteById(id);
    }

    public Tratamiento buscarPorId(Long id) {
        return tratamientoRepository.findById(id).orElse(null);
    }
}