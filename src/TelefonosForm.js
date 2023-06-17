import React, { useState, useEffect } from 'react';

const TelefonoForm = () => {
  const [id, setId] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoTelefono, setTipoTelefono] = useState('');
  const [contactos, setContactos] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  

  useEffect(() => {
    fetchContactos();
    fetchTelefonos();
  }, []);

  const fetchContactos = () => {
    fetch('http://localhost:3009/contactos')
      .then(response => response.json())
      .then(data => setContactos(data))
      .catch(error => console.error('Error al obtener los contactos:', error));
  };

  const fetchTelefonos = () => {
    fetch('http://localhost:3009/telefonos')
      .then(response => response.json())
      .then(data => setTelefonos(data))
      .catch(error => console.error('Error al obtener los teléfonos:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const telefonoData = {
      id_contacto: id,
      telefono,
      tipo_telefono: tipoTelefono,
    };

    fetch('http://localhost:3009/telefonos', {
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
        fetchTelefonos();
      })
      .catch(error => {
        console.error('Error al guardar el teléfono:', error);
        // Realiza las acciones necesarias en caso de error
      });
  };

  return (
    <div>
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
        <label htmlFor="telefono" className="form-label">Teléfono</label>
        <input type="text" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="tipoTelefono" className="form-label">Tipo de Teléfono</label>
        <select className="form-select" id="tipoTelefono" value={tipoTelefono} onChange={(e) => setTipoTelefono(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="casa">Casa</option>
          <option value="empresa">Empresa</option>
          <option value="movil">Móvil</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
    <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Contacto</th>
            <th>Tipo de Teléfono</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {telefonos.map((telefono) => (
            <tr key={telefono.id}>
              <td>{telefono.id}</td>
              <td>{telefono.id_contacto}</td>
              <td>{telefono.tipo_telefono}</td>
              <td>{telefono.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TelefonoForm;
