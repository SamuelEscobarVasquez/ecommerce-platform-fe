import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import styles from './SidebarBackoffice.module.scss';

export function SidebarBackoffice() {
  return (
    <Drawer variant="permanent" className={styles.drawer}>
      <List>
        <ListItemButton component={NavLink} to="/backoffice/products">
          <ListItemIcon><Inventory2Icon /></ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}