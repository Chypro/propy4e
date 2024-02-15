import { Button, Image, ImageProps, Tooltip } from 'antd';
import { DoubleLeftOutlined, ToTopOutlined } from '@ant-design/icons';

import React, { useEffect, useRef, useState } from 'react';
import EyeIcon from '../svg/EyeIcon';
import ImageUploadIcon from '../svg/ImageUploadIcon';
type Props = {
  ImageProps: ImageProps;
  URL: string;
};
const CustomImage = ({ ImageProps, URL }: Props) => {
  let imageRef: any;
  const inputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [imageURL, setimageURL] = useState(URL);
  useEffect(() => {
    const imageElement = document.querySelector('#imageId') as HTMLImageElement;
    if (imageElement) {
      imageRef = imageElement;
    }
  }, []);

  useEffect(() => {
    const imageElement = document.querySelector('#imageId') as HTMLImageElement;
    if (imageElement) {
      imageRef = imageElement;
    }
  }, [imageURL]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const url = event.target?.result as string;
          setimageURL(url);
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('object');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const imageFile = files[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target?.result as string;
        console.log('Dropped image URL:', imageUrl);
        setimageURL(imageUrl);
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  console.log(URL);
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={dropAreaRef}
      className=" relative hover-dark-overlay-container"
      style={{ width: ImageProps.style.width, height: ImageProps.style.height }}
    >
      <input
        onChange={handleImageChange}
        ref={inputRef}
        type={'file'}
        style={{ display: 'none' }}
      />
      <Image id="imageId" className=" absolute" src={imageURL} {...ImageProps}></Image>
      <div
        style={{ width: ImageProps.style.width, height: ImageProps.style.height }}
        className=" absolute dark-overlay flex justify-end"
      >
        <div className="text-white absolute top-14">
          ドラッグアンドドロップでアップロードができます。
        </div>
        <Tooltip title="画像をアップロードします">
          <Button
            onClick={() => inputRef.current?.click()}
            size="large"
            className=" text-white"
            type="text"
            icon={<ImageUploadIcon />}
          ></Button>
        </Tooltip>
        <Tooltip title="写真のプレビューを閲覧できます。">
          <Button onClick={() => imageRef?.click()} type="text" icon={<EyeIcon></EyeIcon>}></Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CustomImage;
