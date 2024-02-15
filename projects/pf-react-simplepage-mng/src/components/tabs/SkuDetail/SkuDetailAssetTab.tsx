import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Collapse, Card, Upload } from 'antd';

const { Panel } = Collapse;

const SkuDetailAssetTab = () => {
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isFileSelectionModalVisible, setFileSelectionModalVisible] = useState(false);
  const [isUrlAdditionModalVisible, setUrlAdditionModalVisible] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState('');

  const showRegisterModal = (assetType) => {
    setSelectedAssetType(assetType);
    setRegisterModalVisible(true);
  };

  const showFileSelectionModal = () => {
    setFileSelectionModalVisible(true);
  };

  const showUrlAdditionModal = () => {
    setUrlAdditionModalVisible(true);
  };

  const handleCancel = () => {
    setRegisterModalVisible(false);
  };

  const handleFileSelectionCancel = () => {
    setFileSelectionModalVisible(false);
  };

  const handleUrlAdditionCancel = () => {
    setUrlAdditionModalVisible(false);
  };

  const handleKeep = (values) => {
    setAssetList([...assetList, { ...values, type: selectedAssetType }]);
    setRegisterModalVisible(false);
  };

  const handleFileUpload = (file) => {
    // Handle file upload logic
    console.log('File uploaded:', file);
    setFileSelectionModalVisible(false);
  };

  const handleUrlConfirmation = () => {
    // Handle URL confirmation logic
    setUrlAdditionModalVisible(false);
  };

  const renderAssetGrid = (type) => {
    return assetList
      .filter((asset) => asset.type === type)
      .map((asset, index) => (
        <div key={index}>
          {/* Display Asset information and buttons */}
          <div>
            <span>{asset.name}</span>
            <span>{asset.id}</span>
            <span>{asset.extension}</span>
            <Card style={{ width: 200 }}>
              <Button onClick={showFileSelectionModal}> Select and Add Files </Button>
              <Button onClick={showUrlAdditionModal}> Add from URL </Button>
            </Card>
          </div>
        </div>
      ));
  };

  return (
    <div>
      {/* Asset Dropdown */}
      <Collapse accordion>
        <Panel header="Image" key="image">
          {/* Image Grid */}
          {renderAssetGrid('image')}

          {/* Plus Icon to add new asset */}
          <div
            onClick={() => showRegisterModal('image')}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          >
            <Card
              style={{
                width: 200,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlusOutlined style={{ fontSize: 40 }} />
            </Card>
          </div>
        </Panel>

        {/* Panels for other asset types */}
        <Panel header="PDF" key="pdf">
          {/* PDF Grid */}
          {renderAssetGrid('pdf')}
          {/* Plus Icon to add new asset */}
          <div
            onClick={() => showRegisterModal('pdf')}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          >
            <Card
              style={{
                width: 200,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlusOutlined style={{ fontSize: 40 }} />
            </Card>
          </div>
        </Panel>

        {/* Panel for Movie */}
        <Panel header="Movie" key="movie">
          {renderAssetGrid('movie')}
          <div
            onClick={() => showRegisterModal('movie')}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          >
            <Card
              style={{
                width: 200,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlusOutlined style={{ fontSize: 40 }} />
            </Card>
          </div>
        </Panel>

        {/* Panel for Audio */}
        <Panel header="Audio" key="audio">
          {renderAssetGrid('audio')}
          <div
            onClick={() => showRegisterModal('audio')}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          >
            <Card
              style={{
                width: 200,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlusOutlined style={{ fontSize: 40 }} />
            </Card>
          </div>
        </Panel>

        {/* Panel for Office */}
        <Panel header="Office" key="office">
          {renderAssetGrid('office')}
          <div
            onClick={() => showRegisterModal('office')}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          >
            <Card
              style={{
                width: 200,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlusOutlined style={{ fontSize: 40 }} />
            </Card>
          </div>
        </Panel>

        {/* Panel for Others */}
        <Panel header="Others" key="others">
          {renderAssetGrid('others')}
          <div
            onClick={() => showRegisterModal('others')}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          >
            <Card
              style={{
                width: 200,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlusOutlined style={{ fontSize: 40 }} />
            </Card>
          </div>
        </Panel>
      </Collapse>

      {/* Register Modal */}
      <Modal
        title={`Registering ${selectedAssetType.charAt(0).toUpperCase() + selectedAssetType.slice(1)} Assets`}
        visible={isRegisterModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="keep" type="primary" onClick={handleKeep}>
            Keep
          </Button>
        ]}
      >
        <Input placeholder="Asset Name" />
        <Input placeholder="Asset ID" />
        <Input placeholder="Asset Extension" />
      </Modal>

      {/* File Selection Modal */}
      <Modal
        title="Select and Add Files"
        visible={isFileSelectionModalVisible}
        onCancel={handleFileSelectionCancel}
        footer={[
          <Button key="cancel" onClick={handleFileSelectionCancel}>
            Cancel
          </Button>
        ]}
      >
        <Upload customRequest={({ file }) => handleFileUpload(file)} showUploadList={false}>
          <Button>Click to Upload</Button>
        </Upload>
      </Modal>

      {/* URL Addition Modal */}
      <Modal
        title="Add file from URL"
        visible={isUrlAdditionModalVisible}
        onCancel={handleUrlAdditionCancel}
        footer={[
          <Button key="cancel" onClick={handleUrlAdditionCancel}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleUrlConfirmation}>
            Confirmation
          </Button>
        ]}
      >
        <Input placeholder="http://" />
      </Modal>
    </div>
  );
};

export default SkuDetailAssetTab;
