import { makeRequest } from "../axios";
import { RootState } from "../features/store";
import { setAcessToken } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useRefreshToken = () => {
  const { user, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await makeRequest.get("/refresh/" + user?._id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response");
      if (response?.data) {
        console.log("refreshToken", response);
        dispatch(setAcessToken(response.data.token));
        return response.data.token;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
