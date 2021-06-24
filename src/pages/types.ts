export interface HomepageProps {}

export interface Items {
  shape: string;
  color: string;
}
export interface FilterOption {
  shape: string;
  color: string;
  category: string;
}

export interface FilterProps {
  filter: string;
  handleFilters: (data: FilterOption) => void;
}
