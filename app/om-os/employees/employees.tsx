import Image from "next/image";
import styles from "./employees.module.css";
import { Employee } from "./types";

type EmployeesComponentProps = {
  employees: Employee[];
};

export default function EmployeesComponent({
  employees,
}: EmployeesComponentProps) {
  return (
    <section className={styles.section}>
      <h2 className="header">Mød os</h2>
      <div className={styles.employeesGrid}>
        {employees.map((employee) => (
          <div key={employee.id} className={styles.employee}>
            {employee.employee_img ? (
              <Image
                src={employee.employee_img}
                alt={employee.name}
                width={400}
                height={500}
                className={styles.image}
              />
            ) : (
              <div className={styles.noImage}>No image available</div>
            )}

            <div className={styles.content}>
              <h3 className={styles.employeeTitle}>{employee.name}</h3>
              <p className={styles.role}>{employee.role}</p>

              <p className={styles.meta}>{employee.email}</p>
              <p className={styles.meta}>{employee.phone_number}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
