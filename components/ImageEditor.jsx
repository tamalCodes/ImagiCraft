"use client";

import { updateImageUrl } from "@/redux/slice/imageSlice";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ImageEditor = () => {
  const image = useSelector((state) => state.image);
  const filters = useSelector((state) => state.image.filters);
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
        <div className="border-2 border-gray-400 border-dashed rounded-lg dark:border-gray-700 mt-14 h-[88vh] relative">
          {image.url !== "" && (
            <RxCross1
              className="absolute -right-2 -top-2 bg-white rounded-full  border-solid border-2 border-red-500 w-[25px] h-[25px] p-1 cursor-pointer"
              onClick={() => {
                dispatch(updateImageUrl(""));
              }}
            />
          )}

          {image.url ? (
            <img
              src={image.url}
              alt="image"
              className="w-full h-full object-contain"
              id="my-node"
              style={{
                filter: `brightness(${filters?.brightness?.value}%)  saturate(${filters?.saturate?.value}%) contrast(${filters?.contrast?.value}%) grayscale(${filters?.grayscale?.value}%)`,
                // transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
              }}
            />
          ) : (
            <label
              className="flex flex-col items-center justify-center h-full rounded-lg bg-gray-100 dark:bg-gray-100 cursor-pointer"
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
              <span className="font-normal text-[1.2rem] font-outfit text-gray-500">
                Choose Image
              </span>
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
