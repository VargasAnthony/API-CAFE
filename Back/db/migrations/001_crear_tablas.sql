CREATE TABLE rol (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_rol VARCHAR(50) NOT NULL
);


CREATE TABLE usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password_hash VARCHAR(300) NOT NULL,
  rol_id UUID, 
  FOREIGN KEY (rol_id) REFERENCES rol(id)
);

CREATE TABLE proveedor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(50) NOT NULL,
    contacto VARCHAR(50),
    telefono VARCHAR(50)
);

CREATE TABLE lote (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_cafe VARCHAR(50) NOT NULL,
    calidad VARCHAR(50) NOT NULL,
    proceso VARCHAR(50) NOT NULL,
    costo_por_kg DECIMAL(5,2),
    stock_kg DECIMAL(10,3),
    fecha_ingreso TIMESTAMP,
    proveedor_id UUID,
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

CREATE TABLE movimientos_inventario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_movimiento VARCHAR(100) NOT NULL,
    cantidad DECIMAL(10,3) NOT NULL,
    fecha DATE NOT NULL,
    lote_id UUID,
    usuario_id UUID,
    FOREIGN KEY (lote_id) REFERENCES lote(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE producto (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    presentacion VARCHAR(20) NOT NULL,
    stock_disponible DECIMAL(10,3) DEFAULT 0,
    precio_venta DECIMAL(10,2) NOT NULL,
    lote_id UUID,
    FOREIGN KEY (lote_id) REFERENCES lote(id)
);

CREATE TABLE venta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente VARCHAR(100) NOT NULL,
    comprobante VARCHAR(50),
    num_comprobante VARCHAR(50),
    total DECIMAL(10,2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT NOW(),
    usuario_id UUID,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE detalle_venta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cantidad DECIMAL(10,3) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL,
    venta_id UUID,
    producto_id UUID,
    FOREIGN KEY (venta_id) REFERENCES venta(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);