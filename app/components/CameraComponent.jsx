import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const filters = [
  { name: "Normal", class: "" },
  { name: "Grayscale", class: "filter-grayscale" },
  { name: "Sepia", class: "filter-sepia" },
  { name: "Blur", class: "filter-blur" },
  { name: "Brightness", class: "filter-brightness" },
];

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [filter, setFilter] = useState(""); // Store selected filter

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="absolute bottom-24 left-52 w-62 h-[36rem] p-6 flex flex-col items-center justify-center">
      {/* Webcam Display */}
      <div className="relative w-80 h-96 border-4 border-white rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`w-full h-full object-cover ${filter}`}
        />
      </div>

      {/* Snapchat Style Filter Circles */}
      <div className="absolute bottom-24 flex gap-4">
        {filters.map((f, index) => (
          <button
            key={index}
            onClick={() => setFilter(f.class)}
            className={`w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white 
            ${f.class} bg-gray-700 hover:scale-110 transition-transform`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Capture Button */}
      <button
        onClick={capture}
        className="absolute bottom-8 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        📸 Capture
      </button>
    </div>
  );
};

export default CameraComponent;
