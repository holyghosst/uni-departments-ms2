import { pool } from '../../db';
import { Department } from '../../models/department';

export const createDepartmentInsertStatement = (departments: Department[]) => {
  const query = `
    INSERT INTO Department (id, name, address, phone, email)
    VALUES ${departments.map(() => '(?, ?, ?, ?, ?)').join(', ')}
  `;

  const values = departments.flatMap(dep => [
    dep.id,
    dep.name,
    dep.address,
    dep.phone,
    dep.email,
  ]);

  return { query, values };
};
