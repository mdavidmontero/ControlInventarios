import styled from "styled-components";
import { Header } from "../organisms/Header";
import { useMarcaStore } from "../../store/MarcaStore";
import { useState } from "react";
import { Title } from "../atoms/Title";
import { Btnfiltro } from "../molecules/Btnfiltro";
import { v } from "../../styles/variables";
import { Buscador } from "../organisms/Buscador";
import { TablaMarca } from "../organisms/tablas/TablaMarca";
import { RegistrarMarca } from "../organisms/forms/RegistrarMarca";
import { Btnsave } from "../molecules/BtnSave";
import { Tabs } from "../organisms/Tabs";
import { RegistrarKardex } from "../organisms/forms/RegistrarKardex";
import { useKardexStore } from "../../store/KardexStore";

export function KardexTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const [tipo, setTipo] = useState("");
  const nuevaEntrada = () => {
    SetopenRegistro(true);
    setTipo("entrada");
  };
  const nuevaSalida = () => {
    SetopenRegistro(true);
    setTipo("salida");
  };
  const { setBuscador } = useKardexStore();
  return (
    <Container>
      {openRegistro && (
        <RegistrarKardex
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => SetopenRegistro(!openRegistro)}
          tipo={tipo}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Kardex</Title>
          <Btnsave
            bgcolor={"#52de65"}
            titulo={"+ Entrada"}
            funcion={nuevaEntrada}
          />
          <Btnsave
            bgcolor={"#fb6661"}
            titulo={"- Salidas"}
            funcion={nuevaSalida}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <Tabs data={data} />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 60px
    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .main {
    margin-top: 20px;
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  width: 100%;
  gap: 15px;
`;
