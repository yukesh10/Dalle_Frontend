import React, { useRef } from "react";
import { downloadImage } from "../utils";
import { download } from "../assets";

const Modal = ({ isOpen, onClose, _id, photo, prompt }) => {
  if (!isOpen) {
    return null;
  }

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="min-h-screen max-h-screen absolute top-0 left-0"
          onClick={handleClickOutside}
        >
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-80">
            <div
              ref={modalRef}
              className="bg-white shadow-md rounded-xl max-w-full m-4 w-[480px] pb-8"
            >
              <img
                className="w-full object-cover rounded-t-xl"
                src={photo}
                alt={prompt}
              />
              <p className="mt-5 text-center">{prompt}</p>
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => downloadImage(_id, photo)}
                  className="text-black bg-[#ececf1] font-semibold rounded-md text-sm w-full sm:w-4/5 px-5 py-2.5 text-center flex items-center justify-center gap-2"
                >
                  <img src={download} alt="download" className="w-6 h-6" />
                  <p>Download Image</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
