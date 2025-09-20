// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// almacenamiento en memoria (solo para prototipo)
let users = [];
let schedules = [
  { id: 1, neighborhood: 'Barrio Centro', day: 'Lunes', time: '08:30' },
];

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// 👇 Ruta principal (para Render y pruebas rápidas)
app.get("/", (req, res) => {
  res.send("Backend de BMATura corriendo en Render");
});

// registro
app.post('/api/auth/register', async (req,res)=>{
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });
  if (users.find(u=>u.email===email)) return res.status(409).json({ error: 'Usuario ya existe' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: users.length+1, name, email, password: hash };
  users.push(user);
  const token = generateToken(user);
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

// login
app.post('/api/auth/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });
  const token = generateToken(user);
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

// obtener horarios
app.get('/api/schedules', (req,res)=>{
  res.json(schedules);
});

// añadir horario
app.post('/api/schedules', (req,res)=>{
  const s = { id: schedules.length+1, ...req.body };
  schedules.push(s);
  res.json(s);
});

// levantar servidor en el puerto asignado por Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`API escuchando en puerto ${PORT}`));
