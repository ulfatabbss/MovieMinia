import {HTTP_APP} from '../utillis/config';
import {endPoints} from '../utillis/endPoints';
const GetMovies = () => {
  return HTTP_APP.get(endPoints.getMovies);
};
const GetUpcomming = () => {
  return HTTP_APP.get(endPoints.getUpcomming);
};

const GetDrama = () => {
  return HTTP_APP.get(endPoints.getDrama);
};
const GetSlider = () => {
  return HTTP_APP.get(endPoints.getSlider);
};

const Login = (obj: any) => {
  console.log(obj);
  return HTTP_APP.post(endPoints.login, obj);
};
const Register = (obj: any) => {
  return HTTP_APP.post(endPoints.register, obj);
};

export {GetMovies, GetUpcomming, GetDrama, GetSlider, Login, Register};
