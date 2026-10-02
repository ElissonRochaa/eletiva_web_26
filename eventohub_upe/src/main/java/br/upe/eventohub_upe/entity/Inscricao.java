package br.upe.eventohub_upe.entity;

import br.upe.eventohub_upe.entity.enums.StatusInscricao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "inscricao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inscricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Evento evento;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    private LocalDateTime data_inscricao;
    @Enumerated(EnumType.STRING)
    private StatusInscricao status;
}
