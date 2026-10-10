import { DB } from '../db';
export const ClubsRepository = {
  findAll: async () => await DB.getAll('Clubs'),
  findById: async (id: string) => await DB.getOne('Clubs', id),
  create: async (d: any) => await DB.create('Clubs', d),
  update: async (id: string, d: any) => await DB.update('Clubs', id, d),
  remove: async (id: string) => await DB.remove('Clubs', id)
};
