import * as React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function ClassroomEquipmentSearch(): React.JSX.Element {
  return (
    <div >
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Nhập số seri thiết bị"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '250px' }}
      />
    </div>
  );
}
