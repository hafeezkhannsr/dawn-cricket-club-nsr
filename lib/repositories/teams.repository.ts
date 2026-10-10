import { DB } from '../db';
export const TeamsRepository = {
  findAll: async () => await DB.getAll('Teams'),
  findById: async (id: string) => await DB.getOne('Teams', id),
  create: async (d: any) => await DB.create('Teams', d),
  update: async (id: string, d: any) => await DB.update('Teams', id, d),
  remove: async (id: string) => await DB.remove('Teams', id)
};
