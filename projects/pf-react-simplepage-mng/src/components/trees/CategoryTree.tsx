import React, { useState, useEffect, useMemo } from 'react';
import { CategoryCard } from '..'; 
import { Tree, TreeProps, TreeDataNode } from 'antd';
import { TreeNodeType, CategoryListProps } from '../../types/app/categories';

type Props = {
  searchTerm: string;
  dataTree: TreeNodeType[];
  setSelectedCategoryName: (val: string) => void;
};

const CategoryTree = ({ searchTerm, dataTree, setSelectedCategoryName }: Props) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [ categoryList, setCategoryList ] = useState<CategoryListProps[]>([]);
  const [ expandedKeys, setExpandedKeys ] = useState<React.Key[]>([]);
  const [ expandedSearchKeys, setExpandedSearchKeys ] = useState<React.Key[]>([]);
  const [ selectedCategory, setSelectedCategory ] = useState<CategoryListProps | false>(false);
  const [ autoExpandParent, setAutoExpandParent ] = useState(false);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const selectedKey = selectedKeys[0];
    if (info.selected) {
      const selectedNode = categoryList.find((node) => node.key === selectedKey);
      setSelectedCategory(selectedNode ? selectedNode : false);
      setSelectedCategoryName(selectedNode ? selectedNode.title : '');
    } else {
      setSelectedCategory(false);
      setSelectedCategoryName('');
    }
  };

  useEffect(() => {
    const dataList: CategoryListProps[] = [];
    const generateList = (tree: TreeNodeType[]) => {
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.category) {
          if('img_mobile' in node.category){
            dataList.push({ 
              key: node.category.code, 
              title: node.category.name,
              note: node.category.note, 
              img: node.category.img,
              img_mobile: node.category.img_mobile,
            });
          }else{
            dataList.push({ 
              key: node.category.code, 
              title: node.category.name,
              note: node.category.note, 
              img: node.category.img,
            });
          }
        }
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(dataTree);
    setCategoryList(dataList);
    console.log(dataList);
  }, [dataTree]);

  const getParentKey = (key: React.Key, tree: TreeNodeType[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.category.code === key)) {
          parentKey = node.category.code;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };

  useEffect(() => {
    if (searchTerm) {
      //searchTermeの親のキーを取得し、自動的に展開
      const newExpandedKeys = categoryList
      .map((item) => {
        if (item.title.indexOf(searchTerm) > -1) {
          return getParentKey(item.key, dataTree);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
      setExpandedSearchKeys(newExpandedKeys);
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(true);
    }else{
      setExpandedSearchKeys([]);
      setExpandedKeys([]);
      setAutoExpandParent(false);
    }
  }, [searchTerm]);

  const handleExpand: TreeProps['onExpand'] = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const treeData = useMemo(() => {
    if(searchTerm){
      //searchTerm関連のツリーのみ表示
      const loop = (data: TreeNodeType[]): TreeDataNode[] =>
        data.filter((item) => {
          const strTitle = item.category.name as string;
          if(expandedSearchKeys.includes(item.category.code) || strTitle.includes(searchTerm)){
            return item;
          }
        }).map((item) => {
          const strTitle = item.category.name as string;
          const index = strTitle.indexOf(searchTerm);
          const beforeStr = strTitle.substring(0, index);
          const afterStr = strTitle.slice(index + searchTerm.length);
          const title =
            index > -1 ? (
              <span>
                {beforeStr}
                <strong>{searchTerm}</strong>
                {afterStr}
              </span>
            ) : (
              <span>{strTitle}</span>
            );
          if (item.children) {
            return { title, key: item.category.code, children: loop(item.children) };
          }
  
          return { title, key: item.category.code,};
        });

      return loop(dataTree);

    }else{
      //ツリーすべてを表示
      const loop = (data: TreeNodeType[]): TreeDataNode[] =>
        data.map((item) => {
          if (item.children) {
            return {
              title: item.category.name,
              key: item.category.code,
              children: loop(item.children)
            };
          }
          return { title: item.category.name, key: item.category.code };
        });
      return loop(dataTree);
    }
  }, [searchTerm, expandedKeys]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="flex">
      <div style={{ overflow: 'auto', width: '70%' }}>
        <Tree
          onSelect={handleSelect}
          onExpand={handleExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
        />
      </div>
      {selectedCategory && (
      <div style={{ overflow: 'auto', width: '30%'}}>
          <CategoryCard selectedCategory={selectedCategory}/>
      </div>
    )}
    </div>
  );
};

export default CategoryTree;
