import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Descriptions, Icon } from 'antd';

const { Item } = Descriptions;

export default function ModalFeatureProperties() {
  const featurePropertiesVisible = useSelector(state => state.featurePropertiesVisible);
  const featureProperties = useSelector(state => state.featureProperties);
  const dispatch = useDispatch();

  // Estilos
  const styles = {
    modal: {
      header: {
        icon: {
          float: "right"
        }
      }
    }
  }

  // Actions do Redux
  function handleCancel() {
    dispatch({ type: 'CLOSE_FEATURE_PROPERTIES'})
  }

  // Gerando template
  function generateTitle() {
    return (
      <>
        Descrição da Feature
        <Icon 
          type="close" 
          onClick={handleCancel}
          style={styles.modal.header.icon}
        />
      </>
    );
  }

  function generateProperties(featureProperties){
    const renderProperties = Object.keys(featureProperties).map(function(key) {
      return (
      <Item 
        label={key}
        key={key}
      >
        {featureProperties[key]}
      </Item>
      );
    });

    return renderProperties;
  }
  return (
    <Modal
      footer={null}
      visible={featurePropertiesVisible}
      centered
      closable={false}
      title={generateTitle()}
      mask={false}
    >
      <Descriptions column={1} >
        {generateProperties(featureProperties)}
      </Descriptions>
    </Modal>
  );
}