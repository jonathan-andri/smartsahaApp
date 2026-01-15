export type NotificationType = 
  | "message"           // Nouveau message
  | "offer"            // Nouvelle offre correspondante
  | "task_reminder"    // Rappel de tâche
  | "task_overdue"     // Tâche en retard
  | "harvest_reminder" // Rappel de récolte
  | "system";          // Notification système

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  
  // Actions possibles
  actionUrl?: string;
  actionLabel?: string;
}