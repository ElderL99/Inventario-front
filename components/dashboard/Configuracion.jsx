'use client'

import { useEffect, useState } from 'react'
import { useUsers } from '@/hooks/useUser'
import { useAuth } from '@/context/AuthContext'

export default function Configuracion() {
    const { users, loading, fetchUsers, createUser, updateRole, deleteUser } = useUsers()
    const { user } = useAuth()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createUser(form)
        setForm({ name: '', email: '', password: '', role: 'user' })
    }

    const isSameUser = (a, b) => String(a) === String(b)

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">Configuración de Usuarios</h1>

            <form onSubmit={handleSubmit} className="bg-zinc-800 p-4 rounded-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded text-black bg-zinc-700"
                    />
                </div>
                <div>
                    <label className="block text-sm">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded text-black bg-zinc-700"
                    />
                </div>
                <div>
                    <label className="block text-sm">Nombre</label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded text-black bg-zinc-700"
                    />
                </div>
                <div>
                    <label className="block text-sm">Rol</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full p-2 rounded text-black bg-zinc-700"
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-600 px-4 py-2 rounded">
                    Crear Usuario
                </button>
            </form>

            <div className="overflow-x-auto">
                <table className="w-full bg-zinc-700 rounded overflow-hidden">
                    <thead className="bg-zinc-600">
                        <tr>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Rol</th>
                            <th className="p-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="text-center p-4">Cargando...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center p-4">No hay usuarios</td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u._id} className="border-t border-zinc-600">
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2 capitalize">{u.role}</td>
                                    <td className="p-2 space-x-2">
                                        {/* Solo mouestra si NO es el mismo usuario logueado */}
                                        {!isSameUser(u._id, user._id) ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updateRole(u._id, u.role === 'admin' ? 'user' : 'admin')
                                                    }
                                                    className="px-2 py-1 bg-blue-600 text-white rounded"
                                                >
                                                    Cambiar Rol
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(u._id)}
                                                    className="px-2 py-1 bg-red-600 rounded"
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-sm italic text-zinc-400">Tu cuenta</span>
                                        )}



                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
