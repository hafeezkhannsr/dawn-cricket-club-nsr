import { DB } from '../db';
export const PlayersRepository = {
  findAll: async () => await DB.getAll('Players'),
  findById: async (id: string) => await DB.getOne('Players', id),
  create: async (d: any) => await DB.create('Players', d),
  update: async (id: string, d: any) => await DB.update('Players', id, d),
  remove: async (id: string) => await DB.remove('Players', id)
};
