import React, { useEffect, useState } from 'react';
import { Button, Drawer, Input, Select, DatePicker, Modal, Menu, Dropdown } from 'antd';
import { AiOutlineClose, AiOutlineFilter } from 'react-icons/ai';
import moment from 'moment';
import { useGetFilteredBlockListMutation } from '../../services/blockApi';
import { GetFilteredBlockListRequest } from '../../types/api/block';

const { Option } = Select;

type SearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  updateApiData: React.Dispatch<React.SetStateAction<any[]>>;
  userData: {
    uuid: string;
    user_id: string;
    firstname: string;
    lastname: string;
    is_super: number;
  };
};

const SearchDrawer = ({ isOpen = false, onClose, updateApiData }: SearchDrawerProps) => {
  const [currentStep, setCurrentStep] = useState<'main' | 'condition' | 'result'>('main');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<Array<{ item: string; condition: string; date?: Date }>>(
    []
  );
  const [logicalOperator, setLogicalOperator] = useState<'AND' | 'OR'>('AND');
  const [invokeFilterVisible, setInvokeFilterVisible] = useState(false);
  const [saveFilterVisible, setSaveFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false);
  const [getFilteredBlockList, { data, error, isLoading, isError }] =
    useGetFilteredBlockListMutation();

  const [apiData, setApiData] = useState<Array<any>>([]);
  const [filteredData, setFilteredData] = useState<Array<any>>([]);

  const handleCreateSearchCondition = () => {
    setCurrentStep('condition');
  };

  const handleAddFilter = () => {
    if (selectedItem && selectedCondition) {
      setFilters([
        ...filters,
        { item: selectedItem, condition: selectedCondition, date: selectedDate }
      ]);
      setSelectedItem(null);
      setSelectedCondition(null);
      setSelectedDate(null);
      setCurrentStep('result');
    }
  };

  const handleDeleteCondition = (index: number) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleDeleteAllConditions = () => {
    setFilters([]);
  };

  const handleLogicalOperator = (operator: 'AND' | 'OR') => {
    setLogicalOperator(operator);
    setCurrentStep('condition');
  };

  const handleGoBack = () => {
    if (currentStep === 'result') {
      setCurrentStep('condition');
    } else if (currentStep === 'condition') {
      setCurrentStep('main');
    }
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date?.toDate() || null);
  };

  const handleInvokeFilter = () => {
    setInvokeFilterVisible(true);
  };

  const handleSaveFilter = (filterName: string) => {
    setSelectedFilter(filterName);
    setInvokeFilterVisible(false);
  };

  const handleCloseInvokeFilter = () => {
    setInvokeFilterVisible(false);
    setIsFilterDropdownVisible(false);
  };

  const handleCloseSaveFilter = () => {
    setSaveFilterVisible(false);
  };

  const handleFilterDropdownVisibleChange = (visible: boolean) => {
    setFilterDropdownVisible(visible);
  };

  const handleToggleFilterDropdown = () => {
    setIsFilterDropdownVisible(!isFilterDropdownVisible);
    if (!isFilterDropdownVisible) {
      // If the dropdown is being opened, reset the selected filter
      setSelectedFilter(null);
    }
  };

  // const filterMenu = (
  //   <Menu onClick={onClick}>
  //     <Menu.Item key="filter1">Filter 1</Menu.Item>
  //     <Menu.Item key="filter2">Filter 2</Menu.Item>
  //     <Menu.Item key="filter3">Filter 3</Menu.Item>
  //     {/* Add more filters as needed */}
  //   </Menu>
  // );

  const handleFilterMenuClick = (e: any) => {
    setSelectedFilter(e.key);
    setInvokeFilterVisible(false);
    setIsFilterDropdownVisible(false);
  };

  const handleToggleFilterButtonClick = () => {
    setIsFilterDropdownVisible(true); // Open the dropdown
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick}>
      <Menu.Item key="filter1">Filter 1</Menu.Item>
      <Menu.Item key="filter2">Filter 2</Menu.Item>
      <Menu.Item key="filter3">Filter 3</Menu.Item>
      {/* Add more filters as needed */}
    </Menu>
  );

  const handleSearch = async () => {
    try {
      const requestBody: GetFilteredBlockListRequest = {
        body: {
          is_series: true,
          items: filters
        },
        queryParam: {
          offset: 0,
          pagination: 10,
          sort: 'series',
          order: 'asc',
          state: 2
        }
      };

      const response = await getFilteredBlockList(requestBody);

      console.log('API response:', response);

      if ('data' in response) {
        const responseData = response.data.detailProduct || [];

        if (Array.isArray(responseData)) {
          setFilteredData(responseData);

          if (typeof updateApiData === 'function') {
            updateApiData(responseData);
          }
        } else {
          console.error('Invalid API response:', response);
        }
      } else {
        console.error('Invalid API response:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Drawer
      title="Advanced Search"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isOpen}
      width={400}
    >
      {/* Back button */}
      {currentStep !== 'main' && (
        <Button onClick={handleGoBack} style={{ marginBottom: 8 }}>
          Back
        </Button>
      )}

      {/* Filter buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button
          type="link"
          icon={<AiOutlineFilter />}
          onClick={handleInvokeFilter}
          style={{ marginRight: 8 }}
        >
          Invoke Filter
        </Button>
        <Button
          type="link"
          icon={<AiOutlineFilter />}
          onClick={() => setSaveFilterVisible(true)}
          style={{ marginRight: 8 }}
        >
          Save Filter
        </Button>
      </div>

      {currentStep === 'main' && (
        <>
          {/* Main screen */}
          <Button type="primary" onClick={handleCreateSearchCondition} style={{ marginBottom: 16 }}>
            Create Search Condition
          </Button>
        </>
      )}

      {currentStep === 'condition' && (
        <>
          {/* Search condition screen */}
          <div style={{ marginBottom: 16 }}>
            <Select
              showSearch
              placeholder="Item Search Field"
              optionFilterProp="children"
              filterOption={(input, option: React.ReactElement) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={selectedItem || undefined}
              onChange={(value) => setSelectedItem(value)}
              style={{ width: '100%' }}
            >
              <Option value="item1">Item 1</Option>
              <Option value="item2">Item 2</Option>
              <Option value="item3">Item 3</Option>
              <Option value="item4">Item 4</Option>
              <Option value="item5">Item 5</Option>
              <Option value="item6">Item 6</Option>
              <Option value="item7">Item 7</Option>
              <Option value="item8">Item 8</Option>
              <Option value="item9">Item 9</Option>
              <Option value="item10">Item 10</Option>
              <Option value="item11">Item 11</Option>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Select
              showSearch
              placeholder="Select Condition"
              style={{ width: '100%' }}
              optionFilterProp="children"
              filterOption={(input, option: React.ReactElement) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={selectedCondition}
              onChange={(value) => setSelectedCondition(value)}
            >
              <Option value="equal">Equal</Option>
              <Option value="notEqual">Not equal</Option>
              <Option value="is set">is Set</Option>
              <Option value="not set">not Set</Option>
              <Option value="smaller than">Smaller than</Option>
              <Option value="below">Below</Option>
              <Option value="bigger">Bigger</Option>
              <Option value="that's all">That's all</Option>
              <Option value="include">Include</Option>
              <Option value="not included">Not included</Option>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <DatePicker
              placeholder="Select Date"
              style={{ width: '100%' }}
              value={selectedDate ? moment(selectedDate) : null}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <Button type="primary" onClick={handleAddFilter}>
              Add Filter
            </Button>
          </div>
        </>
      )}

      {currentStep === 'result' && (
        <>
          {/* Result screen */}
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching data</p>}
          {Array.isArray(filteredData) ? (
            filteredData.map((item, index) => (
              <div key={index}>
                {/* Display your fetched data here */}
                {/* Adjust this based on your actual data structure */}
                <p>{item.property1}</p>
                <p>{item.property2}</p>
                {/* ... (display other properties) */}
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
          <Button onClick={() => setFilters([])} style={{ marginBottom: 16 }}>
            Delete All Conditions
          </Button>
          <div>
            <Button
              type="primary"
              onClick={() => setLogicalOperator('AND')}
              style={{ marginRight: 8 }}
            >
              AND
            </Button>
            <Button type="primary" onClick={() => setLogicalOperator('OR')}>
              OR
            </Button>
          </div>

          {/* Add Search button */}
          <Button type="primary" onClick={handleSearch} style={{ marginTop: 16 }}>
            Search
          </Button>
        </>
      )}

      {/* Close button */}
      <Button
        type="primary"
        icon={<AiOutlineClose />}
        onClick={() => {
          onClose();
        }}
        style={{ position: 'absolute', bottom: 16 }}
      >
        Close
      </Button>

      {/* Invoke Filter Modal */}
      <Modal
        title="Invoke Filter"
        visible={invokeFilterVisible}
        onOk={() => handleSaveFilter(selectedFilter || '')}
        onCancel={handleCloseInvokeFilter}
        footer={[
          <Button key="cancel" onClick={handleCloseInvokeFilter}>
            Cancel
          </Button>,
          <Button
            key="select"
            type="primary"
            onClick={() => handleSaveFilter(selectedFilter || '')}
          >
            Call
          </Button>
        ]}
      >
        <p>Select the filter to make the call.</p>
        <div style={{ marginBottom: 16 }}>
          <Select
            showSearch
            placeholder="Search your filter"
            optionFilterProp="children"
            filterOption={(input, option: React.ReactElement) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={selectedItem || undefined}
            onChange={(value) => setSelectedItem(value)}
            style={{ width: '100%' }}
          >
            <Option value="filter1">Filter 1</Option>
            <Option value="filter2">Filter 2</Option>
            <Option value="filter3">Filter 3</Option>
            {/* Add more options as needed */}
          </Select>
        </div>
      </Modal>

      {/* Save Filter Modal */}
      <Modal
        title="Register Filters"
        visible={saveFilterVisible}
        onOk={handleCloseSaveFilter}
        onCancel={handleCloseSaveFilter}
        footer={[
          <Button key="cancel" onClick={handleCloseSaveFilter}>
            Cancel
          </Button>,
          <Button key="keep" type="primary" onClick={handleCloseSaveFilter}>
            Keep
          </Button>
        ]}
      >
        <p>Enter filter name:</p>
        <Input
          placeholder="Filter Name"
          style={{ marginBottom: 16 }}
          onChange={(e) => setSelectedFilter(e.target.value)}
        />
        <Button type="primary" onClick={handleCloseSaveFilter}>
          Update Registration
        </Button>
      </Modal>
    </Drawer>
  );
};

export default SearchDrawer;
