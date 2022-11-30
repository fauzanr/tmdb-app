import styled from "@emotion/styled";
import { Text } from "@geist-ui/core";
import Link from "next/link";
import React from "react";

const Navbar = styled.div`
  height: ${({ theme }) => theme.navbarHeight};
  background-color: ${({ theme }) => theme.blue1};
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
