import React from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaHashtag, FaTags, FaUsers } from 'react-icons/fa';
import { IoGiftSharp } from 'react-icons/io5';
import { LiaNewspaperSolid } from 'react-icons/lia';
import { LuNetwork, LuWorkflow } from 'react-icons/lu';
import { MdWorkspaces } from 'react-icons/md';
import { TbScriptPlus, TbPlayHandball } from 'react-icons/tb';

import { AccessibleChannelsType } from '../types/app/channel';
import { PiBoundingBox } from 'react-icons/pi';

import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { MenuProps } from 'antd';
import { appRoute } from '../utils/routes';

export type MenuItem = Required<MenuProps>['items'][number];

export const sideBarContents: MenuItem[] = [
  // {
  //   key: '0',
  //   icon: React.createElement(MdDashboard),
  //   label: '商品提案'
  // },
  // {
  //   key: '1',
  //   icon: React.createElement(LuPackagePlus),
  //   label: '商品承認'
  // },
  // {
  //   key: 'grp-0',
  //   type: 'group',
  //   label: 'MANAGEMENT'
  // },
  // {
  //   key: appRoute.workspace,
  //   icon: React.createElement(LuWorkflow),
  //   label: 'ワークスペース'
  // },
  // {
  //   key: appRoute.workspaceManage,
  //   icon: React.createElement(LuNetwork),
  //   label: 'ワークスペース管理'
  // },
  {
    key: 'grp-1',
    type: 'group',
    label: 'WORKSPACE'
  },
  {
    key: appRoute.block,
    icon: React.createElement(TbScriptPlus),
    label: 'ブロック管理'
  },
  {
    key: appRoute.media,
    icon: React.createElement(PiBoundingBox),
    label: '各サイト',
    children: [
      {
        key: appRoute.media + '&1',
        icon: React.createElement(FaTags),
        label: 'サイト-1'
      },
      {
        key: appRoute.media + '&2',
        icon: React.createElement(FaTags),
        label: 'サイト-2'
      },
      {
        key: appRoute.media + '&3',
        icon: React.createElement(FaTags),
        label: 'サイト-3'
      },
      {
        key: appRoute.media + '&4',
        icon: React.createElement(FaTags),
        label: 'サイト-4'
      },
      {
        key: appRoute.media + '&5',
        icon: React.createElement(FaTags),
        label: 'サイト-5'
      }
    ]
  },
  // {
  //   key: 's',
  //   icon: React.createElement(TbScriptPlus),
  //   label: '登録',
  //   children: [
  //     {
  //       key: appRoute.media + '&1',
  //       icon: React.createElement(FaTags),
  //       label: 'カセット登録'
  //     },
  //     {
  //       key: appRoute.media + '&2',
  //       icon: React.createElement(FaTags),
  //       label: 'SKU登録'
  //     }
  //   ]
  // },
  {
    key: appRoute.pratice,
    icon: React.createElement(TbPlayHandball),
    label: 'Pratice'
  }
];
