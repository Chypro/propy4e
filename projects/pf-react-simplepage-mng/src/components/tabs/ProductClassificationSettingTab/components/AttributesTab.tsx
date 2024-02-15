import React, { useState, useEffect } from 'react'
import { Flex, Space, Button, Form, Input, TableProps, TabsProps } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { AttributesTable } from '..';
import { SettingHeaderV2 } from '../../..';
import { 
  useGetAttributesByProductClassificationAndChannelMutation 
} from '../../../../services/attributesApi';

type Props = {
  classificationCode: string;
}

const AttributesTab = ({classificationCode}: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const titleText = '項目';
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [attributesList, setAttributesList] = useState<any[]>([]);
  const [allAttributesList, setAllAttributesList] = useState<any[]>([]);
  const [visibleAttributesList, setVisibleAttributesList] = useState<any[]>(null);
  const [filteredAttributesList, setFilteredAttributesList] = useState<any[]>([]);

  const [
    getAttributesByProductClassificationAndChannel,
    { isLoading: isUpdateSiteLoading, isError: isUpdateSiteError, isSuccess: isUpdateSiteSuccess }
  ] = useGetAttributesByProductClassificationAndChannelMutation();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  useEffect(() => {
    getAttributesByProductClassificationAndChannel({classificationCd: classificationCode, channel: 0}).then((res: any) => {
      if (res.error) {
      } else {
        const response = res.data;
        console.log(response.data);
        setAttributesList(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (attributesList) {
      const newAttributesList = attributesList.map((item: any, i: number) => {
        return {
          項目名: item.name,
          項目表示名: item.alternative_name,
          入力タイプ: item.control_type,
          選択肢: item.select_list,
          共通項目: item.is_common,
          単位あり: item.is_with_unit,
          固定項目: item.is_fixed,
          必須項目: item.is_deleted,
          最大文字数: item.max_length,
          デフォルト属性値: item.default_value,
          デフォルト属性単位: item.unit,
          表示項目: item.is_private,
        };
      });
      setAllAttributesList(newAttributesList);
    }
  }, [attributesList]);

  useEffect(() => {
    if (visibleAttributesList) {
      setFilteredAttributesList(visibleAttributesList.filter(
        (item: any) => item['項目名'].includes(searchTerm)
      ))
    } else if (allAttributesList) {
      setFilteredAttributesList(allAttributesList.filter(
        (item: any) => item['項目名'].includes(searchTerm)
      ))
    }
  }, [allAttributesList, visibleAttributesList, searchTerm]);

  const handleVisibleChange = (value: string) => {
    //表示項目の変更
    if (value === 'all') {
      setVisibleAttributesList(null);
    } else {
      const visibleList = allAttributesList.filter((item: any) => item["表示項目"] === value)
      setVisibleAttributesList(visibleList);
    }
  }

  const handleEditModalOpen = (val: boolean, data: TableProps) => {
    //編集をクリック
    setIsEditModalVisible(val);
    //const editData = siteList.find((item: getSiteListResponseData) => item.cd === data['コード']);
    //setEditSiteData(editData);
  }
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <SettingHeaderV2 
        settingHeaderText={titleText} 
        setSearchTerm={setSearchTerm} 
        setIsModalVisible={setIsAddModalVisible}
        handleChange={handleVisibleChange}
      />
      <AttributesTable TableProps={{ dataSource: filteredAttributesList }} handleEditModalOpen={handleEditModalOpen}/>
    </div>
  )
};

export default AttributesTab;
