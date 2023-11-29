import { privateAxios } from "../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

const useAxiosPrivate = () => {
    const {token} = useSelector((state:RootState) => state.user)
    console.log(token)
    const refresh = useRefreshToken();
    useEffect(() => {
        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const accessToken = await refresh();
                    prevRequest.headers['authorization'] = `Bearer ${accessToken}`;
                    return privateAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAxios.interceptors.request.eject(requestIntercept);
            privateAxios.interceptors.response.eject(responseIntercept);
        }
    }, [token, refresh])

    return privateAxios;
}

export default useAxiosPrivate;