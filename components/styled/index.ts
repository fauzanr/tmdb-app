import styled from "@emotion/styled";
import CustomTheme from "../../config/theme";

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
  @media (min-width: ${({ theme }) =>
      (theme as typeof CustomTheme).breakpoints.xs}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

export const Container = styled.div`
  padding: 1rem;
  margin: auto;
  max-width: 1500px;
  &[data-center]: {
    text-align: center;
  }
`;

export const PosterCover = styled.div`
  flex: auto;
  width: 100%;
  background: #ababab;
  position: relative;
  aspect-ratio: 6 / 9;
`;
