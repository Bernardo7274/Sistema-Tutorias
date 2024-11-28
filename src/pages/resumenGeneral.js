// pages/ResumenGeneral.js
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";
import styles from "../styles/ResumenGeneral.module.css"; // Importar CSS
import { FaUserGraduate, FaUsers, FaSignInAlt } from "react-icons/fa"; // Íconos

export default function ResumenGeneral() {
  const cardsData = [
    {
      id: 1,
      image: "/asignatura.png",
      name: "Carlos Alvarado",
      program: "Programación",
      group: "Grupo 21-B",
      students: 35,
      link: "/detalles/1",
    },
    {
      id: 2,
      image: "/asignatura.png",
      name: "Ana Martínez",
      program: "Matemáticas",
      group: "Grupo 32-A",
      students: 28,
      link: "/detalles/2",
    },
    {
      id: 3,
      image: "/asignatura.png",
      name: "Luis Torres",
      program: "Historia",
      group: "Grupo 12-C",
      students: 30,
      link: "/detalles/3",
    },
  ];

  return (
    <div className={styles.container}>
      <Navbar />
      <NavbarHamburguesa />
      <main className={styles.main}>
        <h1 className={styles.title}>Resumen General</h1>
        <div className={styles.cardGrid}>
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={styles.card}
              onClick={() => (window.location.href = card.link)}
            >
              <img
                src={card.image}
                alt={card.name}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <p className={styles.teacherName}>
                  <FaUserGraduate className={styles.icon} /> Maestro:{" "}
                  {card.name}
                </p>
                <p className={styles.cardText}>{card.program}</p>
                <p className={styles.cardText}>
                  <FaUsers className={styles.icon} /> {card.students}
                </p>
                <p className={styles.cardText}>{card.group}</p>
                <button className={styles.enterButton}>
                  <FaSignInAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
