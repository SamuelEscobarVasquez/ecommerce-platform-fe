# ──────────────────────────────────────────────────────────────────────────────
# 1) Etapa de construcción
# ──────────────────────────────────────────────────────────────────────────────
FROM node:22.16.0-alpine AS build

# Usa pnpm v10
RUN npm install -g pnpm@10.12.1

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia sólo los archivos de definición de dependencias primero,
# para aprovechar la cache de Docker cuando no cambien.
COPY package.json pnpm-lock.yaml ./

# Instala dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto de tu código fuente
COPY . .

# Construye la app para producción
RUN pnpm run build

# ──────────────────────────────────────────────────────────────────────────────
# 2) Etapa de producción (Nginx)
# ──────────────────────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine

# Elimina la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu propia configuración si la tienes (opcional)
# COPY nginx.conf /etc/nginx/conf.d/app.conf

# Sirve los archivos estáticos que generó Vite en /app/dist
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Arranca Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]