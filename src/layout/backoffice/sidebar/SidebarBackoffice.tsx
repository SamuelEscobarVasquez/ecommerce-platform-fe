import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const MyDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    marginTop: theme.spacing(8),
  },
}))

export function SidebarBackoffice() {
  return (
    <MyDrawer variant="permanent">
      <List>
        <ListItemButton component={NavLink} to="/backoffice/products">
          <ListItemIcon><Inventory2Icon /></ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItemButton>
      </List>
    </MyDrawer>
  );
}