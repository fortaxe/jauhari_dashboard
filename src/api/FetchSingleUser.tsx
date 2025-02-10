
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../Constants";


export const fetchSingleUserData = async (userId: string | undefined) => {
    const token = localStorage.getItem("authToken")
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
        return response?.data
    } catch (error: any) {
        toast.error(error?.message)
    }
}

export const fetchPaymentInfo = async () => {
    const token = localStorage.getItem("authToken")
    try {
        const response = await axios.get(`${BASE_URL}/get/paymentConfirmation`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return response?.data
    } catch (error: any) {
        toast.error(error?.message)
    }
}

export const fetchPlans = async () => {
    const token = localStorage.getItem("authToken")
    try {
        const response = await axios.get(
            `${BASE_URL}/get/plans`
            
            , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return response?.data
    } catch (error: any) {
        toast.error(error?.message)
    }
}

export const fetchAllSIPTransactions = async () => {
    const token = localStorage.getItem("authToken")
    try {
        const response = await axios.get(
            `${BASE_URL}/get/all/sip/transactions`
           
            , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return response?.data
    } catch (error: any) {
        toast.error(error?.message)
    }
}

export const fetchAllCompletedSIPTransactions = async () => {
    const token = localStorage.getItem("authToken")
    try {
        const response = await axios.get(
            `${BASE_URL}/get/completed/sip/transactions`
            , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return response?.data
    } catch (error: any) {
        toast.error(error?.message)
    }
}