import React, { useState, useEffect } from 'react';

const DireccionesForm = () => {
  const [id, setId] = useState('');
  const [tipoDireccion, setTipoDireccion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contactos, setContactos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);

  useEffect(() => {
    fetchContactos();
    fetchDirecciones();
  }, []);

  const fetchContactos = () => {
    fetch('http://localhost:3009/contactos')
      .then(response => response.json())
      .then(data => setContactos(data))
      .catch(error => console.error('Error al obtener los contactos:', error));
  };

  const fetchDirecciones = () => {
    fetch('http://localhost:3009/direcciones')
      .then(response => response.json())
      .then(data => setDirecciones(data))
      .catch(error => console.error('Error al obtener las direcciones:', error));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const direccionData = {
      id_contacto: id,
      tipo_direccion: tipoDireccion,
      direccion,
    };

    fetch('http://localhost:3009/direcciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(direccionData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Dirección guardada:', data);
        // Realiza las acciones necesarias después de guardar la dirección
        fetchDirecciones();
      })
      .catch(error => {
        console.error('Error al guardar la dirección:', error);
        // Realiza las acciones necesarias en caso de error
      });
  };

  return (
    <div class="p-5">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">Id Contacto</label>
        <select className="form-select" id="id" value={id} onChange={(e) => setId(e.target.value)}>
          <option value="">Seleccionar</option>
          {contactos.map((contacto) => (
            <option key={contacto.id} value={contacto.id}>{contacto.id}</option>
          ))}
        </select>
      </div >
      <div className="mb-3">
        <label htmlFor="tipoDireccion" className="form-label">Tipo de Dirección</label>
        <select className="form-select" id="tipoDireccion" value={tipoDireccion} onChange={(e) => setTipoDireccion(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="casa">Casa</option>
          <option value="empresa">Empresa</option>
          <option value="trabajo">Trabajo</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="direccion" className="form-label">Dirección</label>
        <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
    <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Contacto</th>
            <th>Tipo de Dirección</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {direcciones.map((direccion) => (
            <tr key={direccion.id}>
              <td>{direccion.id}</td>
              <td>{direccion.id_contacto}</td>
              <td>{direccion.tipo_direccion}</td>
              <td>{direccion.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DireccionesForm;


