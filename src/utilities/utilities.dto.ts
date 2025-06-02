export class UtilityDto {
  date: string; // e.g. '2025-05-28'
  type: string; // 'gas' or 'water'
  value: number; // numeric reading
  unit: string; // unit string, e.g. 'm³'
  meterNumber: string;
}
