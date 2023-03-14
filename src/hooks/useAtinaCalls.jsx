import { useDispatch } from "react-redux";
// import { data } from "../userData";
import { fetchFail, fetchStart, getSuccess } from "../redux/slices/atinaSlice";
import useAxios from "./useAxios";

const useAtinaCalls = () => {
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();

  //!--------------- GET CALL --------------
  const getAtinaData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosInstance.get(`${url}`);
      dispatch(getSuccess({ data, url }));
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      console.log(err);
    }
  };

  const getUsersData = () => getAtinaData("AtinaUsers");
  const getMobileBookingsData = () => getAtinaData("api/AtinaMobileBookings");
  const getNfcTagsData = () => getAtinaData("AtinaNfcTags");

  return { getUsersData, getMobileBookingsData, getNfcTagsData };
};

export default useAtinaCalls;
