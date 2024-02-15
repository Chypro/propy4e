import { useEffect, useState } from 'react';
import { useGetLablesLIstQuery } from '../../services/lablesApi';
import { Button, Empty, Input, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GetLablesListResponse } from '../../types/api/lable';
import { FaCheck } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useAppSelector } from '../../store/store';

const SkuLabelInput = ({
  selectedLabels,
  handleTagClose,
  handleLabelSelect
}: {
  selectedLabels: {
    value: string | null;
    label: string | null;
  }[];
  handleTagClose: (lable: string, value: string) => void;
  handleLabelSelect: (label: string, value: string, isDelete: boolean) => void;
}) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  type LabelDict = {
    [key: string]: {
      id: string;
      color: string;
      name: string;
      selected: boolean;
    };
  };

  const { isDarkMode } = useAppSelector((state) => state.persist.themeReducer);
  const { data: allLabels } = useGetLablesLIstQuery();

  const [labelList, setLabelList] = useState<LabelDict>();
  const [filter, setFilter] = useState<string>('');
  const [filterLabelList, setFilterLabelList] = useState<LabelDict>();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value !== '') {
      let labelDataList: LabelDict = {};
      Object.values(labelList).map((item) => {
        if (item.name.includes(value)) {
          labelDataList[item.name] = {
            id: item.id,
            color: item.color,
            name: item.name,
            selected: item.selected
          };
        }
      });

      setFilterLabelList(labelDataList);
    }
  };

  useEffect(() => {
    console.log('update ');
    if (allLabels?.result === 'success') {
      console.log('allLabels :>> ', allLabels);
      const response = allLabels as GetLablesListResponse;
      let labelDataList: LabelDict = {};
      Object.values(response.data).map((item, i) => {
        labelDataList[item.name] = {
          id: item.id,
          color: item.color,
          name: item.name,
          selected: false
        };
      });

      selectedLabels?.map((item) => {
        if (labelDataList[item.label]) {
          labelDataList[item.label].selected = true;
        }
      });
      setLabelList(labelDataList);
      console.log('labelDataList :>> ', labelDataList);
    }
  }, [allLabels, selectedLabels]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="space-y-2">
      <div>
        ラベル{' '}
        <Popover
          arrow={false}
          content={
            <div>
              {labelList && (
                <div className="space-y-2">
                  <Input value={filter} onChange={(e) => handleFilterChange(e.target.value)} />
                  {filter !== '' ? (
                    // only display while have filter
                    <div>
                      {filterLabelList && Object.values(filterLabelList).length > 0 && (
                        <div>
                          {Object.values(filterLabelList).map((item, index) => (
                            <div
                              key={item.id}
                              className={
                                (isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-300') +
                                ' flex items-center truncate gap-1  cursor-pointer rounded-md p-1'
                              }
                              onClick={() =>
                                handleLabelSelect(item.name, item.color, item.selected)
                              }
                            >
                              <div
                                className="w-[30px] h-[30px] rounded-full flex justify-center items-center"
                                style={{ backgroundColor: item.color }}
                              >
                                {item.selected && <FaCheck />}
                              </div>
                              {item.name}
                            </div>
                          ))}
                        </div>
                      )}

                      {(filterLabelList === undefined ||
                        Object.values(filterLabelList).length === 0) && <Empty />}
                    </div>
                  ) : (
                    <div>
                      {Object.values(labelList).map((item, index) => (
                        <div
                          key={item.id}
                          className={
                            (isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-300') +
                            ' flex items-center truncate gap-1  cursor-pointer rounded-md p-1'
                          }
                          onClick={() => handleLabelSelect(item.name, item.color, item.selected)}
                        >
                          <div
                            className="w-[30px] h-[30px] rounded-full flex justify-center items-center"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.selected && <FaCheck />}
                          </div>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          }
          trigger={'click'}
          placement="topLeft"
        >
          <Button icon={<PlusOutlined />} shape="circle" size="small" />
        </Popover>
      </div>

      <div className="flex flex-wrap gap-1">
        {selectedLabels?.map((item, index) => (
          <div
            key={index}
            style={{ backgroundColor: item.value }}
            className="flex flex-wrap justify-between items-center text-xs rounded-md p-1"
          >
            {item.label}
            <div className="cursor-pointer" onClick={() => handleTagClose(item.label, item.value)}>
              <IoCloseSharp style={{ paddingTop: 2 }} size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkuLabelInput;
