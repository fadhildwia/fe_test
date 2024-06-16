import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { UnitInterface } from '@/hooks/useGetAllUnitKerja';

interface CardPieChartProps {
  data: UnitInterface[]
}

export default function CardPieChart({ data }: CardPieChartProps) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
    />
  );
}