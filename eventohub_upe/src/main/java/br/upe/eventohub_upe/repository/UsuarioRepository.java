package br.upe.eventohub_upe.repository;

import br.upe.eventohub_upe.entity.Usuario;
import br.upe.eventohub_upe.entity.enums.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    public Usuario findByEmail(String email);
}
