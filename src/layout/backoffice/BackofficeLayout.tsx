import { Outlet } from "react-router-dom";
import { HeaderBackoffice } from "../../layout/backoffice/header/HeaderBackoffice";
import { SidebarBackoffice } from "../../layout/backoffice/sidebar/SidebarBackoffice";

export function BackofficeLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarBackoffice />
      <div style={{ flex: 1 }}>
        <HeaderBackoffice />
        <main><Outlet/></main>
      </div>
    </div>
  );
}