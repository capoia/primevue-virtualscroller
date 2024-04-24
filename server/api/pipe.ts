function paginate<T>(items: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit;
  const end = page * limit;
  return items.slice(start, end);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log({ body });
  const allStages = [
    { name: 'Stage 1' },
    { name: 'Stage 2' },
    { name: 'Stage 3' },
    { name: 'Stage 4' },
    { name: 'Stage 5' },
    { name: 'Stage 6' },
    { name: 'Stage 7' },
    { name: 'Stage 8' },
  ];

  return {
    meta: {
      total: 8,
    },
    name: 'Pipe 1',
    stages: paginate(allStages, body.page, body.limit),
  };
});
