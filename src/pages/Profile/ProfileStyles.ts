import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(190, 190, 190, .1);
`;

export const Container = styled.div`
  width: 50%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  & > button {
    color: white;
  }
`;

export const Images = styled.div`
  display: flex;
`;

export const Title = styled.h2`

`;

export const Photo = styled.img`
  width: 150px;
  height: 150px;
`;