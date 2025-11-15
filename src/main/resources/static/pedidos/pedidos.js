document.addEventListener("DOMContentLoaded", async () => {
  const tablaPedidos = document.getElementById("tablaPedidos");
  const totalPedidos = document.getElementById("totalPedidos");
  const pendientes = document.getElementById("pendientes");
  const aprobados = document.getElementById("aprobados");
  const rechazados = document.getElementById("rechazados");

  // Elementos de filtros
  const buscador = document.getElementById("buscadorPedidos");
  const filtroEstado = document.getElementById("filtroEstado");
  const fechaDesde = document.getElementById("fechaDesde");
  const fechaHasta = document.getElementById("fechaHasta");
  const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
  const resultadosFiltros = document.getElementById("resultadosFiltros");

  const BASE = "http://localhost:8080/solicitudFertilizante";

  let pedidosGlobal = []; // Array global para filtrado

  // Renderizar pedidos en tabla
  function renderizarPedidos(pedidos) {
    tablaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      tablaPedidos.innerHTML = `
        <tr>
          <td colspan="11" class="no-resultados">
            No se encontraron pedidos con los criterios seleccionados
          </td>
        </tr>
      `;
      return;
    }

    pedidos.forEach(p => {
      const fila = document.createElement("tr");
      fila.dataset.id = p.idSolicitud;

      let estadoColor = "";
      if (p.estado === "APROBADA") estadoColor = "style='background-color:#e8f5e9'";
      if (p.estado === "RECHAZADA") estadoColor = "style='background-color:#ffebee'";

      fila.innerHTML = `
        <td>${p.idSolicitud}</td>
        <td>${p.finca}</td>
        <td>${p.ubicacion}</td>
        <td>${p.tipoFertilizante}</td>
        <td>${p.cantidad}</td>
        <td>${p.fechaRequerida}</td>
        <td>${p.motivo}</td>
        <td>${p.notas || "-"}</td>
        <td>${p.prioridad}</td>
        <td ${estadoColor}>${p.estado}</td>
        <td class="btn-acciones">
          ${
            p.estado === "PENDIENTE"
              ? `
                <button class="btn-aprobar" onclick="cambiarEstado(${p.idSolicitud}, 'APROBADA')">Aprobar</button>
                <button class="btn-rechazar" onclick="cambiarEstado(${p.idSolicitud}, 'RECHAZADA')">Rechazar</button>
              `
              : `<em>—</em>`
          }
        </td>
      `;
      tablaPedidos.appendChild(fila);
    });
  }

  // Cargar solicitudes
  async function cargarPedidos() {
    try {
      const res = await fetch(BASE);
      if (!res.ok) throw new Error("Error al obtener los pedidos");
      const pedidos = await res.json();

      pedidosGlobal = pedidos; // Guardar en variable global

      // Actualizar contadores totales (siempre con todos los pedidos)
      totalPedidos.textContent = pedidos.length;
      pendientes.textContent = pedidos.filter(p => p.estado === "PENDIENTE").length;
      aprobados.textContent = pedidos.filter(p => p.estado === "APROBADA").length;
      rechazados.textContent = pedidos.filter(p => p.estado === "RECHAZADA").length;

      renderizarPedidos(pedidos);
      actualizarContadorResultados(pedidos.length, pedidos.length);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar los pedidos.");
    }
  }

  // ===== FUNCIONES DE FILTRADO =====
  function aplicarFiltros() {
    const textoBusqueda = buscador.value.toLowerCase().trim();
    const estadoSeleccionado = filtroEstado.value;
    const fechaMin = fechaDesde.value ? new Date(fechaDesde.value) : null;
    const fechaMax = fechaHasta.value ? new Date(fechaHasta.value) : null;

    const pedidosFiltrados = pedidosGlobal.filter(p => {
      // Filtro por texto (finca, ubicación o fertilizante)
      const coincideTexto = textoBusqueda === "" || 
        (p.finca && p.finca.toLowerCase().includes(textoBusqueda)) ||
        (p.ubicacion && p.ubicacion.toLowerCase().includes(textoBusqueda)) ||
        (p.tipoFertilizante && p.tipoFertilizante.toLowerCase().includes(textoBusqueda));

      // Filtro por estado
      const coincideEstado = estadoSeleccionado === "TODOS" || p.estado === estadoSeleccionado;

      // Filtro por fechas
      let coincideFecha = true;
      if (p.fechaRequerida && (fechaMin || fechaMax)) {
        const fechaPedido = new Date(p.fechaRequerida);
        
        if (fechaMin && fechaMax) {
          coincideFecha = fechaPedido >= fechaMin && fechaPedido <= fechaMax;
        } else if (fechaMin) {
          coincideFecha = fechaPedido >= fechaMin;
        } else if (fechaMax) {
          coincideFecha = fechaPedido <= fechaMax;
        }
      }

      return coincideTexto && coincideEstado && coincideFecha;
    });

    renderizarPedidos(pedidosFiltrados);
    actualizarContadorResultados(pedidosFiltrados.length, pedidosGlobal.length);
  }

  function actualizarContadorResultados(encontrados, total) {
    const hayFiltros = buscador.value.trim() !== "" || 
                       filtroEstado.value !== "TODOS" || 
                       fechaDesde.value !== "" || 
                       fechaHasta.value !== "";
    
    if (hayFiltros) {
      resultadosFiltros.textContent = `${encontrados} de ${total} pedidos`;
      resultadosFiltros.style.display = "inline-block";
    } else {
      resultadosFiltros.style.display = "none";
    }
  }

  function limpiarFiltros() {
    buscador.value = "";
    filtroEstado.value = "TODOS";
    fechaDesde.value = "";
    fechaHasta.value = "";
    aplicarFiltros();
  }

  // Event listeners para filtros
  buscador.addEventListener("input", aplicarFiltros);
  filtroEstado.addEventListener("change", aplicarFiltros);
  fechaDesde.addEventListener("change", aplicarFiltros);
  fechaHasta.addEventListener("change", aplicarFiltros);
  btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

  // Cambiar estado
  window.cambiarEstado = async (id, estado) => {
    try {
      const res = await fetch(`${BASE}/${id}/estado?estado=${estado}`, { method: "PUT" });

      if (res.ok) {
        alert(`Pedido ${estado.toLowerCase()} correctamente`);
        setTimeout(async () => {
          await cargarPedidos();
          // Mantener los filtros activos después de actualizar
          aplicarFiltros();
        }, 800);
      } else {
        const errorText = await res.text();
        alert("Error al actualizar estado: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar al servidor.");
    }
  };

  cargarPedidos();
});

function cerrarSesion() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href = '../login/login.html';
  }
}