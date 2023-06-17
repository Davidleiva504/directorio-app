import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactosForm = () => {
  const [id, setId] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha_nacimiento, setFecha_nacimiento] = useState('');
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    try {
      const response = await axios.get('http://localhost:3009/contactos/');
      setContactos(response.data);
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Objeto con los datos a enviar
    const data = {
      id,
      nombres: nombres,
      apellido,
      fechaNacimiento: fecha_nacimiento
    };

    // Realizar la solicitud POST utilizando axios
    axios.post('http://localhost:3009/contactos', data)
      .then(response => {
        fetchContactos();
        console.log(response.data);
        setNombres('');
        setApellido('');
        setFecha_nacimiento('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
  axios.delete(`http://localhost:3009/contactos/${id}`)
    .then(response => {
      console.log('Contacto eliminado:', response.data);
      fetchContactos(); // Actualizar la lista de contactos después de la eliminación
    })
    .catch(error => {
      console.error('Error al eliminar el contacto:', error);
    });
};

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">Id</label>
          <input type="text" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="nombres" className="form-label">Nombres</label>
          <input type="text" className="form-control" id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
          <input type="date" className="form-control" id="fechaNacimiento" value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Guardarr</button>
      </form>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto) => (
            <tr key={contacto.id}>
              <td>{contacto.id}</td>
              <td>{contacto.nombres}</td>
              <td>{contacto.apellido}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(contacto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactosForm;
