package br.upe.eventohub_upe.entity;

import br.upe.eventohub_upe.entity.enums.TipoEvento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "evento")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String titulo;
    @Column(nullable = false, length = 2048)
    private String descricao;
    private LocalDate data;
    private LocalTime hora;
    @OneToOne(cascade = CascadeType.ALL)
    private Endereco local;
    private String url;
    private Integer capacidadeMax;
    @Enumerated(EnumType.STRING)
    private TipoEvento tipoEvento;
    //Organizador
    @ManyToOne
    @JoinColumn(name = "id_organizador")
    private Usuario organizador;
    @ManyToMany
    @JoinTable(
            name = "evento_categoria",
            joinColumns = @JoinColumn(name = "id_evento"),
            inverseJoinColumns = @JoinColumn(name = "id_categoria")
    )
    private List<Categoria> categorias;

    @OneToMany(mappedBy = "evento")
    private List<Inscricao> inscricoes;

}
