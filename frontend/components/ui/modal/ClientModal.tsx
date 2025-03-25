"use client";

import { useActionState } from "react";
import Modal from "./Modal";
import { useAppStore } from "@/store/appStore";
import { signInAction } from "@/actions/auth";

type InitialState = {
  error?: string;
  message?: string;
  access_token?: string;
  values: {
    email: string;
    password: string;
  };
};

const initialState: InitialState = {
  error: undefined,
  message: undefined,
  access_token: undefined,
  values: { email: "", password: "" },
};

export default function ClientModal() {
  const modal = useAppStore((store) => store.modal);
  const closeModal = useAppStore((store) => store.closeModal);

  const [state, formAction] = useActionState(signInAction, initialState);

  const handleOnClose = () => {
    closeModal();

    state.error = undefined;
    state.values = { email: "", password: "" };
  };

  return modal ? (
    <Modal isOpen={modal} onClose={handleOnClose} title="Inicia sesión">
      <form action={formAction} className="flex flex-col space-y-7 w-full">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Ingresa tu correo electrónico"
          className="py-3 border-b border-black outline-none"
          defaultValue={state.values?.email || ""}
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="Ingresa tu contraseña"
          className="py-3 border-b border-black outline-none"
          defaultValue={state.values?.password || ""}
        />
        {state?.error && (
          <p className="text-red-500 font-semibold text-sm">{state.error}</p>
        )}
        <input
          type="submit"
          value="Ingresar"
          className="w-full py-3 bg-sky-500 text-white font-semibold cursor-pointer"
        />
      </form>
    </Modal>
  ) : null;
}
