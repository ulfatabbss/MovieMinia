// lightTheme.js
import { DefaultTheme } from 'react-native-paper';

const lightTheme = {
    ...DefaultTheme,
    dark: false,
    myOwnProperty: true,
    mode: 'adaptive', // or 'exact' if you prefer
    colors: {
        ...DefaultTheme.colors,
        primary: '#720808',
        background: '#F8F8F8',
        text: '#000',
        icon: '#313131',
        tabs: '#fff',
        rightBar: '#fff',
        topbar: '#f5e9cd',
        bottomicon: '#C2C9D1'
    },
};

export default lightTheme;
