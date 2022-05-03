import React, { useEffect, useState } from "react";
import LandscapeIcon from "@mui/icons-material/Landscape";

export default function UploadImage() {
  const [file, openFile] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      document.getElementById("file")?.click();
    }
  }, [file]);

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const path = e.target.value;
    const name = path.split("\\")[2];
    setImage(name);
    openFile(false);
  }

  return (
    <>
      <section className="flex items-center flex-col flex-grow-1 sm:max-w-[250px] ">
        <input
          onChange={imageHandler}
          type="file"
          id="file"
          name="image"
          className="invisible"
        />
        <div
          onClick={() => openFile(true)}
          className="p-6 inline-block border-[4px] mx-auto border-orange-500 border-dashed cursor-pointer aspect-square"
        >
          <LandscapeIcon className="text-orange-300 text-8xl" />
        </div>
        <p className="pt-3 break-words text-center">
          {image ? image : "Upload Image"}
        </p>
      </section>
    </>
  );
}
