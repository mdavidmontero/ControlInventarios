import styled from "styled-components";
import { Btnsave } from "../molecules/BtnSave";
import { useAuthStore } from "../../store/AuthStore";
import { Header } from "../organisms/Header";
import { useState } from "react";
import { Title } from "../atoms/Title";
import { BannerEmpresa } from "../organisms/BannerEmpresa";
import { BannerHome } from "../organisms/BannerHome";

export function HomeTemplate() {
  return (
    <Main>
      <BannerHome />
    </Main>
  );
}
const Main = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-size: 26px;
`;
