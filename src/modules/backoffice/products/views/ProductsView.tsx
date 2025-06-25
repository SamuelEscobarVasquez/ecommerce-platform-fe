import { useEffect, useState, useCallback } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../../../core/auth/useAuth';
import {
  getProductsService,
  deleteProductService
} from '../services/productService';
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay';
import type { Product } from '../types/products.types';
import { PrimaryButton } from '../../../../shared/components/buttons/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '../../../../shared/components/buttons/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { FeedbackSnackbar } from '../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar';

export default function ProductsView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    severity: 'success' | 'error'
    message: string
  }>({ open: false, severity: 'success', message: '' });


  // Estado para control de diálogo de confirmación
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getProductsService();
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

  const confirmDelete = (id: number) => {
    setToDeleteId(id);
    setOpenConfirm(true);
  };

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }));
  }, []);

  const handleDeleteConfirmed = async () => {
    if (toDeleteId !== null) {
      setOpenConfirm(false);
      setLoading(true);
      try {
        await deleteProductService(toDeleteId);
      } catch (err: any) {
        const message = err.response?.data?.error?.message || err.message || 'Error al eliminar el producto';
        setSnackbar({ open: true, severity: 'error', message: message });
        console.error('Error al eliminar el producto:', message);
      } finally {
        setLoading(false);
      }

      await fetchProducts();
    }
  };

  const navigateToNewProduct = () => {
    if (user?.roleName === 'Administrador') {
      navigate('/backoffice/products/new');
    } else {
      console.error('No tienes permisos para añadir productos');
      setSnackbar({ open: true, severity: 'error', message: 'No tienes permisos para añadir productos' });
    }
  }

  const navigateToEditProduct = (id: number) => {
    if (user?.roleName === 'Administrador' || user?.roleName === 'Colaborador') {
      navigate(`/backoffice/products/${id}/edit`);
    } else {
      console.error('No tienes permisos para editar productos');
      setSnackbar({ open: true, severity: 'error', message: 'No tienes permisos para editar productos' });
    }
  }

  return (
    <Box sx={{ ml: '240px', mt: '64px', p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Productos</Typography>
        {user?.roleName === 'Administrador' ? (
          <PrimaryButton
            startIcon={<AddIcon />}
            onClick={navigateToNewProduct}
          >
            Añadir Producto
          </PrimaryButton>
        ) : (
          <SecondaryButton
            startIcon={<AddIcon />}
            disabled
          >
            Añadir Producto
          </SecondaryButton>
        )}
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>
                {/* Editar: Admin y Colaborador */}
                {(user?.roleName === 'Administrador' || user?.roleName === 'Colaborador') && (
                  <IconButton
                    onClick={() => navigateToEditProduct(p.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {/* Eliminar: solo Admin */}
                {user?.roleName === 'Administrador' && (
                  <IconButton color="error" onClick={() => confirmDelete(p.id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Diálogo de confirmación */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setOpenConfirm(false)}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton color="error" onClick={handleDeleteConfirmed}>
            Eliminar
          </PrimaryButton>
        </DialogActions>
      </Dialog>

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
