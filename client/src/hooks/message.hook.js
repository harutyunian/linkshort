import {useCallback} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const errorMsg = (msg) => {
    toast.configure()
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export const successMsg = (msg) =>{
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}


export const useMessage = () => {
    return useCallback((msg) => {
        if (msg) {
            errorMsg(msg)
        }
    }, [])
}