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
  return HTTP_APP.post(endPoints.login, obj);
};
const Addtoplaylist = (obj: any) => {
  return HTTP_APP.post(endPoints.addToplaylist, obj);
};
const GetPlaylist = (obj: any) => {
  return HTTP_APP.post(endPoints.getPlaylist, obj);
};
const DellfromPlaylist = (obj1: any) => {
  return HTTP_APP.delete(endPoints.deleteMovie, obj1);
};

const Register = (obj: any) => {
  return HTTP_APP.post(endPoints.register, obj);
};
const AddFeedback = (obj: any) => {
  return HTTP_APP.post(endPoints.addFeedBack, obj);
};
const GetFeedback = () => {
  return HTTP_APP.get(endPoints.getFeedBack);
};
export {
  GetMovies,
  GetUpcomming,
  GetDrama,
  GetSlider,
  Login,
  Register,
  Addtoplaylist,
  GetPlaylist,
  DellfromPlaylist,
  AddFeedback,
  GetFeedback,
};
