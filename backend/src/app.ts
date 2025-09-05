import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pozosRoutes from './routes/pozosRoutes';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Habilitar CORS para el frontend
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Backend funcionando correctamente' });
});

// Rutas
app.use('/api', pozosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`API pozos: http://localhost:${port}/api/pozos`);
});

// Manejo de errores
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
