import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = (rolesPermitidos) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Uso directo de useState

  useEffect(() => {
    // Asegúrate de que el código solo se ejecute en el cliente (navegador)
    setIsClient(true);
  }, []);

  // Solo intenta acceder a localStorage si estamos en el cliente
  useEffect(() => {
    if (isClient) {
      const rol = localStorage.getItem("rol");

      if (!rol) {
        // Si no hay rol, redirige al login
        router.push("/");
        return;
      }

      if (!rolesPermitidos.includes(rol)) {
        // Si el rol no está permitido en esta página, redirige
        router.push("/404"); // O redirige a la página de acceso denegado si lo prefieres
      }
    }
  }, [isClient, rolesPermitidos, router]);

  return isClient; // Devuelves el estado de si estamos en el cliente
};

export default useAuth;
