"use client";
import { updateImageUrl } from "@/redux/slice/imageSlice";
import { useEffect, useState } from "react";
// import FileSaver from "file-saver";
// import * as htmlToImage from "html-to-image";
// import { FaPlus, FaRegSave, FaTimesCircle } from "react-icons/fa";
import { Toggle } from "@/components/ui/toggle";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdOutlineRotate90DegreesCcw,
  MdOutlineRotate90DegreesCw,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showTextOverlay, setshowTextOverlay] = useState(false);
  const options = [
    { value: "Thin", label: "Thin" },
    { value: "Normal", label: "Normal" },
    { value: "Bold", label: "Bold" },
    { value: "Dark", label: "Dark" },
  ];

  const readImage = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();

      reader.onload = () => {
        dispatch(updateImageUrl(reader.result));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const image = useSelector((state) => state.image);

  const [color, setColor] = useState("#2563eb");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(color);
    }, 500);

    return () => clearTimeout(timer);
  }, [color]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-5 font-medium">
          <li className="bg-[#f9f7ec] mt-3 p-4  rounded-lg transition-all  mx-auto ">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={() => {
                  setshowTextOverlay(!showTextOverlay);
                }}
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 "></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 font-poppins">
                Show Text Overlay
              </span>
            </label>

            <AnimatePresence>
              {showTextOverlay && (
                <motion.div
                  className="w-full max-w-full p-1 mt-3"
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                  }}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex gap-2 items-center justify-between">
                      <input
                        type="number"
                        max={50}
                        name=""
                        id=""
                        className="w-[44px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 text-[15px] text-center"
                        value={18}
                        onChange={(e) => {
                          e.target.value = Math.min(e.target.value, 50);
                        }}
                      />
                      <Toggle variant="outline" aria-label="Toggle italic">
                        <FontBoldIcon className="h-4 w-4" />
                      </Toggle>
                      <Toggle variant="outline" aria-label="Toggle italic">
                        <FontItalicIcon className="h-4 w-4" />
                      </Toggle>
                      <input
                        type="color"
                        className="p-1 block border-gray-400 border-solid border-2  rounded-md text-black cursor-pointer w-[44px] aspect-square h-[38.6px] bg-transparent"
                        id="hs-color-input"
                        value={color}
                        title="Choose your color"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 text-[15px] h-9 w-[100%]"
                        value={"Hello"}
                        onChange={(e) => {
                          e.target.value = Math.min(e.target.value, 50);
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="rounded-lg flex gap-2 items-center justify-between ">
            <div className="w-[120px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <MdOutlineRotate90DegreesCcw className="text-[20px] text-center my-auto" />
            </div>
            <div className="w-[120px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <MdOutlineRotate90DegreesCw className="text-[20px] text-center my-auto" />
            </div>
          </li>

          <li className="rounded-lg flex gap-2 items-center justify-between ">
            <div className="w-[120px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <p className="text-[18px] text-center my-auto">Brightness</p>
            </div>

            <div className="w-[120px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <p className="text-[18px] text-center my-auto">Grayscale</p>
            </div>
          </li>
          <li className="rounded-lg flex gap-2 items-center justify-between ">
            <div className="w-[120px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <p className="text-[18px] text-center my-auto">Contrast</p>
            </div>

            <div className="w-[120px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <p className="text-[18px] text-center my-auto">Saturate</p>
            </div>
          </li>
          <li className="rounded-lg flex gap-2 items-center justify-between ">
          <input id="default-range" type="range" value="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
          </li>

          {/* {image.url === "" ? (
            <li>
              <label
                htmlFor="choose"
                className="font-poppins bg-blue-400 flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer mt-10"
              >
                <FaPlus className="m-0 -mt-[3px]" /> Choose Image
              </label>
              <input
                type="file"
                onChange={readImage}
                id="choose"
                className="hidden"
              />
            </li>
          ) : (
            <li>
              <p
                htmlFor="choose"
                className="font-poppins bg-blue-400 flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer mt-10"
                onClick={() => {
                  htmlToImage
                    .toBlob(document.getElementById("my-node"))
                    .then(function (blob) {
                      if (window.saveAs) {
                        window.saveAs(blob, "my-node.png");
                      } else {
                        FileSaver.saveAs(blob, "my-node.png");
                      }
                    });
                }}
              >
                <FaRegSave className="m-0 -mt-[3px]" /> Save Image
              </p>
            </li>
          )}

          <li className="font-poppins bg-red-600 flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer">
            <FaTimesCircle className="m-0 -mt-[3px] " /> Delete Image
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
