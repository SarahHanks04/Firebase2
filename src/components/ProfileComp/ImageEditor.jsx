import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageEditor = ({ image, onSave, onCancel }) => {
  const [crop, setCrop] = useState({
    aspect: 1,
    unit: "px",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const handleCropComplete = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef, crop);
      setCroppedImage(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-90 rounded-lg p-6 w-[400px] max-h-[80vh] flex flex-col shadow-lg overflow-y-auto">
        <h2 className="text-lg font-semibold text-[#000000] mb-4">
          Crop your new profile picture
        </h2>
        <div className="flex-1 overflow-hidden">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
            circularCrop
            aspect={1}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Crop me"
              onLoad={(e) => setImageRef(e.currentTarget)}
              className="max-w-full max-h-[50vh] object-contain"
            />
          </ReactCrop>
        </div>
        <div className="mt-4 space-y-2">
          <button
            className="w-full px-4 py-2 bg-[#B5835E] text-white rounded-[8px] hover:bg-[#A5754E]"
            onClick={() => onSave(croppedImage)}
          >
            Set new profile picture
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-300 text-[#4A4848] rounded-[8px] hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
