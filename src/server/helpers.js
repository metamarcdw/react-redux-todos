export function findItem(id, items, res, attr = 'id') {
  if (!id) res.status(400).send({
    msg: 'No ID given'
  });

  const index = items.map(i => i[attr]).indexOf(id);
  const item = items[index];

  if (!item) res.status(404).send({
    msg: 'ID not found'
  });
  return { item, index };
}
