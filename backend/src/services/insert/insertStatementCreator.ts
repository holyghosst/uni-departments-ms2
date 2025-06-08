export function createInsertStatement<T extends Record<string, any>>(tableName: string, data: T[]) {
    if (!data.length) return { query: '', values: [] };
    const columns = Object.keys(data[0]);
    const placeholders = `(${columns.map(() => '?').join(', ')})`;
    const values = data.flatMap((row) => columns.map((col) => row[col]));
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ${data.map(() => placeholders).join(', ')}`;
    return { query, values };
}
