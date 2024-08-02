import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useMarcaStore } from "../../../store/MarcaStore";
import { ConvertirCapitalize } from "../../../utils/Conversiones";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { Buscador } from "../Buscador";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { useProductosStore } from "../../../store/ProductosStore";
import { CardProductoSelect } from "../../molecules/CardProductoSelect";
import { useKardexStore } from "../../../store/KardexStore";
import { useUsuarioStore } from "../../../store/UsuariosStore";
export function RegistrarKardex({ onClose, dataSelect, accion, tipo }) {
  const { dataproductos, setBuscador, selectproductos, productosItemSelect } =
    useProductosStore();
  const { idusuario } = useUsuarioStore();
  const { insertarkardex } = useKardexStore();
  const { dataempresa } = useEmpresaStore();
  const [stateLisaProd, setStateListaProd] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    const p = {
      fecha: new Date(),
      tipo: tipo,
      id_usuario: idusuario,
      cantidad: parseFloat(data.cantidad),
      detalle: data.detalle,
      id_empresa: dataempresa.id,
      id_producto: productosItemSelect.id,
    };
    await insertarkardex(p);
    onClose();
  }
  useEffect(() => {
    if (accion === "Editar") {
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              Nueva {""}
              {tipo == "entrada" ? "entrada" : "salida"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div
          className="contentBuscador"
          onClick={() => setStateListaProd(!stateLisaProd)}
        >
          <div>
            <Buscador
              setBuscador={setBuscador}
              setState={() => setStateListaProd(!stateLisaProd)}
            />
          </div>
          {stateLisaProd && (
            <ListaGenerica
              scroll={"scroll"}
              bottom={"-250px"}
              data={dataproductos}
              setState={() => setStateListaProd(!stateLisaProd)}
              funcion={selectproductos}
            />
          )}
        </div>
        <CardProductoSelect
          text1={productosItemSelect.descripcion}
          text2={productosItemSelect.stock}
        />

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<v.iconocalculadora />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="number"
                  placeholder=""
                  {...register("cantidad", {
                    required: true,
                  })}
                />
                <label className="form__label">cantidad</label>
                {errors.cantidad?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconotodos />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("detalle", {
                    required: true,
                  })}
                />
                <label className="form__label">Motivo</label>
                {errors.detalle?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .contentBuscador {
    position: relative;
  }

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
