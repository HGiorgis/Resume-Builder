import axios, { Method } from "axios";

// Define the base URL for all API requests
const BASE_URL = "http://localhost/api/api.php";

// Create a reusable API function
const apiRequest = async (
  type: string,
  data: Record<string, any> = {},
  method: Method = "POST"
) => {
  try {
    const config: any = {
      method,
      url: BASE_URL,
      withCredentials: true, // Include credentials if needed
      headers: {
        "Content-Type": "application/json",
      },
    };

    // For GET requests, use params instead of data
    if (method === "GET") {
      config.params = { type, ...data }; // Pass data as query parameters
    } else {
      config.data = { ...data, type }; // Include the type in the body for POST requests
    }

    const response = await axios(config);
    return response.data; // Return the response data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Check your network and try again!"
    );
  }
};

export default apiRequest;
