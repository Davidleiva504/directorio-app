import React, { useState, useEffect } from 'react';

const ControlForm = () => {
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');
  const [asunto, setAsunto] = useState('');
  const [contactos, setContactos] = useState([]);
  const [controles, setControles] = useState([]);

  useEffect(() => {
    fetchContactos();
    fetchControl();
  }, []);

  const fetchContactos = () => {
    fetch('http://localhost:3009/contactos')
      .then(response => response.json())
      .then(data => setContactos(data))
      .catch(error => console.error('Error al obtener los contactos:', error));
  };

  const fetchControl = () => {
    fetch('http://localhost:3009/control')
      .then(response => response.json())
      .then(data => setControles(data))
      .catch(error => console.error('Error al obtener los controles:', error));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const telefonoData = {
      id_contacto: id,
      fecha,
      asunto,
    };

    fetch('http://localhost:3009/control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telefonoData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Teléfono guardado:', data);
        // Realiza las acciones necesarias después de guardar el teléfono
        fetchControl();
      })
      .catch(error => {
        console.error('Error al guardar el teléfono:', error);
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
      </div>
      <div className="mb-3">
        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input type="date" className="form-control" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="asunto" className="form-label">Asunto</label>
        <textarea className="form-control" id="asunto" value={asunto}onChange={(e) => setAsunto(e.target.value)} /> 
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
    <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Contacto</th>
            <th>Fecha</th>
            <th>Asunto</th>
          </tr>
        </thead>
        <tbody>
          {controles.map((control) => (
            <tr key={control.id}>
              <td>{control.id}</td>
              <td>{control.id_contacto}</td>
              <td>{control.fecha}</td>
              <td>{control.asunto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ControlForm;
