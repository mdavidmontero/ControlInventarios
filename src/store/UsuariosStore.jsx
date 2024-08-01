import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { InsertarUsuarios, MostrarUsuarios } from "../supabase/crudUsuarios";

export const useUsuarioStore = create((set, get) => ({
  insertarUsuarioAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    if (error) return;
    const datauser = await InsertarUsuarios({
      idauth: data.user.id,
      fecharegistro: new Date(),
      tipouser: "admin",
    });
    return datauser;
  },
  idusuario: 0,
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();

    set({ idusuario: response.id });
    return response;
  },
}));
