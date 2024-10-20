import Image from "next/image";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";

export default function ImageEditForm({ images, setImages, product }) {
  const [selectedImages, setSelectedImages] = useState(images);

  useEffect(() => {
    setSelectedImages(images);
  }, [images]);

  useEffect(() => {
    setImages({ ...product, imagenes: selectedImages });
  }, [selectedImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages({ ...product, nuevasImagenes: files });
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        name="imagen"
        className="file-input border border-neutral file-input-sm w-full file-input-secondary"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="flex gap-5 justify-center flex-wrap">
        {selectedImages.map((imageUrl, i) => (
          <div className="relative" key={i}>
            <Image
              key={i}
              src={imageUrl}
              alt="Product image"
              width={100}
              height={100}
              className="rounded-md m-0 w-full h-full object-cover object-center"
            />
            <button
              className="absolute -top-1 -right-1 btn btn-square btn-sm btn-primary hover:btn-secondary border-neutral"
              onClick={() => handleImageDelete(i)}
            >
              <HiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
