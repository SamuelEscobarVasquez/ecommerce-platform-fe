import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './HeaderPublic.module.scss';
import ElevationScroll from './ElevationScroll';
import { useNavigate } from 'react-router-dom';

export function HeaderPublic() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate('/products-list');
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  return (
    <ElevationScroll>
      <AppBar position="sticky" className={styles.appBar}>
        {/* Banner superior */}
        <Box component="section" role="banner" className={styles.topBanner}>
          <span>Haz más con tu bono 14.</span>
          <Link onClick={navigateToProducts} className={styles.bannerLink}>Compra aquí</Link>
        </Box>

        {/* Cabecera principal */}
        <Toolbar disableGutters className={styles.toolbar}>
          {/* Logos */}
          <Box className={styles.left}>
            <Link onClick={navigateToProducts} underline="none" className={styles.logoLink}>
              <img src="https://cemacogt.vtexassets.com/arquivos/CemacoLogo.png" alt="Cemaco" className={styles.logoImg} />
            </Link>
            <Link onClick={navigateToProducts} underline="none" className={styles.logoLink}>
              <img src="https://cemacogt.vtexassets.com/arquivos/juguetonLogoOficial.png" alt="Juguetón" className={styles.logoImg} />
            </Link>
          </Box>

          {/* Buscador */}
          <Box className={styles.center}>
            <Box className={styles.searchRoot}>
              <Box className={styles.searchIcon}><SearchIcon /></Box>
              <InputBase
                placeholder="Buscar productos…"
                classes={{
                  root: styles.searchInputRoot,
                  input: styles.searchInput,
                }}
                inputProps={{ 'aria-label': 'buscar' }}
              />
            </Box>
          </Box>

          {/* Enlaces y botones */}
          <Box className={styles.right}>
            <Box component="nav" role="navigation" className={styles.navLinks}>
              <Link onClick={navigateToLogin} className={styles.navLink}>Productos con suscripción</Link>
              <Link onClick={navigateToLogin} className={styles.navLink}>¿Eres empresa?</Link>
              <Link onClick={navigateToLogin} className={styles.navLink}>Tiendas</Link>
              <Link
                href="https://api.whatsapp.com/send/?phone=%2B50224999990"
                target="_blank" rel="noopener"
                className={styles.navLink}
              >
                Compra x WhatsApp
              </Link>
            </Box>
            <Box className={styles.icons}>
              <IconButton onClick={navigateToLogin} color="inherit"><PersonIcon /></IconButton>
              <IconButton onClick={navigateToLogin} color="inherit"><ShoppingCartIcon /></IconButton>
            </Box>
          </Box>
        </Toolbar>

        {/* Subnavegación */}
        <Box component="nav" role="navigation" className={styles.subNav}>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>Departamentos ▾</Link>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>Bodas y registros</Link>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>Revistas</Link>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>Privilegio</Link>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>★ Maco</Link>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>Entrega rápida</Link>
          <Link onClick={navigateToProducts} className={styles.subNavLink}>Retira en tiendas</Link>
        </Box>
      </AppBar>
    </ElevationScroll>
  );
}
