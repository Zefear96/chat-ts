import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: .25;
  height: 92vh;
  flex-direction: column;
  border-right: 1px solid rgba(190, 190, 190, .1);
  border-top: 1px solid rgba(190, 190, 190, .1);
`;

export const Header = styled.div`
    display: flex;
    height: 50px;
    padding: 10px;
    align-items: center;

    & > button {
        color: white;

        &:hover {
            color: rgba(2, 150, 199, 1)
        }
    }
`;

export const Threads = styled.div`
    overflow: scroll;
    flex: 1;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 10px 20px;
    border-top: 1px solid rgba(190, 190, 190, .1);

    & > button {
        color: white;

        &:hover {
            color: rgba(2, 150, 199, 1)
        }
    }
`;