export const MatchesService = {
  list: async () => [],
  get: async (id: string) => ({ id }),
  create: async (d: any) => ({ ok: true, data: d }),
  update: async (id: string, d: any) => ({ ok: true, id }),
  remove: async (id: string) => ({ ok: true, id })
};
