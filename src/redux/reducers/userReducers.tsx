import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  user: null,
  isFirstTime: null,
  isFacebook: false,
  isGoogle: false,
  isLogin: null,
  popularMoviesData: [],
  hindiMoviesData: [],
  punjabiMoviesData: [],
  upcommingMoviesData: [],
  dramaData: [],
  sliderData: [],
  cartoonData: [],
  animated1Data: [],
  animated2Data: [],
  dramaSlider: [],
  animatedSlider: [],
  playlist: [],
  indianDrama: [],
  turkishDrama: [],
  hollywoodseasons: [],
  hollywood: [],
  hindiSeasons: [],
  south: [],
  allMovies: [],
  recentSearches: [],
  myTheme: 'lightTheme',
  loading: true,
  isGuest: false,
  trendAnimSeason: [],
  popularAnimSeason: [],
  newAnimSeason: [],
};

export const userReducer: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsFirstTime: (state, action) => {
      state.isFirstTime = action.payload;
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
    setHollywoodseasons: (state, action) => {
      state.hollywoodseasons = action.payload;
    },
    setHollywood: (state, action) => {
      state.hollywood = action.payload;
    },
    setHindiSeasons: (state, action) => {
      state.hindiSeasons = action.payload;
    },
    setAllMoviesData: (state, action) => {
      state.allMovies = action.payload;
    },
    setSouthMoviesData: (state, action) => {
      state.south = action.payload;
    },
    setRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    setTheme: (state, action) => {
      state.myTheme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGuest: (state, action) => {
      state.isGuest = action.payload;
    },
    setTrendAnimSeason: (state, action) => {
      state.trendAnimSeason = action.payload;
    },
    setPopularAnimSeason: (state, action) => {
      state.popularAnimSeason = action.payload;
    },
    setNewAnimSeason: (state, action) => {
      state.newAnimSeason = action.payload;
    },
    setIsGoogle: (state, action) => {
      state.isGoogle = action.payload;
    },
    setIsFacebook: (state, action) => {
      state.isFacebook = action.payload;
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
  setHollywoodseasons,
  setHollywood,
  setHindiSeasons,
  setAllMoviesData,
  setSouthMoviesData,
  setRecentSearches,
  setTheme,
  setLoading,
  setGuest,
  setNewAnimSeason,
  setPopularAnimSeason,
  setTrendAnimSeason,
  setIsFirstTime,
  setIsGoogle,
  setIsFacebook,
} = userReducer.actions;

export default userReducer.reducer;
