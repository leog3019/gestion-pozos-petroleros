import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gestion_pozos',
  password: process.env.DB_PASSWORD || 'postleo',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Función para obtener todos los pozos
export const getAllPozos = async () => {
  const result = await pool.query('SELECT * FROM pozos');
  return result.rows;
};

// Función para crear un pozo
export const createPozo = async (nombre: string, ubicacion: string, produccion_diaria: number, estado: string) => {
  const result = await pool.query(
    'INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, ubicacion, produccion_diaria, estado]
  );
  return result.rows[0];
};

// Función para actualizar el estado de un pozo
export const updatePozoState = async (id: number, estado: string) => {
  const result = await pool.query(
    'UPDATE pozos SET estado = $1 WHERE id = $2 RETURNING *',
    [estado, id]
  );
  return result.rows[0];
};
