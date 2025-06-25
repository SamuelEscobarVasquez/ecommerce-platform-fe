import styles from './ProductCard.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { FeedbackSnackbar } from '../../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar';
import type { Product } from '../../../../backoffice/products/types/products.types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({ open: false, severity: 'success', message: '' });


  const handleSnackbarClose = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }));
  }, []);

  return (
    <div className={styles.card}>
      {/* Ícono de favorito */}
      <IconButton className={styles.favoriteBtn} size="small">
        <FavoriteBorderIcon />
      </IconButton>

      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
      </div>

      {/* Contenido */}
      <div className={styles.content}>
        <div className={styles.name}>{product.name}</div>

        <div className={styles.prices}>
          <span className={styles.currentPrice}>Q{product.price}</span>
          {product.price && product.price > product.price && (
            <span className={styles.originalPrice}>Reg: Q{product.price}</span>
          )}
        </div>

        <div className={styles.delivery}>24 horas dentro de la capital</div>

        <Button
          variant="contained"
          size="small"
          className={styles.addButton}
          endIcon={<ShoppingCartIcon />}
        >
          AGREGAR
        </Button>
      </div>

      <FeedbackSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
