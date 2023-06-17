import React, { useState, useEffect } from 'react';

const CorreoForm = () => {
  const [id, setId] = useState('');
  const [correo, setCorreo] = useState('');
  const [contactos, setContactos] = useState([]);
  const [correos, setCorreos] = useState([]);

  useEffect(() => {
    fetchContactos();
    fetchCorreos();
  }, []);

  const fetchContactos = () => {
    fetch('http://localhost:3009/contactos')
      .then(response => response.json())
      .then(data => setContactos(data))
      .catch(error => console.error('Error al obtener los contactos:', error));
  };

  const fetchCorreos = () => {
    fetch('http://localhost:3009/correos')
      .then(response => response.json())
      .then(data => setCorreos(data))
      .catch(error => console.error('Error al obtener los correos:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const correoData = {
      id_contacto: id,
      correo,
    };

    fetch('http://localhost:3009/correos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(correoData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Correo guardado:', data);
        // Realiza las acciones necesarias después de guardar el correo
        // Por ejemplo, volver a obtener los correos actualizados
        fetchCorreos();
      })
      .catch(error => {
        console.error('Error al guardar el correo:', error);
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
          <label htmlFor="correo" className="form-label">Correo</label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ID Contacto</th>
            <th scope="col">Correo</th>
          </tr>
        </thead>
        <tbody>
          {correos.map((correo) => (
            <tr key={correo.id}>
              <th scope="row">{correo.id}</th>
              <td>{correo.id_contacto}</td>
              <td>{correo.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CorreoForm;
