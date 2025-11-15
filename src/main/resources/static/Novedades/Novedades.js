document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tablaNovedades");
  const total = document.getElementById("totalNovedades");

  // Elementos de filtros
  const fechaDesde = document.getElementById("fechaDesde");
  const fechaHasta = document.getElementById("fechaHasta");
  const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
  const resultadosFiltros = document.getElementById("resultadosFiltros");

  const API_URL = "http://localhost:8080/novedades";

  let novedadesGlobal = []; // Array global para filtrado

  // Renderizar novedades en tabla
  function renderNovedades(lista) {
    tabla.innerHTML = "";

    if (lista.length === 0) {
      tabla.innerHTML = `
        <tr>
          <td colspan="7" class="no-resultados">
            No se encontraron novedades con los criterios seleccionados
          </td>
        </tr>
      `;
      return;
    }

    lista.forEach((nov) => {
      // Formatear fecha si existe
      let fechaFormateada = "-";
      if (nov.fechaEnvio) {
        const fecha = new Date(nov.fechaEnvio);
        fechaFormateada = fecha.toLocaleDateString('es-ES');
      }

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${nov.idNovedad}</td>
        <td>${nov.nombre}</td>
        <td>${nov.nombreDeFinca}</td>
        <td>${nov.correo}</td>
        <td>${nov.novedad}</td>
        <td>${fechaFormateada}</td>
        <td class="btn-acciones">
          <button class="btn-eliminar">Eliminar</button>
        </td>
      `;

      // Botón eliminar
      const btnEliminar = fila.querySelector(".btn-eliminar");
      btnEliminar.addEventListener("click", async () => {
        if (confirm("¿Seguro que deseas eliminar esta novedad?")) {
          await eliminarNovedad(nov.idNovedad);
          // Recargar y mantener filtros
          await cargarNovedades();
          aplicarFiltros();
        }
      });

      tabla.appendChild(fila);
    });
  }

  // Cargar todas las novedades
  async function cargarNovedades() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener las novedades");
      const novedades = await response.json();
      
      // Agregar fecha actual si no existe (para demostración)
      novedadesGlobal = novedades.map(n => ({
        ...n,
        fechaEnvio: n.fechaEnvio || new Date().toISOString()
      }));

      total.textContent = novedadesGlobal.length;
      renderNovedades(novedadesGlobal);
      actualizarContadorResultados(novedadesGlobal.length, novedadesGlobal.length);
    } catch (error) {
      console.error("Error:", error);
      tabla.innerHTML = `<tr><td colspan="7">⚠ No se pudieron cargar las novedades.</td></tr>`;
    }
  }

  // ===== FUNCIÓN DE FILTRADO =====
  function aplicarFiltros() {
    const fechaMin = fechaDesde.value ? new Date(fechaDesde.value) : null;
    const fechaMax = fechaHasta.value ? new Date(fechaHasta.value) : null;

    const novedadesFiltradas = novedadesGlobal.filter(n => {
      // Filtro por fechas
      let coincideFecha = true;
      if (n.fechaEnvio && (fechaMin || fechaMax)) {
        const fechaNovedad = new Date(n.fechaEnvio);
        
        if (fechaMin && fechaMax) {
          coincideFecha = fechaNovedad >= fechaMin && fechaNovedad <= fechaMax;
        } else if (fechaMin) {
          coincideFecha = fechaNovedad >= fechaMin;
        } else if (fechaMax) {
          coincideFecha = fechaNovedad <= fechaMax;
        }
      }

      return coincideFecha;
    });

    renderNovedades(novedadesFiltradas);
    actualizarContadorResultados(novedadesFiltradas.length, novedadesGlobal.length);
  }

  function actualizarContadorResultados(encontrados, total) {
    const hayFiltros = fechaDesde.value !== "" || fechaHasta.value !== "";
    
    if (hayFiltros) {
      resultadosFiltros.textContent = `${encontrados} de ${total} novedades`;
      resultadosFiltros.style.display = "inline-block";
    } else {
      resultadosFiltros.style.display = "none";
    }
  }

  function limpiarFiltros() {
    fechaDesde.value = "";
    fechaHasta.value = "";
    aplicarFiltros();
  }

  // Event listeners para filtros
  fechaDesde.addEventListener("change", aplicarFiltros);
  fechaHasta.addEventListener("change", aplicarFiltros);
  btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

  // Eliminar una novedad
  async function eliminarNovedad(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar novedad");
      alert("✅ Novedad eliminada correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ No se pudo eliminar la novedad");
    }
  }

  // Ejecutar carga inicial
  cargarNovedades();
});

function cerrarSesion() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href = '../login/login.html';
  }
}