import styled from "styled-components";
import { Header } from "../organisms/Header";
import { useMarcaStore } from "../../store/MarcaStore";
import { useState } from "react";
import { ContentFiltro } from "../atoms/ContentFiltro";
import { Title } from "../atoms/Title";
import { Btnfiltro } from "../molecules/Btnfiltro";
import { v } from "../../styles/variables";
import { Buscador } from "../organisms/Buscador";
import { TablaMarca } from "../organisms/tablas/TablaMarca";
import { RegistrarMarca } from "../organisms/forms/RegistrarMarca";
import { ReporteKardex } from "../organisms/report/ReporteKardex";
import { PDFViewer } from "@react-pdf/renderer";
import { useKardexStore } from "../../store/KardexStore";
import DocuPDF from "../organisms/DocuPDF";

export function ReportesTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const { datakardex } = useKardexStore();
  const nuevoRegistro = () => {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };
  const { setBuscador } = useMarcaStore();
  return (
    <Container>
      {openRegistro && (
        <RegistrarMarca
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => SetopenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Reportes</Title>
          <Btnfiltro
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <DocuPDF data={datakardex} />
        </PDFViewer>
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
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
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
