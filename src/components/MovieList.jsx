// frontend/src/components/MovieList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = ({ refresh }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    axios
      .get('http://localhost:8000/peliculas/')
      .then((response) => setPeliculas(response.data))
      .catch((error) => console.error('Error al obtener películas:', error));
  }, [refresh]);

  const filtrarPeliculas = () => {
    const hoy = new Date().toISOString().split('T')[0];

    switch (filtro) {
      case 'anteriores':
        return peliculas.filter((p) => p.fecha_estreno < hoy);
      case 'actuales':
        return peliculas.filter((p) => p.fecha_estreno === hoy);
      case 'proximas':
        return peliculas.filter((p) => p.fecha_estreno > hoy);
      default:
        return peliculas;
    }
  };

  return (
    <div
      className="py-5"
      style={{
        background: 'linear-gradient(to bottom, #e3f2fd, #f9f9f9)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1 className="text-center mb-4 text-primary fw-bold display-5">
          <i className="bi bi-film me-2"></i>
          Películas Registradas
        </h1>

        {/* Filtros */}
        <div className="text-center mb-5">
          <div className="btn-group" role="group">
            <button
              className={`btn btn-outline-primary ${filtro === 'todas' ? 'active' : ''}`}
              onClick={() => setFiltro('todas')}
            >
              Todas
            </button>
            <button
              className={`btn btn-outline-success ${filtro === 'anteriores' ? 'active' : ''}`}
              onClick={() => setFiltro('anteriores')}
            >
              Anteriores
            </button>
            <button
              className={`btn btn-outline-warning ${filtro === 'actuales' ? 'active' : ''}`}
              onClick={() => setFiltro('actuales')}
            >
              Hoy
            </button>
            <button
              className={`btn btn-outline-danger ${filtro === 'proximas' ? 'active' : ''}`}
              onClick={() => setFiltro('proximas')}
            >
              Próximas
            </button>
          </div>
        </div>

        {/* Lista de películas */}
        <div className="row g-4">
          {filtrarPeliculas().map((pelicula) => (
            <div key={pelicula.id} className="col-sm-12 col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {pelicula.imagen && (
                  <img
                    src={pelicula.imagen}
                    alt={`Portada de ${pelicula.nombre}`}
                    className="card-img-top"
                    style={{ height: '280px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
  <h4 className="card-title text-info fw-bold mb-2">
    <i className="bi bi-play-circle-fill me-2"></i>
    {pelicula.nombre}
  </h4>
  <span className="badge bg-secondary mb-2">
    🎞️ Clasificación: {pelicula.clasificacion}
  </span>
  <p className="text-muted mb-1">
    📅 Estreno: <strong>{pelicula.fecha_estreno}</strong>
  </p>
  <p className="card-text">{pelicula.resena}</p>

  {/* <-- Aquí pintamos los actores asociados */}
  {pelicula.personajes.length > 0 && (
    <div className="mt-3">
      <h6 className="text-secondary">Actores:</h6>
      <div className="d-flex flex-wrap gap-2">
        {pelicula.personajes.map(personaje => (
          <div
            key={personaje.id}
            className="text-center"
            style={{ width: '60px' }}
          >
            {personaje.imagen && (
              <img
                src={personaje.imagen}
                alt={personaje.nombre}
                className="rounded-circle mb-1"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover'
                }}
              />
            )}
            <small className="d-block text-truncate">
              {personaje.nombre}
            </small>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

                <div className="card-footer bg-light text-end border-0">
                  <small className="text-muted">
                    <i className="bi bi-hash me-1"></i>ID {pelicula.id}
                  </small>
                </div>
              </div>
            </div>
          ))}

          {filtrarPeliculas().length === 0 && (
            <div className="col-12 text-center text-muted mt-4">
              <i className="bi bi-emoji-frown fs-1 d-block mb-2"></i>
              No hay películas en esta categoría.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
