// darkTheme.js
import {DefaultTheme} from 'react-native-paper';

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive', // or 'exact' if you prefer
  colors: {
    ...DefaultTheme.colors,
    primary: '#720808',
    logo: '#fff',
    background: '#0D0D0D',
    text: '#fff',
    icon: 'white',
    tabs: '#313131',
    rightBar: '#0D0D0D',
    topbar: '#313131',
  },
};

export default darkTheme;
