import React, { useState } from 'react';
import { useAppSelector } from '../../../store/store';
import { Card, ConfigProvider, Image, Space, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Block } from '../../../types/app/block';
import { fallback } from '../../../data/imgFallback';
import { LuFileEdit } from 'react-icons/lu';

const SiteBlockCard = ({ block }: { block: any }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const [isHover, setIsHover] = useState<boolean>(false);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      style={{
        backgroundColor: isHover ? themeColor[primaryColor][300] : themeColor[primaryColor][200],
        color: themeColor['gray'][700]
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-[200px] h-[250px] rounded-md p-[1px] cursor-pointer"
    >
      <div
        style={{
          backgroundColor: themeColor['gray'][100]
        }}
        className="w-full h-full rounded-md"
      >
        <div className="w-full h-[200px] flex justify-center">
          <Image
            src={block.img}
            fallback={fallback}
            height={200}
            width={196}
            style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
          />
        </div>

        <div style={{ fontSize: 16 }} className="px-2 truncate mt-1">
          {block.name}
        </div>
        <div style={{ fontSize: 12 }} className="px-2 truncate ">
          {block.productClassification.name}
        </div>
      </div>
    </div>
  );
};

export default SiteBlockCard;
