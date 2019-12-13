import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';

export default function DrawerComponent() {
  const dispatch = useDispatch();
  const drawerVisible = useSelector(state => state.drawerVisible);

  function closeDrawer() {
    dispatch({ type: 'CLOSE_DRAWER'})
  }

  return(
    <Drawer
      visible={drawerVisible}
      title="SIGSal"
      mask={false}
      onClose={closeDrawer}
      placement="left"
    >
    </Drawer>
  );
}