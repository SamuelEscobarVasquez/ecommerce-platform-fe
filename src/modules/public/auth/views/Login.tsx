import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../../../../shared/components/inputs/TextInput'
import { FeedbackSnackbar } from '../../../../shared/components/FeedbackSnackbar/FeedbackSnackbar'
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay'
import { useAuth } from '../../../../core/auth/useAuth'
import type { LoginRequest } from '../types'
import { PrimaryButton } from '../../../../shared/components/buttons/PrimaryButton/PrimaryButton'

export default function Login() {
  const navigate = useNavigate()
  const { login, status } = useAuth()
  const loading = status === 'loading'

  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' })
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    severity: 'success' | 'error'
    message: string
  }>({ open: false, severity: 'success', message: '' })

  // Handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm((f) => ({ ...f, [name]: value }))
    },
    []
  )

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await login(form)
        setSnackbar({ open: true, severity: 'success', message: '¡Login exitoso!' })
        setTimeout(() => navigate('/backoffice/products'), 1000)
      } catch (err: any) {
        const message = err.response?.data?.error?.message || err.message || 'Error al registrar';
        setSnackbar({ open: true, severity: 'error', message: message })
      }
    },
    [form, login, navigate]
  )

  return (
    <>
      <div className="min-h-screen flex">
        <div className="relative flex flex-col w-full lg:w-1/2 justify-center p-6 bg-white">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto gap-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

            <TextInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <TextInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />

            <div className="mt-5">
              <PrimaryButton type="submit" disabled={loading} className="w-full">
                {loading ? 'Cargando...' : 'Entrar'}
              </PrimaryButton>
            </div>
          </form>

          <LoadingOverlay isLoading={loading} />
          <FeedbackSnackbar
            open={snackbar.open}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={handleSnackbarClose}
          />
        </div>
        {/* Left Illustration on large screens */}
        <div className="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center p-10">
          <img
            src="https://yt3.googleusercontent.com/MNM-yyFotyCDKPtGFdFhPf0g7PauXSlyRlLrPkhebrKsahQm7JbdTNq_RrBp6LsDsbbWwVbfF7I=s900-c-k-c0x00ffffff-no-rj"
            alt="Ilustración de bienvenida"
            className="max-w-full h-[80vh] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  )
}