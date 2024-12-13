"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeviceBorrowTable from './equipmentborrowrequests/equipmentborrowtable';
import RoomBorrowTable from './classroomborrowrequests/classroomborrowtable';
import BorrowEquipmentFilters from './equipmentborrowrequests/equipmentborrowrequestfilters';
import CreateBorrowEquipmentRequest from './equipmentborrowrequests/createequipmentborrowrequests/create-equipmentborrow';
import ClassroomBorrowFilters from './classroomborrowrequests/classroomborrowrequestfilters';
import CreateBorrowRoomRequest from './classroomborrowrequests/createclassroomrequest/create-classroom-request';
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
          <Box  sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
      }} >
          <BorrowEquipmentFilters/>
          <CreateBorrowEquipmentRequest/>
          </Box>
          <DeviceBorrowTable />
        </TabPanel>
        <TabPanel value="2">
        <Box  sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
      }} >
          <ClassroomBorrowFilters/>
          <CreateBorrowRoomRequest/>
          </Box>
          <RoomBorrowTable />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default BorrowRequestTabs;
