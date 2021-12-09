import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [wheatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  // this useEffect will help us to show everytime we refresh the main city that we have configured like Manchester
  // as you can see params.q below
  useEffect(() => {
    fetchWheatherInfo();
  }, []);

  const fetchWheatherInfo = (e) => {
    e && e.preventDefault();
    let options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        // here the condition are that we have the value from the input, or if the input doesn't exist we will show
        // the main city configured that is Manchester
        q: inputRef.current.value || "Manchester, uk", //Manchester, uk
        units: "metric",
      },
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "6a8e9461e0msh00e1be33dd33b7ep10f1d3jsnd7fade303ed8",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("Fetched the wheather");
        console.log(response.data);
        setWeatherInfo(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    determineBackgroundImage();
  }, [wheatherInfo]);

  const determineBackgroundImage = () => {
    wheatherInfo?.weather[0]?.main === "Clear" &&
      setImage(
        "https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      );
    wheatherInfo?.weather[0]?.main === "Clouds" &&
      setImage(
        "https://images.unsplash.com/photo-1594156596782-656c93e4d504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      );

    if (wheatherInfo?.weather[0]?.main === "Rain") {
      setImage(
        "https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJhaW5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      );
    }
  };

  return (
    <div>
      <img
        className="relative w-screen h-screen"
        // src="https://images.unsplash.com/photo-1589642314445-999ac13b0075?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMzYwOTV8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=60"
        src={image}
      />

      <div className="p-5 background flex space-x-20 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col items-center">
          <h1 className=" text-white text-lg font-bold">Wheather app</h1>
          <form className="p-3 justify center flex">
            <input
              className="shadow-md focus:outline-none p-1"
              ref={inputRef}
              type="text"
              placeholder="Type the city..."
            />
            <button
              className="border p-1 border-black bg-gray-500 focus:outline-none hover:bg-yellow-500"
              onClick={fetchWheatherInfo}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {/* The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist. */}
        <div className="text-white justify-start">
          <h2>{`CITY : ${wheatherInfo?.name}`}</h2>
          <h2>{`TEMP : ${wheatherInfo?.main?.temp}`} Degrees Celsius</h2>
          <h3 className=" whitespace-nowrap">
            {wheatherInfo &&
              `SUNRISE: ${moment
                .unix(wheatherInfo?.sys?.sunrise)
                .format("LLLL")}`}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
