import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Divider, List, Avatar, Checkbox } from 'antd';

const { Item } = List;
const { Meta } = Item;

export default function TabLayers() {

  const baseLayerActive = useSelector(state => state.baseLayerActive);
  const baseLayers = useSelector(state => state.baseLayers);
  const overlays = useSelector(state => state.overlays);
  const dispatch = useDispatch();

  // Actions do Redux
  function changeBaseLayer(e) {
    dispatch({type: 'CHANGE_BASELAYER', baseLayerActive: e.target.value})
  }

  function changeOverlays(e) {
    if (e.target.checked) {
      dispatch({ type: 'CHANGE_OVERLAYS_ADD', overlayToAdd: e.target.value})
    } else {
      dispatch({ type: 'CHANGE_OVERLAYS_REMOVE', overlayToRemove: e.target.value})
    }
  }

  function showLayerDescription() {
    dispatch({type: 'SHOW_LAYER_DESCRIPTION'})
  }

  // Gerando templates
  function generateLayers(layers) {
    function avatarStyle(geometryType) {

      let avatarStyle;

      switch (geometryType) {
        case "Point":
          avatarStyle = { color: "#f56a00", backgroundColor: "#fde3cf"};
          break;
        case "Line":
          avatarStyle = { backgroundColor: '#87d068' };
          break;
        case "FeatureCollection":
          avatarStyle = { backgroundColor: '#f00' }
          break;
        default:
          avatarStyle = {}
      }

      return avatarStyle;
    }

    const layersList = layers.map( 
      layer => (
        <Item key={layer.name}>
          <Meta
            avatar={
            <Avatar style={avatarStyle(layer.type)}>{layer.type}</Avatar>
            }
            title={layer.name}
            description = {
              <span 
                onClick={showLayerDescription} 
                style={{cursor: 'pointer', color: '#00f'}}
              >
                Descrição
              </span>
            }
          />
          <div>
            <Checkbox 
              onChange={changeOverlays}
              value={layer.name}
            >
            </Checkbox>
          </div>
        </Item>
      )
    );

    return layersList;
  };
  
  return (
    <>
    <Radio.Group 
      onChange={changeBaseLayer} 
      options={baseLayers}
      value={baseLayerActive}
    >
    </Radio.Group>
    <Divider>Mapas Temáticos</Divider>
    {generateLayers(overlays)}
    </>
  );
}