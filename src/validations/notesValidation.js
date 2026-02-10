import Joi from 'joi';

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(1),
    tag: Joi.string(),
    search: Joi.string(),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().hex().length(24).required(),
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tag: Joi.string().required(),
  }),
};

export const updateNoteSchema = {
  body: Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    tag: Joi.string(),
  }),
};
