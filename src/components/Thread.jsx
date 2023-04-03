import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Avatar, IconButton } from '@mui/material';
import {  SendRounded, } from '@mui/icons-material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectThreadId, selectThreadName, selectThreadImg, selectThreadOwner, updateThread } from '../features/threadSlice';
import { onSnapshot, collection, addDoc, serverTimestamp, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
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
    background-color: #1976d2;
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
            color: red;
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
const user = useSelector(selectUser);
const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const threadImg = useSelector(selectThreadImg);
  const threadOwner = useSelector(selectThreadOwner);

  useEffect(() => {
      if(threadId){
          onSnapshot(query(collection(db, 'threads', threadId, 'messages'), orderBy('timestamp')), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
          });
      }
      console.log(user);
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      sendMessage(event)
    }
  };

  const editThread = async () => {
    // console.log(threadId);
    const editedThreadName = prompt('Enter another room name');
    const threadDocRef = doc(db, "threads", threadId);
      if (editedThreadName) {
        await updateDoc(threadDocRef, {
                threadName: editedThreadName
        })}
    else {
      console.log("Thread does not exist!");
    }

    dispatch(
        updateThread({
            threadId: threadId,
            threadName: editedThreadName,
            threadImg: user.photo,
            threadOwner: user.displayName
        })
    )
  }

  const deleteThread = async () => {
    const sure = window.confirm ('Are you sure? It will be deleted with all messages history!');
    if (sure) {
        const threadDocRef = doc(db, "threads", threadId);
        await deleteDoc(threadDocRef);
    } else {
        return
    }
    dispatch(
        updateThread({
            threadId: null,
            threadName: null,
            threadImg: null,
            threadOwner: null
        })
    )
  }

    // MUI
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

  return (
    <Wrapper >
        {threadId ? (       
        <>
        <Header>
            <Content>
                <Avatar src={threadImg}/>
                <Info>
                    <h4>{threadName}</h4>
                    <h5>Last Seen</h5>
                </Info>
            </Content>
            <div
        style={{
          marginBottom: "0",
          paddingBottom: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center ",
          alignItems: "end ",
        }}
      >
        <IconButton aria-label="settings" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        {threadOwner == user?.displayName ? ( 
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ "& .MuiPaper-root": {
            backgroundColor: "#4193FF"
          }}}
        >
          <MenuItem onClick={() => editThread()} >
            Edit <SettingsSuggestIcon fontSize="small" color="warning !important" sx={{marginLeft: '5px'}}/>
          </MenuItem>
          <MenuItem onClick={() => deleteThread()}>
            Delete <DeleteIcon fontSize="small" color="error !important" sx={{marginLeft: '5px'}}/>
          </MenuItem>
        </Menu>) : ('')}
       
      </div>
        </Header>
        <Messages>
            {messages.map(({id, data}) => 
                <Message key={id} data={data} />                
            )}
        </Messages>
        <ThreadInput>
            <form>
                <InputMessage placeholder='Write a message...' type='text' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}/>
                <IconButton onClick={sendMessage}>
                    <SendRounded />
                </IconButton>
            </form>
        </ThreadInput>
        </>) : (
            <h1 style={{textAlign: 'center'}}>Create a chat room or enter to one from the list</h1>
        )}
    </Wrapper>
  )
}

export default Thread
