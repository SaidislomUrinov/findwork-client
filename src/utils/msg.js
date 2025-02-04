import toast from "react-hot-toast";

export const successMsg = (msg = '') => toast.success(msg);
export const errorMsg = (msg = '') => toast.error(msg);