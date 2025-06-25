import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import styles from './FooterPublic.module.scss';

export function FooterPublic() {
  return (
    <footer className={styles.footerRoot} role="contentinfo">
      {/* — Top Bar */}
      <Box className={styles.topBar}>
        <Box className={styles.topItem}>
          <StorefrontIcon fontSize="small" />
          <Link href="/tiendas" className={styles.topLink}>Tiendas</Link>
        </Box>
        <Box className={styles.topItem}>
          <EmailIcon fontSize="small" />
          <Link href="mailto:tusamigos@cemaco.com" className={styles.topLink}>tusamigos@cemaco.com</Link>
        </Box>
        <Box className={styles.topItem}>
          <WhatsAppIcon fontSize="small" />
          <Link
            href="https://wa.me/50224999990"
            target="_blank"
            rel="noopener"
            className={styles.topLink}
          >
            Compra por WhatsApp
          </Link>
        </Box>
        <Box className={styles.topItem}>
          <PhoneIcon fontSize="small" />
          <Link href="tel:+50224999990" className={styles.topLink}>(502) 2499-9990</Link>
        </Box>
        <Box className={styles.topItem}>
          <ChatIcon fontSize="small" />
          <Link href="/chat" className={styles.topLink}>Chat en línea</Link>
        </Box>
      </Box>

      {/* — Main Columns */}
      <Box className={styles.mainSection}>
        <Box className={styles.column}>
          <h3>Servicios</h3>
          <ul>
            <li><Link href="/instalaciones">Instalaciones</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/tiendas">Tiendas</Link></li>
            <li><Link href="/privilegio">Privilegio</Link></li>
            <li><Link href="/servicio-empresas">Servicio a empresas</Link></li>
            <li><Link href="/bodas">Bodas</Link></li>
            <li><Link href="/actividades">Actividades</Link></li>
          </ul>
        </Box>

        <Box className={styles.column}>
          <h3>Nuestros valores</h3>
          <ul>
            <li><Link href="/sostenibilidad">Sostenibilidad</Link></li>
            <li><Link href="/garantia-total">Garantía total</Link></li>
            <li><Link href="/sistema-b">Sistema B</Link></li>
          </ul>
        </Box>

        <Box className={styles.column}>
          <h3>Venta en línea</h3>
          <ul>
            <li><Link href="/retirar-en-tienda">Retirar en tienda</Link></li>
            <li><Link href="/metodos-de-pago">Métodos de pago</Link></li>
            <li><Link href="/faq">Preguntas frecuentes</Link></li>
            <li><Link href="/app">Descargar aplicación</Link></li>
          </ul>
        </Box>

        <Box className={styles.column}>
          <h3>Grupo Cemaco</h3>
          <ul>
            <li><Link href="/unete">Únete a nuestro equipo</Link></li>
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link href="/proveedor">¿Deseas ser proveedor?</Link></li>
            <li><Link href="/jugueton">Juguetón</Link></li>
            <li><Link href="/bebe-jugueton">Bebé Juguetón</Link></li>
          </ul>
        </Box>

        <Box className={styles.column}>
          <h3>Empresa</h3>
          <Box className={styles.bCertified}>
            <span>Certificada</span>
          </Box>
          <Box className={styles.bDescription}>
            <strong>Somos una empresa B</strong>
            <p>
              Estamos orgullosos de ser reconocidos por los más altos estándares de sostenibilidad social y ambiental.
              <Link href="/conoce-mas" className={styles.conoceLink}>Conoce más</Link>
            </p>
          </Box>
        </Box>

        <Box className={styles.columnSubscribe}>
          <h3>Suscríbete</h3>
          <p>Recibe ofertas, beneficios y noticias</p>
          <Box className={styles.subscribeForm}>
            <InputBase
              placeholder="Ingresa tu email"
              className={styles.subscribeInput}
              inputProps={{ 'aria-label': 'email' }}
            />
            <Button variant="contained" className={styles.subscribeButton}>
              Suscribirme
            </Button>
          </Box>
        </Box>
      </Box>

      {/* — Bottom Bar */}
      <Box className={styles.bottomBar}>
        <Box className={styles.bottomLinks}>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos y condiciones</Link>
        </Box>
        <Box className={styles.socialIcons}>
          <Link href="https://www.tiktok.com" target="_blank"><img src="https://cemacogt.vtexassets.com/arquivos/iconotiktokcemaco.png" alt="TikTok" /></Link>
          <Link href="https://www.facebook.com" target="_blank"><img src="https://cemacogt.vtexassets.com/arquivos/FacebookFooterNew.png" alt="Facebook" /></Link>
          <Link href="https://www.instagram.com" target="_blank"><img src="https://cemacogt.vtexassets.com/arquivos/InstagramFooterNew.png" alt="Instagram" /></Link>
          <Link href="/chat"                    target="_blank"><img src="https://cemacogt.vtexassets.com/assets/vtex.file-manager-graphql/images/b8069eb9-5d31-44dd-b231-14ffe2dd7fda___bb8e2c32bae0674ffffb81549a434de6.png"  alt="WhatsApp" /></Link>
          <Link href="https://www.youtube.com"  target="_blank"><img src="https://cemacogt.vtexassets.com/arquivos/YouTubeFooterNew.png"   alt="YouTube" /></Link>
          <Link href="https://www.pinterest.com"target="_blank"><img src="https://cemacogt.vtexassets.com/arquivos/PinterestFooterNew.png" alt="Pinterest" /></Link>
        </Box>
      </Box>
    </footer>
  );
}
