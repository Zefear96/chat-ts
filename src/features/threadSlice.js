import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: null,
  threadName: null,
  threadImg: null,
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
    }
  },
});

export const { setThread } = threadSlice.actions;

export const selectThreadId = (state) => state.thread.threadId;
export const selectThreadName = (state) => state.thread.threadName;
export const selectThreadImg = (state) => state.thread.threadImg;

export default threadSlice.reducer;
