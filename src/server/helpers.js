export function findItem(id, items, attr = 'id') {
  const index = items.map(i => i[attr]).indexOf(id);
  const item = items[index];
  return { item, index };
}
