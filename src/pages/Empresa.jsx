import { useEmpresaStore } from "../store/EmpresaStore";

import { EmpresaTemplate } from "../components/templates/EmpresaTemplate";
import { useQuery } from "@tanstack/react-query";
import { useUsuarioStore } from "../store/UsuariosStore";
import { BloqueoPagina } from "../components/molecules/BloqueoPagina";

export function Empresa() {
  const { datapermisos } = useUsuarioStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Tu empresa")
  );
  if (statePermiso == false) {
    return <BloqueoPagina state={statePermiso} />;
  }
  const { contarusuariosXempresa, dataempresa } = useEmpresaStore();
  //llamar a consultar usuarios por empresa

  const { data: contadorusurios } = useQuery({
    queryKey: ["contador de usuarios", dataempresa.id],
    queryFn: () => contarusuariosXempresa({ id_empresa: dataempresa.id }),
    enabled: dataempresa?.id != null,
  });
  return (
    <>
      <EmpresaTemplate />
    </>
  );
}
