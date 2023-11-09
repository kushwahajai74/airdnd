import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import PlacesFormPage from "./PlacesFormPage";

const Places = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places")
      .then(({ data }) => {
        console.log(data);
        setPlaces(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {action !== "new" && (
        <div>
          <div className="text-center flex justify-center">
            <Link
              className="flex gap-2 bg-primary px-6 py-2 rounded-full text-white"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New Place
            </Link>
          </div>
          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <div
                  key={place._id}
                  className="bg-gray-200 p-4 flex gap-4 rounded-2xl mt-4"
                >
                  <div className="w-40 flex items-center shrink-0">
                    {place.photos.length > 0 && (
                      <img
                        src={"http://localhost:3000/uploads/" + place.photos[0]}
                        alt="place photo"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl">{place.title}</h2>
                    <p>
                      {place.description.substring(0, 500)}
                      <strong>...Read More</strong>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {action === "new" && <PlacesFormPage />}
    </div>
  );
};

export default Places;
