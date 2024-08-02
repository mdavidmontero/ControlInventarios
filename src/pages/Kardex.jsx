import { MarcaTemplate } from "../components/templates/MarcaTemplate";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/molecules/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import { useUsuarioStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/molecules/BloqueoPagina";
import { KardexTemplate } from "../components/templates/KardexTemplate";
export function Kardex() {
  const { datapermisos } = useUsuarioStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Marca de productos")
  );

  const { mostrarMarca, datamarca, buscarMarca, buscador } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });

  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar marca",
      { id_empresa: dataempresa.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarMarca({ id_empresa: dataempresa.id, descripcion: buscador }),
    enabled: dataempresa.id != null,
  });
  if (statePermiso == false) {
    return <BloqueoPagina />;
  }
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return <KardexTemplate data={datamarca} />;
}
