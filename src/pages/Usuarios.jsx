import { MarcaTemplate } from "../components/templates/MarcaTemplate";
import { useMarcaStore } from "../store/MarcaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/molecules/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";
import { UsuariosTemplate } from "../components/templates/UsuariosTemplate";
import { useUsuarioStore } from "../store/UsuariosStore";
export function Usuarios() {
  const {
    mostrarusuariosTodos,
    datausuarios,
    mostrarModulos,
    buscarusuarios,
    buscador,
  } = useUsuarioStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarusuariosTodos({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });

  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar usuarios",
      { _id_empresa: dataempresa.id, buscador: buscador },
    ],
    queryFn: () =>
      buscarusuarios({ _id_empresa: dataempresa.id, buscador: buscador }),
    enabled: dataempresa.id != null,
  });

  const { data: datamodulos } = useQuery({
    queryKey: ["mostrar modulos"],
    queryFn: mostrarModulos,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return <UsuariosTemplate data={datausuarios} />;
}
