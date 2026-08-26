import { Employee } from "./employees/types";
import EmployeesComponent from "./employees/employees";
import { PropsEmployees } from "./types";
import AboutIntro from "./components/aboutIntro/aboutIntro";
import OurStory from "./components/ourStory/ourStory";
import Values from "./components/values/values";

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
    <div className="pageContainer">
      <h1 className="pageTitle">Om os</h1>
      <AboutIntro />

      <OurStory />

      <Values />

      <EmployeesComponent key={employees.id} employees={employees} />
    </div>
  );
}
