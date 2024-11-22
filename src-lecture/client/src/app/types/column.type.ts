export type Column<T> = {
  label: string;
  attribute: keyof T;
}
