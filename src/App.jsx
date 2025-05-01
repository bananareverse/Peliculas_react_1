// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import ActorList from './components/ActorList';
import ActorForm from './components/ActorForm';

function App() {
  const [refreshMovies, setRefreshMovies] = useState(false);
  const [refreshActors, setRefreshActors] = useState(false);

  return (
    <BrowserRouter>
      {/* Barra de navegación sencilla */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
        <div className="container">
          <NavLink to="/peliculas" className="navbar-brand fw-bold">
            🎥 Peliculas H
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Mostrar menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/peliculas"
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active text-primary' : ''}`
                  }
                >
                  Películas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/actores"
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active text-primary' : ''}`
                  }
                >
                  Actores
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route
            path="/peliculas"
            element={
              <>
                <MovieForm onSuccess={() => setRefreshMovies(!refreshMovies)} />
                <MovieList refresh={refreshMovies} />
              </>
            }
          />
          <Route
            path="/actores"
            element={
              <>
                <ActorForm onSuccess={() => setRefreshActors(!refreshActors)} />
                <ActorList refreshActors={refreshActors} />
              </>
            }
          />
          <Route
            path="*"
            element={
              <div className="text-center text-muted mt-5">
                <h3>Página no encontrada</h3>
                <p>
                  Ve a <NavLink to="/peliculas">Películas</NavLink> o{' '}
                  <NavLink to="/actores">Actores</NavLink>.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
