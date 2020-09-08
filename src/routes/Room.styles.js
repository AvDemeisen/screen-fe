import styled from "styled-components";



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin: auto;
  background-color: #fcd5E8;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 5px;
`;


export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  grid-gap: 5px;

  @media (min-width: 812px) {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StyledVideo = styled.video`
  height: auto;
  width: 70%;
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
`;
