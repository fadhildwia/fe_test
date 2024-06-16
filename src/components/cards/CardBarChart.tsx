import { UnitInterface } from '@/hooks/useGetAllUnitKerja';
import { BarChart } from '@mui/x-charts/BarChart';

interface CartBarChartProps {
  data: UnitInterface[]
}

export default function CardBarChart({ data }: CartBarChartProps) {
  const xAxisData: string[] = [];
  const seriesData: number[] = [];

  data.forEach(item => {
    xAxisData.push(item.unit);
    seriesData.push(item.ruas.length);
  });

  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: xAxisData,
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: seriesData,
        },
      ]}
    />
  );
}