import { DB } from '../db';
export const ScoringRepository = {
  findAll: async () => await DB.getAll('Scoring'),
  findById: async (id: string) => await DB.getOne('Scoring', id),
  create: async (d: any) => await DB.create('Scoring', d),
  update: async (id: string, d: any) => await DB.update('Scoring', id, d),
  remove: async (id: string) => await DB.remove('Scoring', id)
};
