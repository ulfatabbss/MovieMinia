import {HTTP_APP} from '../utillis/config';
import {endPoints} from '../utillis/endPoints';
const GetMovies = (category: any, page: any) => {
  // console.log(`${endPoints.getMovies}${category}&page=${page ? page : 1}`);
  return HTTP_APP.get(
    `${endPoints.getMovies}${category}&page=${page ? page : 1}`,
  );
};
const GetUpcomming = () => {
  return HTTP_APP.get(endPoints.getUpcomming);
};

const GetDrama = (category: any, page: any) => {
  return HTTP_APP.get(
    `${endPoints.getDrama}${category}&page=${page ? page : 1}`,
  );
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

const checkUserExist = (obj: any) => {
  console.log(obj);

  return HTTP_APP.post(endPoints.checkUserExist, obj);
};
const AddFeedback = (obj: any) => {
  return HTTP_APP.post(endPoints.addFeedBack, obj);
};
const GetFeedback = () => {
  return HTTP_APP.get(endPoints.getFeedBack);
};
const EditProfileAPi = (id: any, obj: any) => {
  console.log(id, obj);

  return HTTP_APP.post(`${endPoints.editProfile}${id}`, obj);
};
const DeleteAccountApi = (id: any) => {
  return HTTP_APP.post(`${endPoints.deleteAccount}${id}`);
};
const SendOTP = (obj: any) => {
  return HTTP_APP.post(endPoints.sendOTP, obj);
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
  EditProfileAPi,
  DeleteAccountApi,
  SendOTP,
  checkUserExist,
};
