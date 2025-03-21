import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";

import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";

const TrafficDistribution = ({icon,title,value}) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.secondary.light;
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 170,
    },
    colors: [secondary, error, primary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [5368, 3500, 4106];

  return (
    <DashboardCard title="Traffic Distribution">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={6} sm={7}>
          {icon}
          <Typography variant="h3" fontWeight="700">
            {value}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            mt={1}
            alignItems="center"
          >
            
              <Typography
                variant="subtitle2"
                fontSize="12px"
                color="textSecondary"
              >
                {title}
              </Typography>
            </Stack>
           </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TrafficDistribution;
