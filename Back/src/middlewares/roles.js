const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    const rolUsuario = req.usuario.rol_id

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({ 
        error: 'No tienes permiso para realizar esta acción' 
      })
    }

    next()
  }
}

export { verificarRol }