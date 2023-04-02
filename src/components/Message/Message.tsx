import React from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { MessageProps, StyledProps } from './interfaces';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content space-between;
  position: relative;
  width: fit-content;StyledProps
  margin: 15px;
  margin-left: ${(props: StyledProps) => props.user === props.uid ? 'auto' : '15px'};

  & > img {
    order: ${(props: StyledProps) => props.user === props.uid ? '1' : '0'};
    margin: ${(props: StyledProps) => props.user === props.uid ? ' 0 0 0 10px' : '0'};
  }
`;

const Content = styled.div`
  background-color: ${(props: StyledProps) => props.user === props.uid ? 'rgb(2, 150, 199)' : 'gray'};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  margin-right: auto;

  & > p {
    color: white;
  }

  & > small {
    color: white;
    position: absolute;
    font-size: 8px;
    right: 0;
    bottom: -10px;
  }
`;

const Message = ({id, data: {timestamp, dislayName, email, message, photo, uid} }: MessageProps) => {

  const user = useSelector(selectUser);
  const UserID: string = user.uid;

  return (
    <Wrapper uid={uid} user={UserID}>
        <img src={photo} style={{width: '60px', borderRadius: '50%', padding: '10px'}} alt='self' />
        <Content uid={uid} user={UserID}>
          <p>{message}</p>
          <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </Content>
    </Wrapper>
  )
}

export default Message