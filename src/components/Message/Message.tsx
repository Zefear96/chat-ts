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
  padding: 5px;
  border-radius: 10px;
  margin: 10px;
  margin-right: auto;

  & > p {
    color: white;
  }

  & > small {
    color: black;
    font-size: 8px;
  }
`;

const Message = ({id, data: {timestamp, dislayName, email, message, photo, uid} }: MessageProps) => {

  const user = useSelector(selectUser);
  const UserID: string = user.uid;

  return (
    <Wrapper uid={uid} user={UserID}>
        <img src={photo ? photo : img} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} alt={`${dislayName}`} />
        <Content uid={uid} user={UserID}>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
          <p>{message}</p>
        </Content>
    </Wrapper>
  )
}

export default Message

const img =
	"https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg";
