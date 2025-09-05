-- Inicialización de la base de datos para gestión de pozos petroleros
-- Este script se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear tabla pozos
CREATE TABLE IF NOT EXISTS pozos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    produccion_diaria NUMERIC NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'inactivo', 'mantenimiento')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado) VALUES
('Pozo Petromax A', 'Oriente Ecuatoriano - Bloque 15', 120.5, 'activo'),
('Pozo Petromax B', 'Oriente Ecuatoriano - Bloque 16', 85.3, 'activo'),
('Pozo Petromax C', 'Costa - Península de Santa Elena', 200.7, 'inactivo'),
('Pozo Petromax D', 'Amazonía - Bloque 31', 150.2, 'activo'),
('Pozo Petromax E', 'Oriente - Bloque 43', 95.8, 'mantenimiento'),
('Pozo Petromax F', 'Costa - Manabí', 175.4, 'activo');

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_pozos_estado ON pozos(estado);
CREATE INDEX IF NOT EXISTS idx_pozos_nombre ON pozos(nombre);

-- Función para actualizar timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_pozos_updated_at 
    BEFORE UPDATE ON pozos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
