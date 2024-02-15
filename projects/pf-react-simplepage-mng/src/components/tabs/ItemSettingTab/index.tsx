import React, { useEffect, useState } from 'react';
import allAttributes from '../../../data/attributes';
import ItemSettingHeader from './components/ItemSettingHeder';
import NewItemModal from './components/NewItemModal';
import EditItemModal from './components/EditItemModal';
import ModalContainer from '../../modals/ModalContainer';
import {
  Button,
  Input,
  Tabs,
  TabsProps,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  Dropdown,
  MenuProps,
  Modal,
  message
} from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useGetAttributesQuery,
  useGetAttributesDetailMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation
} from '../../../services/attributesApi';

import { CustomTable } from '../..';
import { Attribute, UpdateAttributesBody } from '../../../types/api/attributes';
import { useAppSelector } from '../../../store/store';

const ItemSettingTab: React.FC = () => {
  const { screenSize } = useAppSelector((state) => state.persist.appReducer);

  type DataType = {
    key: string;
    void: string;
    name: string;
    code: string;
    action: JSX.Element;
  };

  const columnIndex = {
    key: '',
    void: 'void',
    name: 'name',
    code: 'code',
    action: 'action'
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: '',
      dataIndex: columnIndex.void,
      ellipsis: true,
      width: `${screenSize.x * 0.08}px`
    },
    {
      title: '項目名',
      dataIndex: columnIndex.name,
      ellipsis: true
    },
    {
      title: '項目コード',
      dataIndex: columnIndex.code,
      ellipsis: true
    },
    {
      title: '',
      dataIndex: columnIndex.action,
      ellipsis: true,
      align: 'center'
    }
  ];

  const [dataSource, setdataSource] = useState<DataType[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [filteredAttributes, setFilteredAttributes] = useState<any[]>([]);
  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState<boolean>(false);
  const [isEditItemModalVisible, setIsEditItemModalVisible] = useState(false);
  const [editItemData, setEditItemData] = useState<Attribute>();
  const { data, isError, isLoading, isSuccess, refetch } = useGetAttributesQuery();
  const [getAttributesDetail, { data: detailData, isSuccess: isSu, isLoading: isLoad }] =
    useGetAttributesDetailMutation();
  const [updateAttributes, { data: updateData, isSuccess: isUpdateSu, isLoading: isUpdateLoad }] =
    useUpdateAttributeMutation();
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setselectedDeleteId] = useState<string>();
  const [deleteAttribute, {}] = useDeleteAttributeMutation();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);

      const newAttributes: DataType[] = data.data.map((item, i) => {
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: <div onClick={(e) => handleEditModaOpen(item)}>編集</div>
          },
          {
            key: '2',
            label: <div onClick={(e) => handleDeleteModalOpen(item.cd)}>削除</div>
          }
        ];
        return {
          key: item.cd,
          void: '',
          name: item.name,
          code: item.cd,
          action: (
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button size="small" icon={<MoreOutlined />}></Button>
            </Dropdown>
          )
        };
      });

      setdataSource(newAttributes);
      //filter が未入力または空文字列の場合は全ての情報を表示
      const filtered =
        filter.trim() === ''
          ? newAttributes
          : newAttributes.filter(
              (item) => item['項目名'].includes(filter) || item['項目コード'].includes(filter)
            );

      setFilteredAttributes(filtered);
    }
  }, [data, filter]);

  const handleDelete = () => {
    console.log('object');
    if (!selectedDeleteId) return;
    deleteAttribute({ attrId: selectedDeleteId }).then((res: any) => {
      if (res.error) return;
      if (res.data.result === 'success') {
        message.success('項目が正常に削除されました。');
        setselectedDeleteId(null);
        setisDeleteModalOpen(false);
        refetch();
      } else {
        message.error('この項目は商品分類に紐づけられているため削除できません。');
        setselectedDeleteId(null);
        setisDeleteModalOpen(false);
      }
    });
  };

  const handleDeleteModalOpen = (id: string) => {
    setselectedDeleteId(id);
    setisDeleteModalOpen(true);
  };
  const handleEditModaOpen = (attr: Attribute) => {
    setEditItemData(attr);
    setIsEditItemModalVisible(true);
  };

  useEffect(() => {
    if (editItemData) {
      setIsEditItemModalVisible(true);
    }
  }, [editItemData]);

  const handleNewItemModalClose = () => {
    setIsNewItemModalVisible(false);
  };

  const handleEditItemModalClose = () => {
    setIsEditItemModalVisible(false);
  };

  const handleAddItemSubmit = (data: { 項目名: string }) => {
    // 新規項目の追加処理を行う（データの保存など）
    console.log('新規項目の追加:', data);
    // ここで新規項目を追加するためのロジックを実装

    // モーダルを閉じる
    setIsNewItemModalVisible(false);
  };

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={() => setIsNewItemModalVisible(true)}>
        項目の追加
      </Button>

      <Table
        loading={isLoading}
        className=" mt-3"
        size="small"
        scroll={{ y: screenSize.y * 0.5 }}
        dataSource={dataSource}
        columns={columns}
      ></Table>
      <ModalContainer>
        <NewItemModal
          visible={isNewItemModalVisible}
          onClose={handleNewItemModalClose}
          onAddItem={handleAddItemSubmit}
        />
        <EditItemModal
          ModalProps={{
            open: isEditItemModalVisible,
            onCancel: () => setIsEditItemModalVisible(false)
          }}
          data={editItemData}
        />
        <Modal
          open={isDeleteModalOpen}
          onCancel={() => setisDeleteModalOpen(false)}
          onOk={handleDelete}
          title={'項目の削除'}
        >
          <div>この項目を削除しますか？</div>
        </Modal>
      </ModalContainer>
    </div>
  );
};

export default ItemSettingTab;
