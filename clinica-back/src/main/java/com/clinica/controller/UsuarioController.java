package com.clinica.controller;

import com.clinica.entity.Usuario;
import com.clinica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USER");
        }
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> userBD = usuarioRepository.findByUsername(usuario.getUsername());

        if (userBD.isPresent() && userBD.get().getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.ok(userBD.get());
        }

        return ResponseEntity.status(401).body("{\"message\": \"Credenciales incorrectas\"}");
    }
}