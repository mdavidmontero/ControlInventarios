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
import { Productos } from "../pages/Productos";
import { Usuarios } from "../pages/Usuarios";
import { Kardex } from "../pages/Kardex";
import { Reportes } from "../pages/Reportes";
import { Empresa } from "../pages/Empresa";

export const MyRoutes = () => {
  const { user } = UserAuth();
  const { mostrarUsuarios, idusuario, mostrarpermisos } = useUsuarioStore();
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
  const { data: datapermisos } = useQuery({
    queryKey: ["mostrar permisos", { id_usuario: idusuario }],
    queryFn: () => mostrarpermisos({ id_usuario: idusuario }),
    enabled: !!datausuarios,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <ErrorMolecula mensaje={error.message} />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/configurar/empresa" element={<Empresa />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/configurar/productos" element={<Productos />} />
        <Route path="/configurar/personal" element={<Usuarios />} />
        <Route path="/kardex" element={<Kardex />} />
        <Route path="/reportes" element={<Reportes />} />
      </Route>
    </Routes>
  );
};
