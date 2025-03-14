"use client";

import { useAppStore } from "@/store/appStore";
import Modal from "./Modal";

export default function ClientModal() {
  const modal = useAppStore((store) => store.modal);
  const closeModal = useAppStore((store) => store.closeModal);

  return modal ? (
    <Modal isOpen={modal} onClose={closeModal} title="Inicia sesión">
      <form className="flex flex-col space-y-7 w-full">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Ingresa tu correo electrónico"
          className="py-3 border-b border-black  outline-none"
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="Ingresa tu contraseña"
          className="py-3 border-b border-black outline-none"
        />
        <input
          type="submit"
          value="Ingresar"
          className="w-full py-3 bg-sky-500 text-white font-semibold cursor-pointer"
        />
      </form>
    </Modal>
  ) : null;
}
