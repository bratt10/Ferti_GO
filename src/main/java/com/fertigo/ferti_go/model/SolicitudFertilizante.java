package com.fertigo.ferti_go.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "solicitud_fertilizante")
public class SolicitudFertilizante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id_solicitud")
    private Long idSolicitud;

    private String finca;
    private String ubicacion;
    
    // ⭐ SOLUCIÓN: @JsonAlias acepta AMBOS nombres al RECIBIR
    // Responde con "tipo_fertilizante" pero acepta "tipoFertilizante" también
    @JsonProperty("tipo_fertilizante")
    @JsonAlias("tipoFertilizante")  // ⭐ Acepta camelCase de Flutter
    @Column(name = "tipo_fertilizante", nullable = false)
    private String tipoFertilizante;
    
    private Float cantidad;
    
    @JsonProperty("fecha_requerida")
    @JsonAlias("fechaRequerida")  // ⭐ Acepta camelCase de Flutter
    @Column(name = "fecha_requerida")
    private LocalDate fechaRequerida;
    
    private String motivo;
    private String notas;
    private String prioridad;

    @JsonProperty("fecha_solicitud")
    @Column(name = "fecha_solicitud", updatable = false)
    private LocalDateTime fechaSolicitud;

    @Enumerated(EnumType.STRING)
    private EstadoSolicitud estado = EstadoSolicitud.PENDIENTE;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private UsuarioModel usuario;

    public enum EstadoSolicitud {
        PENDIENTE,
        APROBADA,
        RECHAZADA
    }

    @PrePersist
    protected void onCreate() {
        if (this.fechaRequerida == null) {
            this.fechaRequerida = LocalDate.now();
        }
        this.fechaSolicitud = LocalDateTime.now();
    }
    public EstadoSolicitud getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitud estado) {
        this.estado = estado;
    }
}