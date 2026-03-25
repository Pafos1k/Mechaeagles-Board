export interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Assignment {
  id: string;
  teamId: string;
  subTeamId: string; // New: to group tasks by sub-team
  title: string;
  description?: string;
  dueDate: string; // ISO 8601
  importance: number; // 1-5
  completed: boolean;
  assignedTo?: string;
}

export type TeamType = 'Science' | 'Programming' | 'Engineering';
