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
import { ReporteKardex } from "../organisms/report/ReporteKardex";
import { PDFViewer } from "@react-pdf/renderer";
import { useKardexStore } from "../../store/KardexStore";
import DocuPDF from "../organisms/DocuPDF";
import { RegistrarProductos } from "../organisms/forms/RegistrarProductos";
import { Btnsave } from "../molecules/BtnSave";

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
        <RegistrarProductos
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(!openRegistro)}
          accion={accion}
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
        </ContentFiltro>
      </section>
      <section className="area2">
        {/* <Btnsave bgcolor="#fff" titulo="Reporte Todos los movimientos" /> */}
        {/* <Btnsave titulo="Reporte Ingresos"/>
        <Btnsave titulo="Reporte Salidas"/> */}
        {/* <PDFDownloadLink
        document={<DocuPDF  />}
        fileName="reporte_movimientos.pdf"
      >
        <button variant="info">Descargar PDF</button>
      </PDFDownloadLink> */}
        {/* <Buscador setBuscador={setBuscador}/> */}
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
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;
const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  width: 100%;
  gap: 15px;
`;
