import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: null,
  threadName: null,
  threadImg: null,
  threadOwner: null,
};

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setThread: (state, action) => {
      state.threadId = action.payload.threadId;
      state.threadName = action.payload.threadName;
      state.threadImg = action.payload.threadImg;
      state.threadOwner = action.payload.threadOwner;
    },
    updateThread: (state, action) => {
      state.threadId = action.payload.threadId;
      state.threadName = action.payload.threadName;
      state.threadImg = action.payload.threadImg;
      state.threadOwner = action.payload.threadOwner;
    }
  },
});

export const { setThread, updateThread } = threadSlice.actions;

export const selectThreadId = (state) => state.thread.threadId;
export const selectThreadName = (state) => state.thread.threadName;
export const selectThreadImg = (state) => state.thread.threadImg;
export const selectThreadOwner = (state) => state.thread.threadOwner;

export default threadSlice.reducer;
