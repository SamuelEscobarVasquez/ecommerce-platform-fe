import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextInput } from '../../../../shared/components/inputs/TextInput';
import { FeedbackSnackbar } from '../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar';
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay';
import { useParams, useNavigate } from 'react-router-dom';
import type { CreateProductForm, Product } from '../types/products.types';
import { getProductService, updateProductService } from '../services/productService';
import { PrimaryButton } from '../../../../shared/components/buttons/PrimaryButton/PrimaryButton';

export default function ProductEditView() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
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

  // Carga datos del producto al montar
  useEffect(() => {
    (async () => {
      setLoading(true);
      const prod: Product = await getProductService(productId);
      setForm({
        name: prod.name,
        description: prod.description || '',
        price: prod.price,
        sku: prod.sku,
        inventory: prod.inventory,
        image: null as any, // imagen solo si se reemplaza
      });
      setLoading(false);
    })();
  }, [productId]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm(f => ({ ...f, image: e.target.files![0] }));
    }
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar(s => ({ ...s, open: false }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProductService(productId, form);
      setSnackbar({ open: true, severity: 'success', message: 'Producto actualizado' });
      setTimeout(() => navigate('/backoffice/products'), 1000);
    } catch (err: any) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response?.data?.message || err.message || 'Error al actualizar',
      });
    } finally {
      setLoading(false);
    }
  }, [form, productId, navigate]);

  return (
    <Box sx={{ mt: '64px', p: 4 }}>
      <Typography variant="h4" mb={2}>Editar Producto</Typography>
      <Paper sx={{ p: 3 }}>
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
          <Box my={2}>
            <PrimaryButton component="label" startIcon={<CloudUploadIcon />}>
              Cambiar Imagen
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </PrimaryButton>
            {form.image && <Typography mt={1}>{form.image.name}</Typography>}
          </Box>
          <div className="flex justify-center">
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </PrimaryButton>
          </div>
        </form>
      </Paper>
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