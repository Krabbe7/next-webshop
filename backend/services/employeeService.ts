import { pool } from "../db";

async function getAllEmployees() {
  const result = await pool.query("SELECT * FROM employees ORDER BY id");

  return result.rows;
}

async function createEmployee(employee: any) {
  const result = await pool.query(
    `
    INSERT INTO employees (
    name,
    role,
    email,
    phone_number,
    employee_img
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      employee.name,
      employee.role,
      employee.email,
      employee.phone_number,
      employee.employee_img,
    ],
  );

  return result.rows[0];
}

async function updateemployee(id: number, employee: any) {
  const result = await pool.query(
    `
    UPDATE employees
    SET
      role = $1,
      name = $2,
      email = $3,
      phone_number = $4,
      employee_img = $5,

    WHERE id = $6
    RETURNING *
    `,
    [
      employee.name,
      employee.role,
      employee.email,
      employee.phone_number,
      employee.employee_img,
      id,
    ],
  );

  return result.rows[0];
}

async function getEmployeeById(id: number) {
  const result = await pool.query("SELECT * FROM employees WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
}

async function deleteemployee(id: number) {
  const result = await pool.query(
    "DELETE FROM employees WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
}

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateemployee,
  deleteemployee,
};
