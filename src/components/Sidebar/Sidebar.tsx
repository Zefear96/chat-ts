import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Wrapper, Header, Threads, Footer } from './SidebarStyles';
import { BorderColorOutlined, PhoneOutlined, QuestionAnswerOutlined, SettingsOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import SidebarThread from '../SidebarThread';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import Search from '../Search/Search';
import { SidebarThreads } from './interfaces';

const Sidebar = () => {

  const user = useSelector(selectUser);
  const [threads, setThreads] = useState<Array<object>>([]);
  const [srcThreadName, setSrcThreadName] = useState<string>('');

  useEffect(() => {
    onSnapshot(collection(db, "threads"), (snapshot) => setThreads(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
    }))));
  }, []);

  const addThread = async () => {
      const threadName = prompt('Enter a thread name.');
      if(threadName){
        await addDoc(collection(db, "threads"), {
            threadName: threadName,
            img: user.photo,
        });
      }
  }

  return (
    <Wrapper>
        <Header>
            <Search value={srcThreadName} setValue={setSrcThreadName}/>
            <IconButton onClick={addThread} >
                <BorderColorOutlined />
            </IconButton>
        </Header>
        <Threads>
            {threads.map(({ id, data: { threadName, img } }: SidebarThreads): JSX.Element => 
                <SidebarThread key={id} id={id} threadName={threadName} img={img} />
            )}
        </Threads>
        <Footer>
            <Avatar src={user.photo} />
            <IconButton>
                <PhoneOutlined />
            </IconButton>
            <IconButton>
                <QuestionAnswerOutlined />
            </IconButton>
            <IconButton>
                <SettingsOutlined />
            </IconButton>
        </Footer>
    </Wrapper>
  )
}

export default Sidebar