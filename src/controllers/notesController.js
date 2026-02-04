import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const limit = Number(perPage);
  const skip = (Number(page) - 1) * limit;

  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const totalNotes = await Note.countDocuments(filter);

  const notes = await Note.find(filter).skip(skip).limit(limit);

  const totalPages = Math.ceil(totalNotes / limit);

  res.status(200).json({
    page: Number(page),
    perPage: limit,
    totalNotes,
    totalPages,
    notes,
  });
};
