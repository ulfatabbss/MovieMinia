import {store} from '../redux/store';
const BASE_URL = 'https://giant-eel-panama-hat.cyclic.app/moveminia/';
const {user} = store.getState().root;
const HEADERS = () => {
  return {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${user?.user?.token}`,
  };
};
export {BASE_URL, HEADERS};
