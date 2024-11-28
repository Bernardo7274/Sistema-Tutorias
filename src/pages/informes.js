import { useState } from 'react';
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";
import styles from '../styles/Informes.module.css'; // Importa el archivo CSS modular

export default function Informes() {
  const [activeTab, setActiveTab] = useState('registro-canalizacion');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const data = {
    'registro-canalizacion': [
      { col1: 'Carlos Alvarado', col2: 'example@upqroo.edu.mx', col3: '27BV', col4: 'E1', col5: 'A1' },
      { col1: 'Manuel Suarez', col2: 'example@upqroo.edu.mx', col3: '24AM', col4: 'E2', col5: 'A2' },
      { col1: 'Miguel Flores', col2: 'example@upqroo.edu.mx', col3: '21BM', col4: 'E3', col5: 'A3' },
    ],
    'programa-accion': [
      { col1: 'P1', col2: 'D4', col3: 'C4', col4: 'E4', col5: 'A4' },
      { col1: 'P2', col2: 'D5', col3: 'C5', col4: 'E5', col5: 'A5' },
      { col1: 'P3', col2: 'D6', col3: 'C6', col4: 'E6', col5: 'A6' },
    ],
    'registro-estudiante': [
      { col1: 'E1', col2: 'D7', col3: 'C7', col4: 'E7', col5: 'A7' },
      { col1: 'E2', col2: 'D8', col3: 'C8', col4: 'E8', col5: 'A8' },
      { col1: 'E3', col2: 'D9', col3: 'C9', col4: 'E9', col5: 'A9' },
    ],
    'registro-tutoria': [
      { col1: 'T1', col2: 'D10', col3: 'C10', col4: 'E10', col5: 'A10' },
      { col1: 'T2', col2: 'D11', col3: 'C11', col4: 'E11', col5: 'A11' },
      { col1: 'T3', col2: 'D12', col3: 'C12', col4: 'E12', col5: 'A12' },
    ]
  };

  const renderContent = () => {
    const selectedData = data[activeTab] || [];
    const filteredData = selectedData.filter(row =>
      Object.values(row).some(value => value.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div>
        <input 
          type="text" 
          placeholder="Buscar..." 
          className={styles.searchBar} 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Columna 1</th>
              <th>Columna 2</th>
              <th>Columna 3</th>
              <th>Columna 4</th>
              <th>Columna 5</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.col1}</td>
                <td>{row.col2}</td>
                <td>{row.col3}</td>
                <td>{row.col4}</td>
                <td>
                  <input 
                    type="checkbox" 
                    checked={row.col5 === 'A1' || row.col5 === 'A4'} // Puedes personalizar la lógica de cómo se marca el checkbox
                    onChange={() => {} /* Aquí puedes manejar el cambio de estado del checkbox */}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <NavbarHamburguesa />
      <main className={styles.main}>
        <h1 className={styles.headerText}>Informes</h1>
        <nav className={styles.navbar}>
          <a
            href="#"
            className={`${styles.navItem} ${activeTab === 'registro-canalizacion' ? styles.activeItem : ''}`}
            onClick={() => handleTabClick('registro-canalizacion')}
          >
            Registro de canalización
          </a>
          <a
            href="#"
            className={`${styles.navItem} ${activeTab === 'programa-accion' ? styles.activeItem : ''}`}
            onClick={() => handleTabClick('programa-accion')}
          >
            Programa acción tutoría
          </a>
          <a
            href="#"
            className={`${styles.navItem} ${activeTab === 'registro-estudiante' ? styles.activeItem : ''}`}
            onClick={() => handleTabClick('registro-estudiante')}
          >
            Registro de estudiante
          </a>
          <a
            href="#"
            className={`${styles.navItem} ${activeTab === 'registro-tutoria' ? styles.activeItem : ''}`}
            onClick={() => handleTabClick('registro-tutoria')}
          >
            Registro general de tutoría individual
          </a>
        </nav>
        <div className={styles.activeBar}></div>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
