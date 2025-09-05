import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion_pozos',
  password: 'postleo',
  port: 5432,
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
