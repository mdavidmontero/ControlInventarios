import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { UserAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/SpinnerLoader";
import { ErrorMolecula } from "../components/molecules/ErrorMolecula";
import { useUsuarioStore } from "../store/UsuariosStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { Configuracion } from "../pages/Configuracion";
import { Marca } from "../pages/Marca";
import { Categorias } from "../pages/Categorias";

export const MyRoutes = () => {
  const { user } = UserAuth();
  const { mostrarUsuarios, idusuario } = useUsuarioStore();
  const { mostrarEmpresa } = useEmpresaStore();

  const {
    data: datausuarios,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: mostrarUsuarios,
  });
  const { data: dataempresa } = useQuery({
    queryKey: ["mostrar empresa"],
    queryFn: () => mostrarEmpresa({ idusaurio: idusuario }),
    enabled: !!datausuarios,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <ErrorMolecula />;
  }
  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/configurar" element={<Configuracion />} />
      <Route path="/configurar/marca" element={<Marca />} />
      <Route path="/configurar/categorias" element={<Categorias />} />
    </Routes>
  );
};
