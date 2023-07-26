import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  user: null,
  isLogin: false,
  popularMoviesData: null,
  hindiMoviesData: null,
  punjabiMoviesData: null,
  upcommingMoviesData: null,
  dramaData: null,
  sliderData: [],
  cartoonData: null,
  animated1Data: null,
  animated2Data: null,
  dramaSlider: [],
  animatedSlider: [],
  playlist: [],
  indianDrama: null,
  turkishDrama: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setMoviesData: (state, action) => {
      state.popularMoviesData = action.payload;
    },
    setHindiMoviesData: (state, action) => {
      state.hindiMoviesData = action.payload;
    },
    setPunjabiMoviesData: (state, action) => {
      state.punjabiMoviesData = action.payload;
    },
    setUpcommingMoviesData: (state, action) => {
      state.upcommingMoviesData = action.payload;
    },
    setDramaData: (state, action) => {
      state.dramaData = action.payload;
    },
    setSliderData: (state, action) => {
      state.sliderData = action.payload;
    },
    setCartoonData: (state, action) => {
      state.cartoonData = action.payload;
    },
    setAnimatedData: (state, action) => {
      state.animated1Data = action.payload;
    },
    setAnimated2Data: (state, action) => {
      state.animated2Data = action.payload;
    },
    setDramaSlider: (state, action) => {
      state.dramaSlider = action.payload;
    },
    setAnimatedSlider: (state, action) => {
      state.animatedSlider = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setTurkishDrama: (state, action) => {
      state.turkishDrama = action.payload;
    },
    setIndianDrama: (state, action) => {
      state.indianDrama = action.payload;
    },
  },
});

export const {
  setUser,
  setIsLogin,
  setMoviesData,
  setHindiMoviesData,
  setPunjabiMoviesData,
  setUpcommingMoviesData,
  setDramaData,
  setSliderData,
  setCartoonData,
  setAnimatedData,
  setAnimated2Data,
  setDramaSlider,
  setAnimatedSlider,
  setPlaylist,
  setIndianDrama,
  setTurkishDrama,
} = userReducer.actions;

export default userReducer.reducer;
