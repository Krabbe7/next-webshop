import { Employee } from "./employees/types";
import EmployeesComponent from "./employees/employees";
import { PropsEmployees } from "./types";

export async function getEmployees() {
  const res = await fetch("http://localhost:5000/api/employees", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }

  return res.json();
}

export default async function omOsPage() {
  const employees = await getEmployees();
  return (
    <div>
      <h1 className="title">Om os</h1>
      <EmployeesComponent key={employees.id} employees={employees} />
    </div>
  );
}
