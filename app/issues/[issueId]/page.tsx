"use client";
import { useUser } from "@clerk/nextjs";

export default function Issue() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div>Cargando información del usuario...</div>;
  }

  if (user) {
    return (
      <div className="mt-2 grid place-content-center">
        Hello World, tu ID de usuario es: {user.id}
      </div>
    );
  }

  return <div className="mt-2 grid place-content-center">No hay usuario autenticado.</div>;
}