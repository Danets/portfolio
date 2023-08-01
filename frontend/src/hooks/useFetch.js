import { useState } from "react";

const useFetch = (requestOptions, setLocalData) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

    const fetchData = async() => {
      try {
        const response = await fetch(requestOptions.api, {
          method: requestOptions.method ? requestOptions.method : "GET",
          headers: requestOptions.headers ? requestOptions.headers : {},
          body: requestOptions.body
            ? JSON.stringify(requestOptions.body)
            : null,
        });
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const dataResponse = await response.json();
        setLocalData(dataResponse);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

  return { error, isLoading, fetchData };
};

export default useFetch;
