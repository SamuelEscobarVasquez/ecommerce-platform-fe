import { Outlet } from 'react-router-dom';
import { HeaderPublic } from './header/HeaderPublic';
import { FooterPublic } from './footer/FooterPublic';

export function PublicLayout() {
  return (
    <>
      <HeaderPublic />
      <main><Outlet/></main>
      <FooterPublic />
    </>
  );
}