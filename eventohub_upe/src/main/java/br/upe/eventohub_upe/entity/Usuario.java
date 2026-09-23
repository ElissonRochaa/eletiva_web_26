package br.upe.eventohub_upe.entity;

import br.upe.eventohub_upe.entity.enums.Perfil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    @Column(unique = true, nullable = false)
    private String email;
    private String telefone;
    @Column(nullable = false)
    private String senha;
    @Enumerated(EnumType.STRING)
    private Perfil perfil;



}
