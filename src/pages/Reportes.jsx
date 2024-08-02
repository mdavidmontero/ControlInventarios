import { MarcaTemplate } from "../components/templates/MarcaTemplate";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/molecules/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import { useUsuarioStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/molecules/BloqueoPagina";
import { ReportesTemplate } from "../components/templates/ReportesTemplate";
import { useKardexStore } from "../store/KardexStore";
export function Reportes() {
  const { datapermisos } = useUsuarioStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Marca de productos")
  );

  const { mostrarkardex } = useKardexStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarkardex({ _id_empresa: dataempresa?.id }),
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
  return <ReportesTemplate />;
}
