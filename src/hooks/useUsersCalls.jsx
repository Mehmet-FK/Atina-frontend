import React from "react";
import { useDispatch } from "react-redux";
// import { data } from "../userData";
import { fetchFail, fetchStart, getSuccess } from "../redux/slices/atinaSlice";
import useAxios from "./useAxios";

const useUsersCalls = () => {
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();

  //!--------------- GET CALL--------------
  const getUsersData = async () => {
    const url = "AtinaUsers";

    dispatch(fetchStart());

    try {
      const { data } = await axiosInstance.get(`${url}`);

      dispatch(getSuccess({ data, url }));
    } catch (err) {
      dispatch(fetchFail());
      console.log(err);
    }
  };

  return { getUsersData };
};

export default useUsersCalls;
