const axios = require('axios').default;

const TEST_API_URL = 'http://localhost:8000/client_portal/api/v1/service-types/';

const testAxios = async () => {
  try {
    console.log("Testing Axios...");
    console.log("API URL:", TEST_API_URL);

    const response = await axios.get(TEST_API_URL);
    console.log("Axios Response:", response.data);

  } catch (error) {
    console.error("Axios Test Error:", error);
  }
};

testAxios();
