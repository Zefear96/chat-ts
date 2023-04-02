import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Avatar, IconButton } from '@mui/material';
import { MicNoneOutlined, MoreHoriz, SendRounded, TimerOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectThreadId, selectThreadName, selectThreadImg } from '../features/threadSlice';
import { onSnapshot, collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import db from '../firebase';
import Message from './Message/Message';

const Wrapper = styled.div`
    display: flex;
    flex: .75;
    flex-direction: column;
    height: 92vh;
    border-top: 1px solid rgba(190, 190, 190, .1);

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Header = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(190, 190, 190, .1);
    align-items: center;
    align-content: center;
    justify-content: space-between;

    & > button > svg {
        color: white;

        &:hover {
            color: rgba(2, 150, 199, 1)
        }
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    color: white;
    padding: 10px;
`;

const Info = styled.div`
    & > h5 {
        fotn-weight: 500;
        color: gray;
    }
`;

const Messages = styled.div`
    overflow: scroll;
    flex: 1;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ThreadInput = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: transparent;
    border-top: 1px solid rgba(190, 190, 190, .1);

    & > form {
        display: flex;
        flex: 1;
        flex-direction: row;
    }

    & > form > button {
        & > svg {
            color: white;
        }

        &:hover svg {
            color: rgb(2, 150, 199);
        }
    }
`;

const InputMessage = styled.input`
    width: 98%;
    outline-width: 0 !important;
    outline: none;
    border: none;
    border-radius: 0 !important;
    background-color: transparent;
    padding: 5px;
    color: white;
`;

const Thread = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const threadImg = useSelector(selectThreadImg);
  const user = useSelector(selectUser);

  useEffect(() => {
      if(threadId){
          onSnapshot(query(collection(db, 'threads', threadId, 'messages'), orderBy('timestamp')), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
          });
      }
  }, [threadId])

  const sendMessage = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, 'threads', threadId, 'messages'), {
        timestamp: serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
    });
    //firebace
    setInput('');
  };

  return (
    <Wrapper>
        <Header>
            <Content>
                <Avatar src={threadImg}/>
                <Info>
                    <h4>{threadName}</h4>
                    <h5>Last Seen</h5>
                </Info>
            </Content>
            <IconButton>
                <MoreHoriz />
            </IconButton>
        </Header>
        <Messages>
            {messages.map(({id, data}) => 
                <Message key={id} data={data} />                
            )}
        </Messages>
        <ThreadInput>
            <form>
                <InputMessage placeholder='Write a message...' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                <IconButton>
                    <TimerOutlined />
                </IconButton>
                <IconButton onClick={sendMessage}>
                    <SendRounded />
                </IconButton>
                <IconButton>
                    <MicNoneOutlined />
                </IconButton>
            </form>
        </ThreadInput>
    </Wrapper>
  )
}

export default Thread