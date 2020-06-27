export interface ResultTable {
  driverName: string;
  events: Array<{
    points: number;
  }>;
}
