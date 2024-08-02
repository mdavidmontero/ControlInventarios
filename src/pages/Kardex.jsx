import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/molecules/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import { useUsuarioStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/molecules/BloqueoPagina";
import { KardexTemplate } from "../components/templates/KardexTemplate";
import { useKardexStore } from "../store/KardexStore";
import { useProductosStore } from "../store/ProductosStore";
export function Kardex() {
  const { datapermisos } = useUsuarioStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Marca de productos")
  );

  const { buscador: buscadorproductos, buscarproductos } = useProductosStore();
  const { mostrarkardex, datakardex, buscarkardex, buscador } =
    useKardexStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarkardex({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa.id != null,
  });

  const { data: buscarkardexLista } = useQuery({
    queryKey: [
      "buscar kardex",
      { _id_empresa: dataempresa.id, buscador: buscador },
    ],
    queryFn: () =>
      buscarkardex({
        _id_empresa: dataempresa.id,
        buscador: buscador,
      }),
    enabled: dataempresa.id != null,
  });

  // Buscar para lista de productos

  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar productos",
      { id_empresa: dataempresa.id, descripcion: buscadorproductos },
    ],
    queryFn: () =>
      buscarproductos({
        _id_empresa: dataempresa.id,
        buscador: buscadorproductos,
      }),
    enabled: dataempresa.id != null,
  });

  if (statePermiso == false) {
    return <BloqueoPagina />;
  }
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    console.log(error);
    return <span>Error...</span>;
  }
  return <KardexTemplate data={datakardex} />;
}
