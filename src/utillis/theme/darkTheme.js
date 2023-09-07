// darkTheme.js
import { DefaultTheme } from 'react-native-paper';

const darkTheme = {
    ...DefaultTheme,
    dark: true,
    myOwnProperty: true,
    mode: 'adaptive', // or 'exact' if you prefer
    colors: {
        ...DefaultTheme.colors,
        primary: '#720808',
        background: '#0D0D0D',
        text: '#fff',
        icon: '#fff',
        tabs: '#313131',
        rightBar: '#0D0D0D',
        topbar: '#313131',
        bottomicon: '#92979D'


    },
};

export default darkTheme;

// import { DefaultTheme } from 'react-native-paper';

// const darkTheme = {
//     ...DefaultTheme,
//     dark: true,
//     myOwnProperty: true,
//     mode: 'adaptive',
//     colors: {
//         ...DefaultTheme.colors,
//         primary: '#720808',
//         background: '#0D0D0D',
//         text: '#fff', // Set text color explicitly
//         icon: '#fff',
//         tabs: '#313131',
//         rightBar: '#0D0D0D',
//         topbar: '#313131',
//         bottomicon: '#92979D'
//     },
// };

// export default darkTheme;
