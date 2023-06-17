import React, { useState } from 'react';
import ContactosForm from './ContactosForm';
import DireccionesForm from './DireccionesForm';
import CorreosForm from './CorreosForm';
import TelefonosForm from './TelefonosForm';
import ControlForm from './ControlForm';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [currentPage, setCurrentPage] = useState('contactos');

  const renderForm = () => {
    switch (currentPage) {
      case 'contactos':
        return <ContactosForm />;
      case 'direcciones':
        return <DireccionesForm />;
      case 'correos':
        return <CorreosForm />;
      case 'telefonos':
        return <TelefonosForm />;
      case 'control':
        return <ControlForm />;
      default:
        return null;
    }
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item" onClick={() => handleNavClick('contactos')}>
              <span className={`nav-link ${currentPage === 'contactos' && 'active'}`}>Contactos</span>
            </li>
            <li className="nav-item" onClick={() => handleNavClick('direcciones')}>
              <span className={`nav-link ${currentPage === 'direcciones' && 'active'}`}>Direcciones</span>
            </li>
            <li className="nav-item" onClick={() => handleNavClick('correos')}>
              <span className={`nav-link ${currentPage === 'correos' && 'active'}`}>Correos</span>
            </li>
            <li className="nav-item" onClick={() => handleNavClick('telefonos')}>
              <span className={`nav-link ${currentPage === 'telefonos' && 'active'}`}>Teléfonos</span>
            </li>
            <li className="nav-item" onClick={() => handleNavClick('control')}>
              <span className={`nav-link ${currentPage === 'control' && 'active'}`}>Control</span>
            </li>
          </ul>
        </div>
      </nav>
      <div>{renderForm()}</div>
    </div>
  );
};

export default App;
