const getCsrfToken = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/user/get-csrf-token/", {
      method: "GET",
      credentials: "include",  // Allows cookies to be sent/received
    });
    const data = await response.json();
    return data.csrfToken;
  };