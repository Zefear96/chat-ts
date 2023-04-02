import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  width: 100%;
  color: white;
`;

export const LoginTg = styled.div`

  display: flex;
  align-items: center;
  & > div {
    margin-right: 20px;
  }
  & > div > img {
    object-fit: contain;
    height: 150px;
  }

  
`;

export const Buttons = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;

  & > button {
    width: 300px;
    margin-bottom: 15px;
    border: 1px solid rgb(2, 150, 199);
  }

  & > button > svg {
    margin-left: 5px;
    font-size: 20px;
  }

  & > button:nth-child(2) {
    width: 300px;
    color: white;
    background-color: rgb(2, 150, 199);
    
    &:hover {
      color: rgb(2, 150, 199);
      background-color: white;
    }
  }

  & > button:nth-child(3) {
    width: 300px;
    color: white;
    background-color: rgb(2, 150, 199);
    margin-bottom: 0;
    
    &:hover {
      color: rgb(2, 150, 199);
      background-color: white;
    }
  }
`;