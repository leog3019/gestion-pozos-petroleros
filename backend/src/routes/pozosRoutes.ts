import express, { Request, Response } from 'express';
import { getAllPozos, createPozo, updatePozoState } from '../models/Pozo';

const router = express.Router();

// Endpoint para obtener todos los pozos
router.get('/pozos', async (req: Request, res: Response) => {
  try {
    const pozos = await getAllPozos();
    res.json(pozos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint para crear un nuevo pozo
router.post('/pozos', async (req: Request, res: Response) => {
  const { nombre, ubicacion, produccion_diaria, estado } = req.body;
  try {
    const nuevoPozo = await createPozo(nombre, ubicacion, produccion_diaria, estado);
    res.status(201).json(nuevoPozo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint para actualizar el estado de un pozo
router.patch('/pozos/:id', async (req: Request, res: Response) => {
  const { estado } = req.body;
  const { id } = req.params;
  try {
    const pozoActualizado = await updatePozoState(Number(id), estado);
    res.json(pozoActualizado);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
