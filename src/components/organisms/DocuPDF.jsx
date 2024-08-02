import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Registrar la fuente "Inconsolata"
Font.register({
  family: "Inconsolata",
  src: "http://fonts.gstatic.com/s/inconsolata/v15/7bMKuoy6Nh0ft0SHnIGMuaCWcynf_cDxXwCLxiixG1c.ttf",
});

const DocuPDF = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#f9f9f9",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundColor: "#ffffff",
      borderRadius: 5,
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      fontFamily: "Inconsolata",
      textAlign: "center",
      color: "#333",
    },
    date: {
      fontSize: 12,
      fontFamily: "Inconsolata",
      textAlign: "right",
      color: "#666",
      marginBottom: 15,
    },
    table: {
      width: "100%",
      margin: "auto",
      marginTop: 20,
    },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#ddd",
      height: 28,
      alignItems: "center",
    },
    cell: {
      flex: 1,
      padding: 5,
      textAlign: "left",
      fontFamily: "Inconsolata",
      fontSize: 10,
      color: "#333",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
      padding: 5,
      fontFamily: "Inconsolata",
      textAlign: "left",
      fontSize: 11,
      color: "#333",
    },
    footer: {
      fontSize: 10,
      fontFamily: "Inconsolata",
      textAlign: "center",
      color: "#aaa",
      marginTop: 20,
    },
  });

  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id || rowData.fecha}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.fecha}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.detalle}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.cantidad}
      </Text>
    </View>
  );

  const renderPage = (pageNumber, pageCount) => (
    <Text style={{ position: "absolute", bottom: 20, right: 40, fontSize: 10 }}>
      Página {pageNumber} de {pageCount}
    </Text>
  );

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <Document title="Reporte de movimientos">
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Movimientos de Kardex</Text>
          <Text style={styles.date}>
            Fecha y Hora de Impresión: {formattedDate}
          </Text>
          <View style={styles.table}>
            {renderTableRow(
              {
                fecha: "Fecha",
                descripcion: "Producto",
                detalle: "Movimiento",
                cantidad: "Cantidad",
              },
              true
            )}
            {data?.map((movement) => renderTableRow(movement))}
          </View>
        </View>
        {renderPage}
      </Page>
    </Document>
  );
};

export default DocuPDF;
