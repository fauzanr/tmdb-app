import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 0.5px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 1px #00000040;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin: auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

export const Container = styled.div`
  padding: 1rem;
  margin: auto;
  max-width: 1500px;
  text-align: ${({ center }) => (center ? "center" : "left")};
`;
