// frontend/src/components/ActorList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActorList = ({ refreshActors }) => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/personajes/')
      .then(res => setActors(res.data))
      .catch(err => console.error(err));
  }, [refreshActors]);

  return (
    <div
      className="container-fluid px-4 py-5"
      style={{ background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)' }}
    >
      {/* Cabecera a ancho completo */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="display-4 fw-bold text-primary mb-2">
            🎭 Actores / Personajes
          </h2>
          <p className="lead text-muted">
            Listado completo de tus actores registrados
          </p>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="row gx-4 gy-4">
        {actors.map(actor => (
          <div key={actor.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderRadius: '1rem',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {actor.imagen && (
                <img
                  src={actor.imagen}
                  alt={actor.nombre}
                  className="card-img-top"
                  style={{ height: '220px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-info">{actor.nombre}</h5>
                <p
                  className="card-text text-truncate"
                  style={{ maxHeight: '4.5em', overflow: 'hidden' }}
                >
                  {actor.descripcion}
                </p>
              </div>
              <div className="card-footer bg-white border-0 text-end">
                <small className="text-muted">
                  <i className="bi bi-hash me-1"></i>ID {actor.id}
                </small>
              </div>
            </div>
          </div>
        ))}

        {actors.length === 0 && (
          <div className="col-12 text-center mt-5">
            <i className="bi bi-emoji-frown fs-1 text-muted mb-2"></i>
            <p className="text-muted">No hay actores registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorList;
