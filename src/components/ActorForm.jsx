import React, { useState } from 'react';
import axios from 'axios';

const ActorForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', imagen: '' });
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/personajes/', form);
      setMsg('Actor creado ✅');
      setForm({ nombre: '', descripcion: '', imagen: '' });
      onSuccess();
    } catch {
      setMsg('Error creando actor ❌');
    }
  };

  return (
    <div className="container py-4">
      <h2>➕ Nuevo Actor</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" name="nombre" value={form.nombre} onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">URL Imagen</label>
          <input className="form-control" name="imagen" value={form.imagen} onChange={onChange}/>
        </div>
        <button className="btn btn-primary">Crear Actor</button>
        {msg && <div className="mt-2 alert alert-info">{msg}</div>}
      </form>
    </div>
  );
};

export default ActorForm;
