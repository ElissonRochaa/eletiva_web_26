package br.upe.eventohub_upe.service;

import br.upe.eventohub_upe.entity.Usuario;
import br.upe.eventohub_upe.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criarUsuario(Usuario usuario){

        if(usuarioRepository.findByEmail(usuario.getEmail())!=null){
            return null;
        }
        
        return usuarioRepository.save(usuario);

    }

}
