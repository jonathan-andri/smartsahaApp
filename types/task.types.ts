export type TaskType = 
  | "planting"      // Plantation
  | "watering"      // Arrosage
  | "fertilizing"   // Fertilisation
  | "pesticide"     // Application pesticide
  | "weeding"       // Désherbage
  | "pruning"       // Taille
  | "harvesting"    // Récolte
  | "soilPrep"      // Préparation du sol
  | "inspection"    // Inspection
  | "other";        // Autre

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled" | "overdue";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  userId: string;
  parcelId?: string; // Lié à une parcelle
  parcelName?: string;
  
  // Informations de base
  title: string;
  description?: string;
  type: TaskType;
  
  // Dates
  dueDate: Date;
  startDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Statut & Priorité
  status: TaskStatus;
  priority: TaskPriority;
  
  // Notifications
  reminderEnabled: boolean;
  reminderTime?: Date;
  reminderSent?: boolean;
  
  // Détails supplémentaires
  estimatedDuration?: number; // en minutes
  assignedTo?: string; // ID utilisateur si délégué
  
  // Résultats/Notes
  notes?: string;
  photos?: string[];
  
  // Coûts (optionnel)
  estimatedCost?: number;
  actualCost?: number;
  currency?: string;
}

export interface TaskSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
  completionRate: number;
}