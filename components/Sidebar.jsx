"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  resetImageFilters,
  resetImageOptions,
  toggleTextOverlay,
  updateImageFilters,
  updateTextoverlayFilters,
} from "@/redux/slice/imageSlice";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import FileSaver from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { useEffect, useState } from "react";
import { LuSave, LuUndo } from "react-icons/lu";
import {
  MdOutlineRotate90DegreesCcw,
  MdOutlineRotate90DegreesCw,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  const filters = useSelector((state) => state.image.filters);
  const textOverlay = useSelector((state) => state.image.textOverlay);
  const textOverlayOptions = useSelector(
    (state) => state.image.textOverlayOptions
  );

  const [color, setColor] = useState("#2563eb");
  const [activeFilter, setactiveFilter] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        updateTextoverlayFilters({
          filterName: "color",
          value: color,
        })
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [color]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
        image.url === "" && "pointer-events-none opacity-50"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-5 font-medium">
          <li className="bg-[#f9f7ec] mt-3 p-4  rounded-lg transition-all  mx-auto ">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => {
                  dispatch(toggleTextOverlay());
                }}
                checked={textOverlay}
                value={textOverlay}
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 "></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 font-poppins">
                Show Text Overlay
              </span>
            </label>

            <AnimatePresence>
              {textOverlay && (
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
                        max={100}
                        name=""
                        id=""
                        className="w-[44px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 text-[15px] text-center"
                        value={textOverlayOptions["fontSize"]}
                        onChange={(e) => {
                          e.target.value = Math.min(e.target.value, 100);
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "fontSize",
                              value: e.target.value,
                            })
                          );
                        }}
                      />

                      <div
                        className={`w-[40px] aspect-square h-[38.6px]  font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer ${
                          textOverlayOptions.bold && "text-white bg-black"
                        }`}
                        onClick={() =>
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "bold",
                              value: !textOverlayOptions.bold,
                            })
                          )
                        }
                      >
                        <FontBoldIcon className="my-auto mx-auto" />
                      </div>

                      <div
                        className={`w-[40px] aspect-square h-[38.6px]  font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer ${
                          textOverlayOptions.italic && "text-white bg-black"
                        }`}
                        onClick={() =>
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "italic",
                              value: !textOverlayOptions.italic,
                            })
                          )
                        }
                      >
                        <FontItalicIcon className="my-auto mx-auto" />
                      </div>

                      <input
                        type="color"
                        className="p-1 block border-gray-400 border-solid border-2  rounded-md text-black cursor-pointer w-[44px] aspect-square h-[38.6px] bg-transparent"
                        id="hs-color-input"
                        value={textOverlayOptions.color}
                        title="Choose your color"
                        onChange={(e) => {
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "color",
                              value: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>

                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 text-[15px] h-9 w-[100%]"
                        value={textOverlayOptions["value"]}
                        onChange={(e) => {
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "value",
                              value: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>

                    <div className="flex gap-2 items-center">
                      <span className="font-outfit font-normal">Vertical</span>
                      <input
                        id="default-range"
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={textOverlayOptions["top"]}
                        value={textOverlayOptions["top"]}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-[6px]`}
                        onChange={(e) => {
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "top",
                              value: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="font-outfit font-normal">
                        Horizontal
                      </span>
                      <input
                        id="default-range"
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={textOverlayOptions["left"]}
                        value={textOverlayOptions["left"]}
                        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-[6px]`}
                        onChange={(e) => {
                          dispatch(
                            updateTextoverlayFilters({
                              filterName: "left",
                              value: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="rounded-lg flex gap-2 items-center justify-between px-4 flex-wrap bg-[#f9f7ec] py-4">
            <div className="w-[100px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <MdOutlineRotate90DegreesCcw className="text-[17px] text-center my-auto" />
            </div>

            <div className="w-[100px] aspect-square h-[38.6px] bg-transparent font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-medium focus:outline-none px-2 flex flex-col items-center cursor-pointer">
              <MdOutlineRotate90DegreesCw className="text-[17px] text-center my-auto" />
            </div>

            <div
              className={`w-[100px] aspect-square h-[38.6px]  font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer ${
                activeFilter === "brightness" && "text-white bg-black"
              }`}
              onClick={() =>
                setactiveFilter(
                  activeFilter === "brightness" ? "" : "brightness"
                )
              }
            >
              <p className="text-[16px] text-center my-auto">Brightness</p>
            </div>

            <div
              className={`w-[100px] aspect-square h-[38.6px]  font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer ${
                activeFilter === "grayscale" && "text-white bg-black"
              }`}
              onClick={() =>
                setactiveFilter(activeFilter === "grayscale" ? "" : "grayscale")
              }
            >
              <p className="text-[16px] text-center my-auto">Grayscale</p>
            </div>

            <div
              className={`w-[100px] aspect-square h-[38.6px]  font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer ${
                activeFilter === "contrast" && "text-white bg-black"
              }`}
              onClick={() =>
                setactiveFilter(activeFilter === "contrast" ? "" : "contrast")
              }
            >
              <p className="text-[16px] text-center my-auto">Contrast</p>
            </div>

            <div
              className={`w-[100px] aspect-square h-[38.6px]  font-outfit border-solid border-2 border-gray-400 rounded-md text-black font-normal focus:outline-none px-2 flex flex-col items-center cursor-pointer ${
                activeFilter === "saturate" && "text-white bg-black"
              }`}
              onClick={() =>
                setactiveFilter(activeFilter === "saturate" ? "" : "saturate")
              }
            >
              <p className="text-[16px] text-center my-auto">Saturate</p>
            </div>

            <input
              id="default-range"
              type="range"
              min={0}
              max={200}
              defaultValue={filters[activeFilter]?.value || 0}
              value={filters[activeFilter]?.value || 0}
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-4 ${
                activeFilter === "" && "opacity-50 pointer-events-none"
              }`}
              onChange={(e) => {
                dispatch(
                  updateImageFilters({
                    filterName: activeFilter,
                    value: e.target.value,
                  })
                );
              }}
            />
          </li>

          {image.url !== "" && (
            <li
              className="font-outfit font-normal bg-[#0079FF] text-white  flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer"
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
              <LuSave className="m-0  text-[26px]" /> Save Image
            </li>
          )}

          {filters.length !== 0 && (
            <li
              className="font-outfit font-normal bg-[#FE0000] text-white  flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer"
              onClick={() => {
                dispatch(resetImageOptions());
                setactiveFilter("");
              }}
            >
              <LuUndo className="m-0  text-[26px]" /> Reset Filters
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
