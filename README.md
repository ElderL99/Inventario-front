# 🧾 Inventario Web - Sistema de Gestión de Productos

Este proyecto es una aplicación completa para la gestión de productos, entradas y salidas de inventario. Está compuesto por un backend en Express + MongoDB y un frontend en Next.js con Tailwind CSS. Ideal para almacenes, negocios u oficinas que requieren control de stock.

---

## 🚀 Tecnologías

### Frontend
- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Context API para autenticación (JWT)
- Hooks personalizados

### Backend
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- JSON Web Tokens (JWT)
- Arquitectura limpia (controllers, usecases, models, routes, middleware)

---

## 🔗 Enlaces

- 🔧 API en producción: [`https://inventario-back-nine.vercel.app`](https://inventario-back-nine.vercel.app)
- 📁 Backend repo: [`github.com/ElderL99/inventario-back`](https://github.com/ElderL99/inventario-back)
- 📁 Frontend repo: [`github.com/ElderL99/inventario-front`](https://github.com/ElderL99/inventario-front)

---

## ✨ Funcionalidades

- ✅ Registro e inicio de sesión con roles (admin / usuario)
- ✅ CRUD de productos (nombre, categoría, cantidad, ubicación, estado)
- ✅ Registro de entradas (aumenta stock)
- ✅ Registro de salidas (disminuye stock con validación de cantidad disponible)
- ✅ Estado visual del stock: disponible, bajo, agotado
- ✅ Historial de movimientos (entradas y salidas)
- ✅ Filtro por nombre o categoría
- ✅ Responsive y mobile-first con Tailwind

---

## 🧪 Cómo correr el proyecto localmente

### Backend

```bash
git clone https://github.com/ElderL99/inventario-back.git
cd inventario-back
npm install
npm run dev



🧑‍💻 Autor
Adán Lugo (ElderL9)
📧 adan.lugo.barrientos@outlook.com
🔗 GitHub


🛡️ Licencia
Este proyecto está bajo la Licencia MIT. Puedes usarlo y adaptarlo libremente.