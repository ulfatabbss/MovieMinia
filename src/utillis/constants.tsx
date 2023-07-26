import Toast from 'react-native-toast-message';
import {store} from '../redux/store';
const BASE_URL = 'https://giant-eel-panama-hat.cyclic.app/moveminia/';
const BASE_URL1 = 'https://giant-eel-panama-hat.cyclic.app/moveminia/login';
const {user} = store.getState().root;
const HEADERS = () => {
  return {
    'Content-Type': 'multipart/form-data',
    // Authorization: `Bearer ${user?.user?.token}`,
  };
};

const toastMessage = (type: string, msg1: string, msg2?: string) => {
  if (msg1) {
    Toast.show({
      type: type,
      text1: msg1,
    });
  } else if (msg1 && msg2) {
    Toast.show({
      type: type,
      text1: msg1,
      text2: msg2,
    });
  }
};
export {BASE_URL, BASE_URL1, HEADERS, toastMessage};
