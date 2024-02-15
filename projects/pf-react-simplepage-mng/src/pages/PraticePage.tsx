import { ProtectedRoute } from '../components';
import { useAppSelector } from '../store/store';
import '../css/homepage.css';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { GoPlus } from 'react-icons/go';
import { CiBoxList } from 'react-icons/ci';
import React, { useState } from 'react';
import ConstomTable from '../components/tables/tables';
import type { GetProp, TableProps } from 'antd';
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineFileDownload } from 'react-icons/md';
import { CiCircleMinus } from 'react-icons/ci';
import { CgEnter } from 'react-icons/cg';

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
  status: string;
}

const PraticePage = () => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------

  const [status, setStatus] = useState(false);
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  const [selectedOption, setSelectedOption] = useState('cassette');
  const handleBulkDataFileChange = (event: any) => {
    const file = event.target.files[0];
    setBulkDataFile(file);
  };

  const handleImportDataFileChange = (event: any) => {
    const file = event.target.files[0];
    setImportDataFile(file);
  };
  const [selectedOptiontable, setSelectedOptionTable] = useState('cassette');

  const handleButtonClick = (option: string) => {
    setSelectedOption(option);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'image',
      dataIndex: 'name'
    },
    {
      title: 'cassette',
      dataIndex: 'age'
    },
    {
      title: 'Belonging category',
      dataIndex: 'address'
    },
    {
      title: 'status',
      dataIndex: 'status'
    }
  ];

  const columnsSku: ColumnsType<DataType> = [
    {
      title: 'product',
      dataIndex: 'name'
    },
    {
      title: 'name',
      dataIndex: 'age'
    },
    {
      title: 'others',
      dataIndex: 'address'
    },
    {
      title: 'status',
      dataIndex: 'status'
    }
  ];

  const data: DataType[] = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      name: 'John Brown',
      age: Number(`${i}2`),
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      status: 'working'
    });
  }

  const dataSku: DataType[] = [];
  for (let i = 1; i <= 10; i++) {
    dataSku.push({
      key: i,
      name: 'John Brown',
      age: Number(`${i}2`),
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      status: 'working'
    });
  }

  // ------------------------------------------------------------------------------
  // functions
  // Options for the dropdown
  const options = ['Option 1', 'Option 2', 'Option 3'];

  // Event handler for option selection
  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const [bulkDataFile, setBulkDataFile] = useState(null);
  const [importDataFile, setImportDataFile] = useState(null);

  const handleBulkDataUpload = () => {
    // Handle the upload logic for bulk data file
    if (bulkDataFile) {
      // Perform the upload logic
      console.log('Uploading bulk data file:', bulkDataFile);
    } else {
      // Handle the case when no file is selected
      console.error('No file selected for bulk data upload');
    }
  };

  const handleImportDataUpload = () => {
    // Handle the upload logic for import data file
    if (importDataFile) {
      // Perform the upload logic
      console.log('Uploading import data file:', importDataFile);
    } else {
      // Handle the case when no file is selected
      console.error('No file selected for import data upload');
    }
  };

  return (
    <ProtectedRoute>
      <div
        style={{
          backgroundColor: 'whitesmoke',
          color: themeColor.gray[700],
          // border: "2px solid red",
          padding: '10px',
          display: 'flex',
          flexDirection: 'column', // Adjusted to column layout
          fontSize: '2rem'
        }}
        className="w-full h-full"
      >
        {/* Header */}
        <div className="header-container">
          <div
            className="left-header-buttons"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <button
              className={`header-button-table ${selectedOption === 'cassette' ? 'selected' : ''}`}
              style={{ border: '0px' }}
              onClick={() => handleButtonClick('cassette')}
            >
              Cassette
            </button>
            <button
              className={`header-button-table ${selectedOption === 'sku' ? 'selected' : ''}`}
              style={{ border: '0px' }}
              onClick={() => handleButtonClick('sku')}
            >
              SKU
            </button>
          </div>
          <div
            className="right-header-buttons"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <label htmlFor="uploadBulkFiles" className="header-button">
              <span style={{ marginRight: '10px' }}>
                <IoCloudUploadOutline />
              </span>
              <span>Upload Bulk Data</span>
            </label>
            <input
              id="uploadBulkFiles"
              type="file"
              style={{ display: 'none' }}
              onChange={handleBulkDataFileChange}
            />

            <label htmlFor="uploadBulkFiles" className="header-button">
              <span style={{ marginRight: '10px' }}>
                <IoCloudUploadOutline />
              </span>
              <span>Import Data</span>
            </label>
            <input
              id="uploadBulkFiles"
              type="file"
              style={{ display: 'none' }}
              onChange={handleBulkDataFileChange}
            />

            {selectedOption === 'cassette' && (
              <button className="header-button">
                <span style={{ marginRight: '10px' }}>
                  <GoPlus />
                </span>
                <span>New Cassette Registration</span>
              </button>
            )}
          </div>
        </div>
        <div className="header-container">
          <div
            className="left-header-buttons"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>
              {/* <label htmlFor="dropdown">Select an option:</label> */}
              <select
                id="dropdown"
                value={selectedOption}
                onChange={handleSelectChange}
                className="dropdown"
              >
                <option value="">Filter By Category</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* 
              {selectedOption && <p>You selected: {selectedOption}</p>} */}
            </div>
          </div>
          <div
            className="right-header-buttons"
            style={{
              // marginLeft: "50%",
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className="delRemoveDownloadButtons" style={{}}>
              <span style={{ height: '50px', marginRight: '10px' }}>
                <MdOutlineFileDownload />
              </span>
              <span style={{ height: '50px', marginRight: '10px' }}>
                <CiCircleMinus />
              </span>
              <span style={{ height: '50px', marginRight: '10px' }}>
                <RiDeleteBin6Line />
              </span>
            </div>
            <button className="header-button">
              <span style={{ marginRight: '10px' }}>
                <IoCloudUploadOutline />
              </span>
              <span>Upload Bulk Data</span>
            </button>
            <button className="header-button">
              <span style={{ marginRight: '10px' }}>
                <IoCloudUploadOutline />
              </span>
              <span>Show deleted</span>
            </button>
            <button className="header-button">
              <span style={{ marginRight: '10px' }}>
                <CiBoxList />
              </span>
              <span>display list</span>
            </button>
          </div>
        </div>
        {/* <ConstomTable externalData={data} columnNames={columns} /> */}
        {selectedOption === 'cassette' && (
          <ConstomTable
            externalData={data}
            columnNames={columns}
            // onStatusCheckBoxChange={status}
          />
        )}

        {selectedOption === 'sku' && (
          <ConstomTable
            externalData={dataSku}
            columnNames={columnsSku}
            // onStatusCheckBoxChange={status}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default PraticePage;
