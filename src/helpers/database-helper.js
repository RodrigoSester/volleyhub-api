function camelCase(rows) {
  if (!rows) return null;

  return rows.map(row => {
    const result = {};
    for (const key in row) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = row[key];
    }
    return result;
  });
}

export default {
  camelCase
}