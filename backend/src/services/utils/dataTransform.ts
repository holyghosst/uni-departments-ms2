import { MinimalSupervisingEmployeeData } from "../../models/models";

interface FlatStaffRow {
  professor_id: number;
  professor_name: string;
  assistant_id: number | null;
  assistant_name: string | null;
}

export function transformToSupervisingStructure(rows: FlatStaffRow[]): MinimalSupervisingEmployeeData[] {
  const supervisors: MinimalSupervisingEmployeeData[] = [];
  for (const row of rows) {
    const { professor_id, professor_name, assistant_id, assistant_name } = row;
    let supervisor = supervisors.find(p => p.id === professor_id);
    if (!supervisor && professor_id && professor_name) {
      supervisor = {
        id: professor_id,
        name: professor_name,
        role: 'Professor',
        subordinates: [],
      };
      supervisors.push(supervisor);
    }
    if (assistant_id && assistant_name && supervisor) {
      supervisor.subordinates.push({
        id: assistant_id,
        name: assistant_name,
        role: 'Assistant',
      });
    }
  }

  return supervisors;
}
