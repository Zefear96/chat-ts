import styled from 'styled-components';

export const Wrapper = styled.div`
  // height: 100vh;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 0 auto;
  padding-bottom: 20px;
  height: 8vh;

  & > a {
    position: relative;
    padding-bottom: 20px;
  }

  & > a::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100%;
    height: 0;
    background-color: rgba(2, 150, 199, .7);
    z-index: 1000;
  }

  & > a > button {
    color: white;
  }

  & > a.active {
    & > button {
      color: rgba(2, 150, 199, .7);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: rgba(2, 150, 199, .7);
      z-index: 100;
    }
  }
`;