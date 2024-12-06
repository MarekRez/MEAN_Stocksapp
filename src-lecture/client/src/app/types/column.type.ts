export type Column<T> = {
  label: string;
  text?: string;
  attribute?: keyof T;
  onCLick?: (row: T) => void;
  width?: string;
}
