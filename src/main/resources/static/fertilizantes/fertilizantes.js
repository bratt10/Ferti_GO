const modal = document.getElementById("modalFertilizante");
const btnNuevo = document.getElementById("btnNuevoFertilizante");
const cerrar = document.getElementById("cerrarModal");
const form = document.getElementById("formFertilizante");
const tabla = document.getElementById("tablaFertilizantes");
const total = document.getElementById("totalFertilizantes");

// Elementos de filtros
const buscador = document.getElementById("buscadorFertilizantes");
const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");
const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
const resultadosFiltros = document.getElementById("resultadosFiltros");

const API_URL = "http://localhost:8080/fertilizante";
const ID_ADMIN = 1; // Cambia según tu admin en BD

let editandoId = null;
let fertilizantesGlobal = []; // Array global para filtrado

// Abrir modal
btnNuevo.addEventListener("click", () => {
  editandoId = null;
  document.getElementById("modalTitulo").textContent = "Agregar Fertilizante";
  form.reset();
  modal.style.display = "flex";
});
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
});

// Renderizar fertilizantes en tabla
function renderizarFertilizantes(fertilizantes) {
  tabla.innerHTML = "";
  
  if (fertilizantes.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="8" class="no-resultados">
          No se encontraron fertilizantes con los criterios seleccionados
        </td>
      </tr>
    `;
    return;
  }

  fertilizantes.forEach(f => {
    // Formatear fecha si existe
    let fechaFormateada = "-";
    if (f.fechaRegistro) {
      const fecha = new Date(f.fechaRegistro);
      fechaFormateada = fecha.toLocaleDateString('es-ES');
    }

    const row = `<tr>
      <td>${f.id}</td>
      <td>${f.nombre}</td>
      <td>${f.tipo}</td>
      <td>${f.cantidad}</td>
      <td>${f.unidad}</td>
      <td>${f.descripcion || ""}</td>
      <td>${fechaFormateada}</td>
      <td>
        <button class="btn-edit" onclick="editarFertilizante(${f.id})">✏️ Editar</button>
        <button class="btn-delete" onclick="eliminarFertilizante(${f.id})">🗑️ Eliminar</button>
      </td>
    </tr>`;
    tabla.innerHTML += row;
  });
}

// Cargar fertilizantes
async function cargarFertilizantes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    
    // Agregar fecha actual si no existe (para demostración)
    fertilizantesGlobal = data.map(f => ({
      ...f,
      fechaRegistro: f.fechaRegistro || new Date().toISOString()
    }));
    
    renderizarFertilizantes(fertilizantesGlobal);
    total.textContent = fertilizantesGlobal.length;
    actualizarContadorResultados(fertilizantesGlobal.length, fertilizantesGlobal.length);
  } catch (error) {
    console.error("Error cargando fertilizantes:", error);
    alert("Error al cargar los fertilizantes. Verifica que el servidor esté activo.");
  }
}

// ===== FUNCIONES DE FILTRADO =====
function aplicarFiltros() {
  const textoBusqueda = buscador.value.toLowerCase().trim();
  const fechaMin = fechaDesde.value ? new Date(fechaDesde.value) : null;
  const fechaMax = fechaHasta.value ? new Date(fechaHasta.value) : null;

  const fertilizantesFiltrados = fertilizantesGlobal.filter(f => {
    // Filtro por texto (nombre o tipo)
    const coincideTexto = textoBusqueda === "" || 
      f.nombre.toLowerCase().includes(textoBusqueda) ||
      f.tipo.toLowerCase().includes(textoBusqueda);

    // Filtro por fechas
    let coincideFecha = true;
    if (f.fechaRegistro && (fechaMin || fechaMax)) {
      const fechaFertilizante = new Date(f.fechaRegistro);
      
      if (fechaMin && fechaMax) {
        coincideFecha = fechaFertilizante >= fechaMin && fechaFertilizante <= fechaMax;
      } else if (fechaMin) {
        coincideFecha = fechaFertilizante >= fechaMin;
      } else if (fechaMax) {
        coincideFecha = fechaFertilizante <= fechaMax;
      }
    }

    return coincideTexto && coincideFecha;
  });

  renderizarFertilizantes(fertilizantesFiltrados);
  actualizarContadorResultados(fertilizantesFiltrados.length, fertilizantesGlobal.length);
}

function actualizarContadorResultados(encontrados, total) {
  const hayFiltros = buscador.value.trim() !== "" || fechaDesde.value !== "" || fechaHasta.value !== "";
  
  if (hayFiltros) {
    resultadosFiltros.textContent = `${encontrados} de ${total} fertilizantes`;
    resultadosFiltros.style.display = "inline-block";
  } else {
    resultadosFiltros.style.display = "none";
  }
}

function limpiarFiltros() {
  buscador.value = "";
  fechaDesde.value = "";
  fechaHasta.value = "";
  aplicarFiltros();
}

// Event listeners para filtros
buscador.addEventListener("input", aplicarFiltros);
fechaDesde.addEventListener("change", aplicarFiltros);
fechaHasta.addEventListener("change", aplicarFiltros);
btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

// Guardar / Editar fertilizante
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nuevo = {
    nombre: document.getElementById("nombre").value,
    tipo: document.getElementById("tipo").value,
    cantidad: parseInt(document.getElementById("cantidad").value),
    unidad: document.getElementById("unidad").value,
    descripcion: document.getElementById("descripcion").value,
    fechaRegistro: new Date().toISOString() // Agregar fecha actual
  };

  try {
    if (editandoId) {
      // Editar
      await fetch(`${API_URL}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      });
      alert("✅ Fertilizante actualizado correctamente");
    } else {
      // Nuevo
      await fetch(`${API_URL}/${ID_ADMIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      });
      alert("✅ Fertilizante creado correctamente");
    }

    modal.style.display = "none";
    form.reset();
    limpiarFiltros(); // Limpiar filtros al guardar
    await cargarFertilizantes();
  } catch (error) {
    console.error("Error guardando fertilizante:", error);
    alert("Error al guardar el fertilizante. Verifica la conexión con el servidor.");
  }
});

// Editar fertilizante
async function editarFertilizante(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const f = await res.json();

    editandoId = id;
    document.getElementById("modalTitulo").textContent = "Editar Fertilizante";

    document.getElementById("nombre").value = f.nombre;
    document.getElementById("tipo").value = f.tipo;
    document.getElementById("cantidad").value = f.cantidad;
    document.getElementById("unidad").value = f.unidad;
    document.getElementById("descripcion").value = f.descripcion || "";

    modal.style.display = "flex";
  } catch (error) {
    console.error("Error cargando fertilizante:", error);
    alert("Error al cargar el fertilizante para edición.");
  }
}

// Eliminar fertilizante
async function eliminarFertilizante(id) {
  if (confirm("¿Seguro que deseas eliminar este fertilizante?")) {
    try {
      await fetch(`${API_URL}/${id}/${ID_ADMIN}`, {
        method: "DELETE"
      });
      alert("✅ Fertilizante eliminado correctamente");
      limpiarFiltros(); // Limpiar filtros al eliminar
      await cargarFertilizantes();
    } catch (error) {
      console.error("Error eliminando fertilizante:", error);
      alert("Error al eliminar el fertilizante.");
    }
  }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    form.reset();
  }
};

function cerrarSesion() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href = '../login/login.html';
  }
}

// Cargar inicial
cargarFertilizantes();