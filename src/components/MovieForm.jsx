import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    nombre: '',
    clasificacion: '',
    fecha_estreno: '',
    resena: '',
    temporada: '',
    imagen: '',
    personajes_ids: []
  });
  const [actors, setActors] = useState([]);
  const [msg, setMsg] = useState('');

  // Cargar lista de actores para el checkbox múltiple
  useEffect(() => {
    axios.get('http://localhost:8000/personajes/')
      .then(res => setActors(res.data))
      .catch(() => setActors([]));
  }, []);

  const handleChange = e => {
    const { name, value, checked } = e.target;
    if (name === 'personajes_ids') {
      // gestión checkbox múltiple
      setForm(form => ({
        ...form,
        personajes_ids: checked
          ? [...form.personajes_ids, Number(value)]
          : form.personajes_ids.filter(id => id !== Number(value))
      }));
    } else {
      setForm(form => ({ ...form, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/peliculas/', form);
      setMsg('Película agregada ✅');
      setForm({
        nombre: '',
        clasificacion: '',
        fecha_estreno: '',
        resena: '',
        temporada: '',
        imagen: '',
        personajes_ids: []
      });
      onSuccess();
    } catch {
      setMsg('Error al agregar película ❌');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">➕ Nueva Película</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Clasificación */}
        <div className="mb-3">
          <label className="form-label">Clasificación</label>
          <input
            type="text"
            name="clasificacion"
            className="form-control"
            value={form.clasificacion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Fecha de estreno */}
        <div className="mb-3">
          <label className="form-label">Fecha de Estreno</label>
          <input
            type="date"
            name="fecha_estreno"
            className="form-control"
            value={form.fecha_estreno}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reseña */}
        <div className="mb-3">
          <label className="form-label">Reseña</label>
          <textarea
            name="resena"
            className="form-control"
            value={form.resena}
            onChange={handleChange}
            required
          />
        </div>

        {/* Temporada */}
        <div className="mb-3">
          <label className="form-label">Temporada (opcional)</label>
          <input
            type="text"
            name="temporada"
            className="form-control"
            value={form.temporada}
            onChange={handleChange}
          />
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label">URL de Imagen (opcional)</label>
          <input
            type="url"
            name="imagen"
            className="form-control"
            value={form.imagen}
            onChange={handleChange}
          />
        </div>

        {/* Protagonistas (selección múltiple) */}
        <div className="mb-3">
          <label className="form-label">Protagonistas</label>
          <div
            className="border rounded p-2"
            style={{ maxHeight: '180px', overflowY: 'auto' }}
          >
            {actors.map(a => (
              <div key={a.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="personajes_ids"
                  id={`actor-${a.id}`}
                  value={a.id}
                  checked={form.personajes_ids.includes(a.id)}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`actor-${a.id}`}>
                  {a.nombre}
                </label>
              </div>
            ))}
            {actors.length === 0 && (
              <p className="text-muted m-0">No hay actores disponibles.</p>
            )}
          </div>
        </div>

        {/* Botón Guardar */}
        <button type="submit" className="btn btn-success">
          Guardar Película
        </button>

        {/* Mensaje */}
        {msg && <div className="mt-3 alert alert-info">{msg}</div>}
      </form>
    </div>
  );
};

export default MovieForm;
