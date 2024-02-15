import React, { useEffect, useState } from 'react';

import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { SearchDrawer } from '..';
import Search from 'antd/es/input/Search';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Button, message } from 'antd';
import { useGetBlockSearchedMutation } from '../../services/blockApi';
import { BlockResponseType, GetBlockSearchedRequest } from '../../types/api/block';
import { Block } from '../../types/app/block';
import { setIsLoading, setSearchTerm, setSearchedBlockList } from '../../features/searchSlice';
import { useNavigate } from 'react-router-dom';
import { appRoute } from '../../utils/routes';

const HeaderSearchInput = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setisDrawerOpen] = useState<boolean>(false);
  const [getBlockMutation, { isLoading }] = useGetBlockSearchedMutation();
  const navigate = useNavigate();
  const [value, setvalue] = useState<string>();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  const handleClick = (e: string) => {
    console.log('object');
    console.log(e);
    const request: GetBlockSearchedRequest = {
      pagination: 10,
      searchedTerm: encodeURIComponent(e)
    };
    getBlockMutation(request).then((res: any) => {
      if (res.error) return;
      const response = res.data as BlockResponseType;
      console.log(response);
      let blockList: Block[] = [];
      response.data.map((block, i) => {
        blockList.push({
          id: block.id,
          img: block.img,
          name: block.name,
          productClassification: {
            name: block.product_classification.name
          },
          spCategory: block.sp_category_tree
        });
      });
      setvalue('');
      message.success('キーワード検索が成功しました。 ');
      dispatch(setSearchedBlockList(blockList));
      dispatch(setSearchTerm(e));
      navigate(appRoute.keyWordSerch);
    });
  };
  const handleChange = (e: string) => {
    setvalue(e);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------

  return (
    <div className="w-full h-full lg:flex items-center lg:space-x-2 space-y-2 lg:space-y-0">
      <Search
        placeholder="キーワードを入力してEnterで検索"
        prefix={<AiOutlineSearch size={18} style={{ color: themeColor[primaryColor][300] }} />}
        enterButton
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onSearch={(e) => handleClick(e)}
      />

      <Button onClick={() => setisDrawerOpen(true)}>
        <div className="h-full flex justify-center items-center pt-[2px] space-x-1">
          <div className="pt-1">
            <AiOutlineSetting size={16} />
          </div>
          <div className="text-sm">高度な検索</div>
        </div>
      </Button>

      <SearchDrawer isOpen={isDrawerOpen} onClose={() => setisDrawerOpen(false)} />
    </div>
  );
};

export default HeaderSearchInput;
