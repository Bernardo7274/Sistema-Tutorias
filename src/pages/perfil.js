import NavbarEstudiante from "@/components/Navbar_estudiante"; // Ajusta la ruta según tu estructura
import styles from "@/styles/Perfil.module.css"; // Importar estilos modulares

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <NavbarEstudiante />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Perfil de usuario</h1>
          <form className={styles.form}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre completo:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={styles.input}
              placeholder="Ingresa tu nombre completo"
            />
            <label htmlFor="correo" className={styles.label}>
              Correo electrónico:
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              className={styles.input}
              placeholder="Ingresa tu correo electrónico"
            />
            <label htmlFor="contrasena" className={styles.label}>
              Contraseña:
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              className={styles.input}
              placeholder="Ingresa tu contraseña"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
