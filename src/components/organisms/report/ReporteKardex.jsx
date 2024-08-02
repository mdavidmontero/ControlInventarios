import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Estilos mejorados para mantener las columnas alineadas y la información dentro de las celdas
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 10,
    marginTop: -10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "10%", // Ajusta el ancho de las columnas
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#e0e0e0",
    padding: 4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10, // Tamaño de fuente reducido para mejor ajuste
  },
  tableCol: {
    width: "10%", // Ajusta el ancho de las columnas
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    textAlign: "center",
    fontSize: 9, // Tamaño de fuente reducido para mejor ajuste
    overflow: "hidden", // Asegura que el texto no se desborde
  },
  descriptionCol: {
    width: "30%", // Mayor ancho para la descripción
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 12,
    color: "#999",
  },
});

export function ReporteKardex({ data }) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <Text style={styles.header}>Kardex de Productos</Text>
        <Text style={styles.date}>{formattedDate}</Text>

        {/* Tabla de Kardex */}
        <View style={styles.table}>
          {/* Encabezados de la tabla */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>#</Text>
            <Text style={[styles.tableColHeader, styles.descriptionCol]}>
              Descripción
            </Text>
            <Text style={styles.tableColHeader}>Cantidad</Text>
            <Text style={styles.tableColHeader}>Fecha</Text>
            <Text style={styles.tableColHeader}>Detalle</Text>
          </View>

          {/* Filas de datos */}
          {data.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCol}>{index + 1}</Text>{" "}
              {/* Columna de Conteo */}
              <Text style={[styles.tableCol, styles.descriptionCol]}>
                {item.descripcion}
              </Text>
              <Text style={styles.tableCol}>{item.cantidad}</Text>
              <Text style={styles.tableCol}>{item.fecha}</Text>
              <Text style={styles.tableCol}>{item.detalle}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Kardex generado automáticamente.</Text>
      </Page>
    </Document>
  );
}
