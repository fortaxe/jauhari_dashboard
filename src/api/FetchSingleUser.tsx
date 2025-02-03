
import axios from "axios";
import toast from "react-hot-toast";

const url = "http://46.202.163.138:5000/api"
const token = localStorage.getItem("authToken")

export const fetchSingleUserData = async (userId: string | undefined) => {

        try {
        const response = await axios.post(
            // `${url}/get/user/sip/details`
             "http://localhost:5000/api/get/user/sip/details"
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
        const response = await axios.get(`${url}/get/paymentConfirmation`, {
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

