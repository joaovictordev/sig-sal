import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

export default function DrawerToggleComponent() {
  const dispatch = useDispatch();

  function showDrawer() {
    dispatch({ type: 'SHOW_DRAWER'})
  }

  const buttonStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    border: 0
  }

  return(
    <Button 
      icon="menu" 
      onClick={showDrawer} 
      style={buttonStyle}
    />
  );
}