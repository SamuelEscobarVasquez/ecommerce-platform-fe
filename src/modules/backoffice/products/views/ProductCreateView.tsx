import {
  Box, Typography, Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextInput } from '../../../../shared/components/inputs/TextInput';
import { FeedbackSnackbar } from '../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar';
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay';
import { createProductService } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { PrimaryButton } from '../../../../shared/components/buttons/PrimaryButton/PrimaryButton';
import type { CreateProductForm } from '../types/products.types';

export default function ProductCreateView() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateProductForm>({
    name: '',
    description: '',
    price: 0,
    sku: '',
    inventory: 0,
    image: null as any,
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({ open: false, severity: 'success', message: '' });


  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setForm((f: any) => ({
        ...f,
        [name]: type === 'number' ? Number(value) : value,
      }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setForm((f: any) => ({ ...f, image: e.target.files![0] }));
      }
    },
    []
  );

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }));
  }, []);


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await createProductService(form);
        setSnackbar({ open: true, severity: 'success', message: 'Producto creado' });
        setTimeout(() => navigate('/backoffice/products'), 1000);
      } catch (err: any) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: err?.response?.data?.message || err.message || 'Error al crear',
        });
      } finally {
        setLoading(false);
      }
    },
    [form, navigate]
  );

  return (
    <Box sx={{ ml: '240px', mt: '64px', p: 4 }}>
      <Typography variant="h4" mb={2}>Crear Producto</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextInput
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <TextInput
            label="Precio"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
          <TextInput
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
          />
          <TextInput
            label="Inventario"
            name="inventory"
            type="number"
            value={form.inventory}
            onChange={handleChange}
          />

          {/* Upload de imagen con MUI */}
          <Box my={2}>
            <PrimaryButton component="label" startIcon={<CloudUploadIcon />}>
              Subir Imagen
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </PrimaryButton>
            {form.image && <Typography mt={1}>{form.image.name}</Typography>}
          </Box>

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Producto'}
          </PrimaryButton>
        </form>
      </Paper>

      {/* Overlay de carga y Snackbar genéricos */}
      <LoadingOverlay isLoading={loading} />
      <FeedbackSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}