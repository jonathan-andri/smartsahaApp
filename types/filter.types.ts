export interface FilterOption {
    id: string;
    label: string;
    value: any;
    count?: number;
  }
  
  export interface SortOption {
    id: string;
    label: string;
    field: string;
    order: "asc" | "desc";
  }