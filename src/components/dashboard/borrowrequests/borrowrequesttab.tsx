"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeviceBorrowTable from './equipmentborrowrequests/equipmentborrowtable';
import RoomBorrowTable from './classroomborrowrequests/classroomborrowtable';

function BorrowRequestTabs(): React.JSX.Element  {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Lab Tabs Example">
            <Tab label="Mượn trả thiết bị" value="1" />
            <Tab label="Mượn trả phòng" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DeviceBorrowTable />
        </TabPanel>
        <TabPanel value="2">
          <RoomBorrowTable />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default BorrowRequestTabs;
