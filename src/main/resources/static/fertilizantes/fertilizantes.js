const modal = document.getElementById("modalFertilizante");
const btnNuevo = document.getElementById("btnNuevoFertilizante");
const cerrar = document.getElementById("cerrarModal");
const form = document.getElementById("formFertilizante");
const tabla = document.getElementById("tablaFertilizantes");
const total = document.getElementById("totalFertilizantes");

const buscador = document.getElementById("buscadorFertilizantes");
const resultadosFiltros = document.getElementById("resultadosFiltros");

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://fertigo-production.up.railway.app";

const API_URL = `${BASE_URL}/fertilizante`;
const ID_ADMIN = 1;

let editandoId = null;
let fertilizantesGlobal = [];

// Abrir modal
btnNuevo.addEventListener("click", () => {
  editandoId = null;
  document.getElementById("modalTitulo").textContent = "Agregar Fertilizante";
  form.reset();
  modal.style.display = "flex";
});

// Cerrar modal
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
});

// Render
function renderizarFertilizantes(lista) {
  tabla.innerHTML = "";

  if (lista.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="8" class="no-resultados">
          No se encontraron fertilizantes con los criterios seleccionados
        </td>
      </tr>`;
    return;
  }

  lista.forEach(f => {
    tabla.innerHTML += `
      <tr>
        <td>${f.id}</td>
        <td>${f.nombre}</td>
        <td>${f.tipo}</td>
        <td>${f.cantidad}</td>
        <td>${f.unidad}</td>
        <td>${f.descripcion || ""}</td>
        <td>
          <button class="btn-editar" onclick="editarFertilizante(${f.id})">✏️ Editar</button>
          <button class="btn-eliminar" onclick="eliminarFertilizante(${f.id})">🗑️ Eliminar</button>
        </td>
      </tr>`;
  });
}

// Cargar
async function cargarFertilizantes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    fertilizantesGlobal = data;
    total.textContent = data.length;

    renderizarFertilizantes(data);
    actualizarContadorResultados(data.length, data.length);
  } catch (e) {
    alert("Error al cargar fertilizantes.");
  }
}

// Filtro
function aplicarFiltros() {
  const texto = buscador.value.toLowerCase().trim();

  const filtrados = fertilizantesGlobal.filter(f =>
    f.nombre.toLowerCase().includes(texto) ||
    f.tipo.toLowerCase().includes(texto) ||
    f.unidad.toLowerCase().includes(texto) ||
    (f.descripcion || "").toLowerCase().includes(texto)
  );

  renderizarFertilizantes(filtrados);
  actualizarContadorResultados(filtrados.length, fertilizantesGlobal.length);
}

buscador.addEventListener("input", aplicarFiltros);

function actualizarContadorResultados(encontrados, total) {
  if (buscador.value.trim() === "") {
    resultadosFiltros.style.display = "none";
  } else {
    resultadosFiltros.textContent = `${encontrados} de ${total} fertilizantes`;
    resultadosFiltros.style.display = "inline-block";
  }
}

// Guardar / editar
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevo = {
    nombre: document.getElementById("nombre").value,
    tipo: document.getElementById("tipo").value,
    cantidad: parseInt(document.getElementById("cantidad").value),
    unidad: document.getElementById("unidad").value,
    descripcion: document.getElementById("descripcion").value
  };

  try {
    if (editandoId) {
      await fetch(`${API_URL}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      });
      alert("Fertilizante actualizado");
    } else {
      await fetch(`${API_URL}/${ID_ADMIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      });
      alert("Fertilizante creado");
    }

    modal.style.display = "none";
    form.reset();
    buscador.value = "";
    cargarFertilizantes();

  } catch (e) {
    alert("Error al guardar fertilizante.");
  }
});

// Editar
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
  } catch (e) {
    alert("Error cargando fertilizante.");
  }
}

// Eliminar
async function eliminarFertilizante(id) {
  if (!confirm("¿Eliminar fertilizante?")) return;

  try {
    await fetch(`${API_URL}/${id}/${ID_ADMIN}`, { method: "DELETE" });

    alert("Fertilizante eliminado");
    buscador.value = "";
    cargarFertilizantes();

  } catch (e) {
    alert("Error eliminando fertilizante.");
  }
}

// Modal clic fuera
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    form.reset();
  }
};

function cerrarSesion() {
  if (confirm("¿Cerrar sesión?")) {
    localStorage.clear();
    window.location.href = "../login/Login.html";
  }
}

cargarFertilizantes();
