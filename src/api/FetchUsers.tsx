import { BASE_URL } from "../Constants";

const fetchUsersData = async () => {
    const url = `${BASE_URL}/get/users`;
  
    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Analytics Data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };
  
  export default fetchUsersData;
  