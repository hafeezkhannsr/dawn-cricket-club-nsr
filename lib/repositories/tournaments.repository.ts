import { DB } from '../db';
export const TournamentsRepository = {
  findAll: async () => await DB.getAll('Tournaments'),
  findById: async (id: string) => await DB.getOne('Tournaments', id),
  create: async (d: any) => await DB.create('Tournaments', d),
  update: async (id: string, d: any) => await DB.update('Tournaments', id, d),
  remove: async (id: string) => await DB.remove('Tournaments', id)
};
