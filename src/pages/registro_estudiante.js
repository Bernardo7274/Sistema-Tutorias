import { useEffect, useState, useRef } from "react";
import NavbarEstudiante from "@/components/Navbar_estudiante"; // Ajusta la ruta según tu estructura
import styles from "@/styles/RegistroEstudiante.module.css"; // Importa el módulo CSS

export default function RegistroEstudiante() {
  const mainRef = useRef();
  const [programasEducativos, setProgramasEducativos] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Obtener la fecha actual sin adelantar al siguiente día
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Obtener el día con 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Obtener el mes con 2 dígitos
    const year = today.getFullYear(); // Obtener el año

    const formattedDate = `${year}-${month}-${day}`; // Formato: yyyy-mm-dd
    setCurrentDate(formattedDate);

    // Fetching educational programs from the API
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/getPrograms");
        const data = await response.json();
        setProgramasEducativos(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  const handlePrint = () => {
    const inputs = mainRef.current.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (
        input.tagName === "SELECT" ||
        input.tagName === "TEXTAREA" ||
        input.tagName === "INPUT"
      ) {
        input.setAttribute("data-value", input.value);
        input.insertAdjacentHTML(
          "afterend",
          `<br/><span>${input.value}</span>`
        );
        input.style.display = "none";
      }
    });

    const originalContent = document.body.innerHTML;
    const printContent = mainRef.current.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    inputs.forEach((input) => {
      input.style.display = "";
    });

    window.location.reload(); // Restablecer la página
  };

  return (
    <div className={styles.container}>
      <NavbarEstudiante /> {/* Agregamos el navbar */}
      <main ref={mainRef} className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>PROGRAMA DE ACCIÓN TUTORIA</h1>
        </div>
        <p className={styles.instructions}>
          <strong>
            AVISO DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES <br />
            La Universidad Tecnológica Metropolitana, con en la Calle 111
            (Circuito Colonias Sur) No. 315 x 46 y 48 Col. Santa Rosa, Mérida,
            Yucatán, México. C.P. 97279, es responsable del tratamiento de los
            datos personales que nos proporcione, los cuales serán protegidos
            conforme a lo dispuesto por la Ley General de Protección de Datos
            Personales en Posesión de Sujetos Obligados, y demás normatividad
            que resulte aplicable.
          </strong>
        </p>
        <div className={styles.contactContainer}>
          <label>
            <strong>Fecha:</strong>
            <input
              type="date"
              value={currentDate}
              className={styles.input}
              readOnly
            />
          </label>
          <label>
            <strong>División:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Programa Educativo:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              {programasEducativos.map((programa) => (
                <option key={programa.ID} value={programa.Nombre}>
                  {programa.Nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DATOS PERSONALES</h1>
        </div>
        <div className={styles.contactContainer}>
          <div className={styles.fotoDiv}>Aqui va la foto tamaño infantil</div>
          <label>
            <strong>Apellido Paterno:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Apellido Materno:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Nombres:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Matrícula:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Fecha de Nacimiento:</strong>
            <input type="date" className={styles.input} />
          </label>
          <label>
            <strong>Lugar de Nacimiento:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Edad:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Sexo:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </label>
          <label>
            <strong>Estado Civil:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Casado">Casado</option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Separado/a">Separado/a</option>
            </select>
          </label>
          <label>
            <strong>Año de Ingreso a la Universidad:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Dirección:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Colonia / Fraccionamiento:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Municipio:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Estado:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Teléfono Casa:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Teléfono Celular:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Correo electrónico:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Número de hijos:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Lenguas que habla:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DATOS DE SALUD</h1>
        </div>
        <div className={styles.contactContainer}>
          <label>
            <strong>Número de seguridad social:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>En caso de accidente notificar a:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Parentesco:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Tipo Sanguíneo:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Padece alguna discapacidad?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>En caso de ser afirmativo, especifique:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Padece alguna alergia?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>En caso de ser afirmativo, especifique:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Padece alguna enfermedad crónica?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>En caso de ser afirmativo, especifique:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Requieres de algún medicamento de manera regular?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>En caso de ser afirmativo, especifique:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>
              ¿Alguna vez ha asistido a tratamiento psicológico o psiquiátrico?:
            </strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>Especifique motivo:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Fuma?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>Número de cigarrillos al día:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>¿Consumes bebidas alcohólicas?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>¿Con qué frecuencia los consumes?:</strong>
            <input type="number" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DATOS FAMILIARES</h1>
        </div>
        <div className={styles.contactContainer1}>
          <label>
            <strong>Nombre del padre:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Ocupación:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Nombre de la madre:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Ocupación:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Nombre del cónyuge o pareja:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Ocupación:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DATOS SOCIOECONÓMICOS</h1>
        </div>
        <div className={styles.contactContainer}>
          <label>
            <strong>De quien dependes económicamente:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>
              ¿De cuánto dinero dispones semanalmente para tus gastos
              escolares?:
            </strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>
              ¿Tipo de transporte que utilizas para llegar a la escuela?:
            </strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>
              ¿Cuánto tiempo inviertes en su transporte a la escuela?:
            </strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Ingreso mensual familiar:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Tipo de vivienda:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Con quién vive?:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Cuántas personas habitan en tu vivienda?:</strong>
            <input type="number" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DATOS LABORALES</h1>
        </div>
        <div className={styles.contactContainer}>
          <label>
            <strong>¿Trabajas?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>Especifica el horario de inicio laboral:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Cuántas horas laboras al día?:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>
              El trabajo desempeñado ¿tiene relación con tu carrera actual?:
            </strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>Motivo por el que trabajas:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Nombre de la empresa:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Depto. / Área:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Dirección de la empresa:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Teléfono:</strong>
            <input type="number" className={styles.input} />
          </label>
          <label>
            <strong>Principales funciones que realiza:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DATOS LABORALES</h1>
        </div>
        <div className={styles.contactContainer2}>
          <label>
            <strong>Escuela de procedencia:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>Tipo de escuela de procedencia:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Por qué medio te enteraste de la UTM?:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿La UTM fue tu primera opción?:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            <strong>Especifica cuál fue tu primera opción:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>¿Por qué elegiste la UTM?:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>HISTORIAL ACADÉMICO</h1>
        </div>
        <div className={styles.contactContainer3}>
          <label>
            <strong>PROMEDIO BACHILLERATO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>PUNTOS EXANI:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>HISTORIAL TSU</h1>
        </div>
        <div className={styles.contactContainer4}>
          <label>
            <strong>PRIMERO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>SEGUNDO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>TERCERO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>CUARTO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>QUINTO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>SEXTO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>PROMEDIO TSU:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.contactContainer4}>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>HISTORIAL CONTINUIDAD</h1>
        </div>
        <div className={styles.contactContainer5}>
          <label>
            <strong>SÉPTIMO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>OCTAVO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>NOVENO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>DÉCIMO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>ONCEAVO:</strong>
            <input type="text" className={styles.input} />
          </label>
          <label>
            <strong>PROMEDIO CONTINUIDAD:</strong>
            <input type="text" className={styles.input} />
          </label>
        </div>
        {/* ----------------------------------------------------------------------------------------------------*/}
        <div className={styles.contactContainer5}>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
          <label>
            <div className={styles.input1}></div>
            <strong>Firma del tutor</strong>
          </label>
        </div>
      </main>
      <div className={styles.main1}>
        <button className={styles.printButton} onClick={handlePrint}>
          Imprimir
        </button>
      </div>
    </div>
  );
}
