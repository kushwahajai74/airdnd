/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";

const PhotosUploader = ({ addedPhotos, onChange: setAddedPhotos }) => {
  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    axios
      .post("/upload-by-link", {
        link: photolink,
      })
      .then(({ data: fileName }) => {
        setAddedPhotos((prev) => {
          return [...prev, fileName];
        });
      });
    setPhotoLink("");
  };

  const uploadPhoto = async (ev) => {
    const files = ev.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    axios
      .post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data: fileName }) => {
        setAddedPhotos((prev) => {
          return [...prev, ...fileName];
        });
      });
  };

  const [photolink, setPhotoLink] = useState("");

  return (
    <>
      <div className=" flex gap-3">
        <input
          value={photolink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder={"Add using a link ....jpg"}
        />
        <button
          className="rounded-2xl p-4 text-sm bg-gray-200 flex gap-2"
          onClick={addPhotoByLink}
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
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
          Add&nbsp;Photo
        </button>
      </div>
      <div className=" mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:3000/uploads/" + link}
                alt="photo"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer  rounded-2xl items-center justify-center bg-transparent border p-5 flex gap-2">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
