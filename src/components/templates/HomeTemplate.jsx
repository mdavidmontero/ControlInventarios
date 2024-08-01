import styled from "styled-components";
import { Btnsave } from "../molecules/BtnSave";
import { useAuthStore } from "../../store/AuthStore";

export function HomeTemplate() {
  const { signOut } = useAuthStore();
  return (
    <Container>
      <Btnsave titulo={"Cerrar Sesión"} bgcolor={"#FFF"} funcion={signOut} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
