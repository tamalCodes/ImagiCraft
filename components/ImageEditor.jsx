"use client";

import { updateImageUrl } from "@/redux/slice/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ImageEditor = () => {
  const image = useSelector((state) => state.image);
  const dispatch = useDispatch();

  const readImage = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();

      reader.onload = () => {
        dispatch(updateImageUrl(reader.result));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbar />

      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 h-[88vh] ">
          {image.url ? (
            <img
              src={image.url}
              alt="image"
              className="w-full h-full object-contain"
              id="my-node"
            />
          ) : (
            <label
              className="flex items-center justify-center h-full rounded bg-gray-100 dark:bg-gray-100 cursor-pointer"
              htmlFor="choose"
            >
              <div className="text-2xl text-gray-600 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </div>
              <input
                type="file"
                onChange={readImage}
                id="choose"
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageEditor;
