import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { ClassroomEquipmentSearch } from './classroomequipmentsearch';

const classequipments = [
  {
    id: 'E-001',
    name: 'Máy chiếu',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity:40,
    brokenQuantity:5

  },
  {
    id: 'E-002',
    name: 'Loa JBL',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity:40,
    brokenQuantity:5

  },  {
    id: 'E-003',
    name: 'Mic',
    category: 'Phòng học',
    totalQuantity: 50,
    usableQuantity: 45,
    usingQuantity:40,
    brokenQuantity:5

  },  {
    id: 'E-004',
    name: 'Quả địa cầu',
    category: 'Hỗ trợ',
    totalQuantity: 40,
    usableQuantity: 39,
    usingQuantity:5,
    brokenQuantity:1
  },

]


function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.includes(value));
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

export default function ClassroomEquipments() {
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3 , 4, 5, 6,7]);
  const [right, setRight] = React.useState<readonly number[]>([0,1,2]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;


  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  
  const classEquipmentItem = () => (
    <Card>
      
    </Card>
  );

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} Được chọn`}
      />
       <ClassroomEquipmentSearch/>
      <List
        sx={{
          width: 420,
          height: 240,
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Thiết bị ${value + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
        <Card>
          <CardHeader title="Thông tin thiết bị" />
          <Grid
      container
      
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid item>{customList('Danh sách thiết bị', left)}
       
      </Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Thiết bị gắn tại phòng', right)}
      </Grid>
    </Grid>
    <CardActions sx={{ justifyContent: 'flex-end' }}>
    <Button variant="contained">Sửa</Button>
    <Button variant="contained">Lưu</Button>
    </CardActions>
        </Card>
  );
}
