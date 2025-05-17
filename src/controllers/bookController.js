import { Buku } from '../models/dbModel.js';

export async function createBuku(req, res) {
  try {
    const newBook = await Buku.create(req.body);
    res.status(201).json({ message: 'Buku berhasil ditambahkan', data: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan buku', error: error.message });
  }
}
