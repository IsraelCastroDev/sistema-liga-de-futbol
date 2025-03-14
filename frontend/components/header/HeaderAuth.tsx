"use client";

import { useAppStore } from "@/store/appStore";

export default function HeaderAuth() {
  const showModal = useAppStore((store) => store.showModal);

  const handleShowModal = (value: boolean) => {
    showModal(value);
  };

  return (
    <div>
      <button
        onClick={() => handleShowModal(true)}
        className="bg-white px-3 py-2 text-black font-semibold"
      >
        Iniciar sesión
      </button>

      <button className="bg-sky-600 text-white font-semibold px-3 py-2 ml-3">
        Regístrate
      </button>
    </div>
  );
}
