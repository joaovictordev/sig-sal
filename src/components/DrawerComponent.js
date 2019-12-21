import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';

import DrawerContent from './DrawerContent';

export default function DrawerComponent() {
  const dispatch = useDispatch();
  const drawerVisible = useSelector(state => state.drawerVisible);

  function closeDrawer() {
    dispatch({ type: 'CLOSE_DRAWER'})
  }

  return(
    <Drawer
      width={300}
      visible={drawerVisible}
      title="SIG-Sal"
      mask={false}
      onClose={closeDrawer}
      placement="left"
    >
      <DrawerContent />
    </Drawer>
  );
}