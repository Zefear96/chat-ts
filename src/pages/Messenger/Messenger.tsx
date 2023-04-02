import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Thread from '../../components/Thread';
import { Wrapper } from './MessengerStyles';

const Messenger = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Thread />
    </Wrapper>
  )
}

export default Messenger;