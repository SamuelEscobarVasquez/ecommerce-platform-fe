import { useCallback, useMemo, useState } from 'react'
import type { RegisterRequest } from '../types'
import { TextInput } from '../../../../shared/components/inputs/TextInput'
import { PrimaryButton } from '../../../../shared/components/buttons/PrimaryButton/PrimaryButton'
import { registerService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { SelectInput, type SelectInputOption } from '../../../../shared/components/inputs/SelectInput'
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay'
import { FeedbackSnackbar } from '../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar'

export default function Register() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    roleId: 0,
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: 'success' | 'error'; message: string }>({
    open: false,
    severity: 'success',
    message: '',
  });

  // Role options memoized
  const rolesOptions: SelectInputOption[] = useMemo(() => [
    { label: 'Administrador', value: 1 },
    { label: 'Colaborador', value: 2 },
  ], []);

  // Handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleRoleChange = useCallback((value: string | number) => {
    setForm(prev => ({ ...prev, roleId: Number(value) }));
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerService(form);
      setSnackbar({ open: true, severity: 'success', message: '¡Registro exitoso!' });
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      const message = err.response?.data?.error?.message || err.message || 'Error al registrar';
      setSnackbar({ open: true, severity: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-white">
        {/* Left Illustration on large screens */}
        <div className="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center p-10">
          <img
            src="https://yt3.googleusercontent.com/MNM-yyFotyCDKPtGFdFhPf0g7PauXSlyRlLrPkhebrKsahQm7JbdTNq_RrBp6LsDsbbWwVbfF7I=s900-c-k-c0x00ffffff-no-rj"
            alt="Ilustración de bienvenida"
            className="max-w-full h-[80vh] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Form Panel */}
        <div className="relative flex flex-col w-full lg:w-1/2 justify-center p-6">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto w-[50%] flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center">Crear cuenta</h2>

            <TextInput
              label="Nombre Completo"
              name="username"
              placeholder="Ingresa tu nombre completo"
              value={form.username}
              onChange={handleChange}
            />

            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={form.email}
              onChange={handleChange}
            />

            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
            />

            <SelectInput
              label="Rol"
              options={rolesOptions}
              value={form.roleId}
              onChange={handleRoleChange}
            />

            <PrimaryButton type="submit" disabled={loading} className="mt-4 w-full">
              {loading ? 'Enviando...' : 'Registrar'}
            </PrimaryButton>
          </form>

          {/* Global components */}
          <LoadingOverlay isLoading={loading} />
          <FeedbackSnackbar
            open={snackbar.open}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={closeSnackbar}
          />
        </div>
      </div>
    </>
  );
}