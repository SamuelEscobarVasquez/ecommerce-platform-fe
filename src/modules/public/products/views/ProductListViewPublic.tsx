import { useCallback, useEffect, useState } from 'react';
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay';
import { FeedbackSnackbar } from '../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar';
import styles from './ProductListViewPublic.module.scss';
import { getProductsServiceAvailable } from '../../../backoffice/products/services/productService';
import type { Product } from '../../../backoffice/products/types/products.types';
import { ProductCard } from '../components/ProductCard/ProductCard';

export default function ProductListViewPublic() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({ open: false, severity: 'success', message: '' });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getProductsServiceAvailable();
      setProducts(list);
    } catch (err: any) {
      const message = err.response?.data?.error?.message || err.message || 'Error al registrar';
      setSnackbar({ open: true, severity: 'error', message: message })
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }));
  }, []);

  return (
    <div className={styles.container}>
      {/* Grid de tarjetas */}
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Overlay de carga y Snackbar genéricos */}
      <LoadingOverlay isLoading={loading} />
      <FeedbackSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
