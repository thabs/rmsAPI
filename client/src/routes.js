// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
// Features
import MeterData from './features/meterData/MeterData';
import LineGraph from './features/lineGraph/LineGraph';
import WHGraph from './features/whGraph/WHGraph';
import VARHGraph from './features/varhGraph/VARHGraph';

const dashboardRoutes = [
  {
    path: '/meterdata',
    name: 'Meter Data',
    icon: DashboardIcon,
    component: MeterData,
    layout: '/admin',
  },
  {
    path: '/linegraph',
    name: 'WH Vs VARH Graph',
    icon: BarChartIcon,
    component: LineGraph,
    layout: '/admin',
  },
  {
    path: '/whgraph',
    name: 'WH Graph',
    icon: BarChartIcon,
    component: WHGraph,
    layout: '/admin',
  },
  {
    path: '/varhraph',
    name: 'VARH Graph',
    icon: BarChartIcon,
    component: VARHGraph,
    layout: '/admin',
  },
];

export default dashboardRoutes;
