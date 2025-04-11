import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'db.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  if (req.method === 'GET') {
    res.status(200).json(data.tasks || []);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
