import styled from "@emotion/styled";
import { Text } from "@geist-ui/core";
import Link from "next/link";
import React from "react";
import CustomTheme from "../config/theme";

const Navbar = styled.div`
  height: ${({ theme }) => (theme as typeof CustomTheme).navbarHeight};
  background-color: ${({ theme }) => (theme as typeof CustomTheme).blue1};
  display: flex;
  align-items: center;
  justify-content: center;
  h1: {
    color: white !important;
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar>
        <Link href="/">
          <Text h1 b style={{ color: "white" }}>
            TMDB
          </Text>
        </Link>
      </Navbar>
      {children}
    </>
  );
};

export default Layout;
