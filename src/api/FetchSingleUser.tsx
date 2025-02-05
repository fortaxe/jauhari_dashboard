
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../Constants";
const token = localStorage.getItem("authToken")

export const fetchSingleUserData = async (userId: string | undefined) => {

        try {
        const response = await axios.post(
            `${BASE_URL}/get/user/sip/details`
            , {
            userId
        },
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return response.data
    } catch (error: any) {
        toast.error(error.message)
    }
}


export const fetchPaymentInfo = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get/paymentConfirmation`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return response.data
    } catch (error: any) {
        toast.error(error.message)
    }
}

