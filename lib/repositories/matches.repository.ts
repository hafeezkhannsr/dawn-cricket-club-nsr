import { DB } from '../db';
export const MatchesRepository = {
  findAll: async () => await DB.getAll('Matches'),
  findById: async (id: string) => await DB.getOne('Matches', id),
  create: async (d: any) => await DB.create('Matches', d),
  update: async (id: string, d: any) => await DB.update('Matches', id, d),
  remove: async (id: string) => await DB.remove('Matches', id)
};
