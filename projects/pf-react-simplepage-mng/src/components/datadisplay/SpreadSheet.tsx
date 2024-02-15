import React, { useEffect, useRef, useState } from 'react';
import Spreadsheet, { DataViewer, DataViewerComponent } from 'react-spreadsheet';
import { Attributes } from '../../types/app/attributes';
import { Button, Checkbox, DatePicker, Input, InputNumber, Radio, Select } from 'antd';
import { SheetColumn, SheetRow } from '../../types/app/spreadsheet';
import TextArea from 'antd/es/input/TextArea';
enum InputType {
  SINGLE_LINE = '0',
  MULTI_LINE = '1',
  COMBO_INPUT = '2',
  RADIO_INPUT = '3',
  CHECKBOX_INPUT = '4',
  NUMBER_INPUT = '5',
  DATE_INPUT = '6'
}

type Props = {
  uncommonAttributes: Attributes[] | null;
  SelectedData?: (e: SheetRow[]) => void;
};
const SpreadSheet = ({ uncommonAttributes, SelectedData }: Props) => {
  let container = [];
  for (let i = 0; i < 10; i++) {
    container.push('1');
  }
  enum Enum {
    type1,
    type2,
    type3
  }
  type Type = {
    input: Enum;
  };
  const columnLabels = uncommonAttributes.map((attribute, i) => {
    return attribute.name;
  });
  const rowLabels = container.map((item, i) => (i + 1).toString());
  const [data, setdata] = useState<SheetRow[]>();
  useEffect(() => {
    setdata(data);
    SelectedData(data);
    console.log(data);
  }, [data]);

  useEffect(() => {
    let rows = [];
    container.map((item, rowIndex) => {
      let columns = [];
      uncommonAttributes.map((attribute) => {
        columns.push({ value: '' });
      });
      rows.push(columns);
    });
    setdata(rows);
  }, [uncommonAttributes]);

  const handleData = (row: number, column: number, value: string) => {
    console.log('object');
    if (!data) return;
    console.log('object');
    const newData = data;
    newData[row][column].value = value;
    setdata(newData);
    SelectedData(data);
  };
  return (
    <>
      <Spreadsheet
        className=" animate-none"
        DataViewer={({ column, row, setCellData, cell }, i) => {
          // if (uncommonAttributes[column].controlType === InputType.SINGLE_LINE) {
          //   return <div>jumanji</div>;
          // }
          if (!uncommonAttributes[column]) return null;
          switch (uncommonAttributes[column]?.controlType) {
            case InputType.SINGLE_LINE:
              return (
                <Input
                  className=" z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => handleData(row, column, e.target.value)}
                />
              );

              break;
            case InputType.MULTI_LINE:
              return (
                <TextArea
                  className=" z-10"
                  onChange={(e) => handleData(row, column, e.target.value)}
                ></TextArea>
              );
              break;
            case InputType.CHECKBOX_INPUT:
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" z-20 h-full w-full flex items-center justify-center"
                >
                  <Checkbox className=" z-10"></Checkbox>
                </div>
              );
              break;
            case InputType.COMBO_INPUT:
              return (
                <Select
                  className=" w-full z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
              );
              break;
            case InputType.RADIO_INPUT:
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" z-10  h-full flex items-center"
                >
                  <Radio.Group value={uncommonAttributes[column].value} className=" z-20">
                    {uncommonAttributes[column].selectList.map((option, i) => {
                      if (option !== '') {
                        return (
                          <Radio key={i} value={option}>
                            {option}
                          </Radio>
                        );
                      }
                    })}
                  </Radio.Group>
                </div>
              );
              break;
            case InputType.DATE_INPUT:
              return <DatePicker className=" z-10" />;
              break;
            case InputType.NUMBER_INPUT:
              return <InputNumber className=" z-10" />;
              break;
            default:
              break;
          }
        }}
        onChange={(e) => setdata(e)}
        data={data ?? [[{ value: '' }]]}
        columnLabels={columnLabels}
        rowLabels={rowLabels}
      />
    </>
  );
};

export default SpreadSheet;
