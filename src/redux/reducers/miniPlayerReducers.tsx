// Import createSlice from @reduxjs/toolkit
import {createSlice} from '@reduxjs/toolkit';

// Define the initial mini player state
const initialMiniPlayerState: any = {
  isPlaying: false, // Whether the mini player is playing
  videoUrl: null, // The URL of the video being played
};

// Create a Redux slice for mini player state
export const miniPlayerReducer: any = createSlice({
  name: 'miniPlayer',
  initialState: initialMiniPlayerState, // Use the initial mini player state
  reducers: {
    setMiniPlayerState: (state, action) => {
      // Update the mini player state based on the action payload
      state.isPlaying = action.payload.isPlaying;
      state.videoUrl = action.payload.videoUrl;
    },
    // Add more actions as needed
  },
});

// Export actions and reducer from the mini player slice
export const {
  setMiniPlayerState,
  // Add more actions as needed
} = miniPlayerReducer.actions;
export default miniPlayerReducer.reducer;
