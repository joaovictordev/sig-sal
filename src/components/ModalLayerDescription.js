import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Descriptions, Icon } from 'antd';

const { Item } = Descriptions;

export default function ModalLayerDescription() {
  const layerDescriptionVisible = useSelector(state => state.layerDescriptionVisible);
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
    dispatch({ type: 'CLOSE_LAYER_DESCRIPTION'})
  }

  // Gerando template
  function generateTitle() {
    return (
      <>
        Descrição do Layer
        <Icon 
          type="close" 
          onClick={handleCancel}
          style={styles.modal.header.icon}
        />
      </>
    );
  }
  return (
    <Modal
      footer={null}
      visible={layerDescriptionVisible}
      centered
      closable={false}
      title={generateTitle()}
    >
      <Descriptions column={1} >
        <Item label="Títutlo" >Layer1</Item>
        <Item label="Geometria">Polygon</Item>
        <Item label="Criado em">24 de Dezembro de 2019</Item>
        <Item label="Última alteração">24 de Dezembro de 2019</Item>
        <Item label="Privacidade"> Público </Item>
      </Descriptions>
    </Modal>
  );
}