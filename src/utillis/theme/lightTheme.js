// lightTheme.js
import {DefaultTheme} from 'react-native-paper';
import {Gray300} from './appTheme';

const lightTheme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive', // or 'exact' if you prefer
  colors: {
    ...DefaultTheme.colors,
    primary: '#720808',
    logo: '#720808',
    background: '#F8F8F8',
    text: '#000',
    icon: '#313131',
    tabs: '#fff',
    rightBar: '#fff',
    eyeIcon: Gray300,
    topbar: '#f5e9cd',
  },
};

export default lightTheme;
