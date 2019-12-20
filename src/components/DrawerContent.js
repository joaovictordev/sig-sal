import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Radio, Divider, List, Avatar, Checkbox } from 'antd';

const { Panel } = Collapse;
const { Item } = List;
const { Meta } = Item;

export default function TabLayers() {

  const baseLayerActive = useSelector(state => state.baseLayerActive);
  const overlaysActive = useSelector(state => state.overlayActive);
  const dispatch = useDispatch();

  console.log(baseLayerActive)
  console.log(overlaysActive)
  
  // Actions do Redux
  function changeBaseLayer(e) {
    dispatch({type: 'CHANGE_BASELAYER', baseLayerActive: e.target.value})
  }

  function changeOverlays(e) {
    if (e.target.checked) {
      dispatch({ type: 'CHANGE_OVERLAYS', overlaysActive: e.target.value})
    } else {
      const index = overlaysActive.indexOf(e.target.value)
      overlaysActive.splice(index,1)
      dispatch({ type: 'CHANGE_OVERLAYS', overlaysActive })
    }
  }

  function showLayerDescription() {
    dispatch({type: 'SHOW_LAYER_DESCRIPTION'})
  }

  // layers
  const baseMaps = ['Streets', 'Satellite'];

  const groupLayers = [
    { name: "Grupo 1", layers: [{id: 1, name: "layer1", type: "Polygon"}, {id: 2, name: "layer2", type: "Point"}]},
    { name: "Grupo 2", layers: [{id: 3, name: "layer3", type: "Line"}, {id: 4, name: "layer4", type: "Polygon"}]}
  ]

  // Estilos
  const styles = {
    collapse:{
      marginTop: "20px"
    },
    headerLayers: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }

  // Gerando templates
  function generateBaseMaps(baseMaps) {
    const baseMapsList = baseMaps.map( 
      baseMap => (<Radio.Button value={baseMap} key={baseMap}>{baseMap}</Radio.Button>
      )
    );

    return baseMapsList;
  }

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
        case "Polygon":
          avatarStyle = { backgroundColor: '#7159d1' }
          break;
        default:
          avatarStyle = {}
      }

      return avatarStyle;
    }

    const layersList = layers.map( 
      layer => (
        <Item key={layer.id}>
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

  function generateGroupLayers(groupLayers) {
    const groupLayersList = groupLayers.map(
      groupLayer => (
        <Panel 
          header={groupLayer.name}
          key={groupLayer.name}
        >
          <List>
            { generateLayers(groupLayer.layers) }
          </List>
        </Panel>
      ) 
    );
    
    return groupLayersList;
  };
  
  return (
    <>
    <Radio.Group 
      onChange={changeBaseLayer} 
      defaultValue={baseLayerActive}
      buttonStyle="solid"
    >
      {generateBaseMaps(baseMaps)}
    </Radio.Group>
    <Divider />
    <div style={styles.headerLayers}>
      <span>Mapas Temáticos</span>
    </div>
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition="left"
      style={styles.collapse}
    >
      {generateGroupLayers(groupLayers)}
    </Collapse>
    </>
  );
}