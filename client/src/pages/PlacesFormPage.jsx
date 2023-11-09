import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";

const PlacesFormPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    navigate("/account/places");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Title for your place, must be catchy as in advertisement
        </p>
        <input
          type="text"
          placeholder="For ex: My lovely apt"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">Address for your place</p>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">more = better</p>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm ">More info about this place</p>
        <textarea
          rows="5"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>

        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm">
          Select all the perks of your places
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 rounded-2xl">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <h2 className="text-2xl mt-4">Extra Info</h2>
        <p className="text-gray-500 text-sm ">House rules, etc.</p>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        ></textarea>

        <h2 className="text-2xl mt-4">Check in&out times</h2>
        <p className="text-gray-500 text-sm">
          Check in and out times for property.Make sure to have some extra time
          at checkIn for cleaning.
        </p>
        <div className="flex gap-2">
          <div className="w-full">
            <h3>Check in time</h3>
            <input
              type="text"
              placeholder="13:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="w-full">
            <h3>Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div className="w-full">
            <h3>Max guests</h3>
            <input
              type="number"
              placeholder="2"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-white px-6 py-2 rounded-full w-full">
          Save
        </button>
      </form>
    </>
  );
};

export default PlacesFormPage;
