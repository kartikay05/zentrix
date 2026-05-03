import DashboardLayout from '../../../components/layout/DashboardLayout';
import StatsCard from '../components/StatsCard';
import IncidentTable from '../components/IncidentTable';
import ActivityFeed from '../components/ActivityFeed';
import SystemStatus from '../components/SystemStatus';
import { useAuth } from '../../auth/hook/useAuth';

const IncidentIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const ResolvedIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const UptimeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
  </svg>
);
const AiIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default function DashboardHome() {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <DashboardLayout title="Dashboard">

      {/* Welcome banner */}
      <div className="relative mb-5 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-900/40 via-[#0d1117] to-[#0d1117] border border-indigo-500/20 px-5 py-4 md:px-6 md:py-5">
        <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-indigo-600/20 to-transparent pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-indigo-300 text-sm font-medium">{greeting},</p>
            <h2 className="text-white text-xl md:text-2xl font-bold mt-0.5">{firstName} 👋</h2>
            <p className="text-slate-400 text-sm mt-1">
              You have <span className="text-red-400 font-semibold">3 critical incidents</span> requiring attention.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="flex-1 sm:flex-none px-3 py-2 md:px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 text-sm font-medium hover:bg-white/[0.08] transition-colors">
              View Reports
            </button>
            <button className="flex-1 sm:flex-none px-3 py-2 md:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] whitespace-nowrap">
              + New Incident
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row — 1 col on phone, 2 on sm, 4 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-5">
        <StatsCard
          label="Active Incidents"
          value="12"
          trend="4 from yesterday"
          trendDir="up"
          color="red"
          subValue="3 critical · 5 high · 4 medium"
          icon={<IncidentIcon />}
        />
        <StatsCard
          label="Resolved Today"
          value="28"
          trend="12% vs last week"
          trendDir="up"
          color="green"
          subValue="Avg. resolution: 47 min"
          icon={<ResolvedIcon />}
        />
        <StatsCard
          label="System Uptime"
          value="99.7%"
          trend="0.3% this week"
          trendDir="down"
          color="blue"
          subValue="1 degraded · 7 healthy"
          icon={<UptimeIcon />}
        />
        <StatsCard
          label="AI Actions"
          value="156"
          trend="23% this month"
          trendDir="up"
          color="purple"
          subValue="42 auto · 114 assisted"
          icon={<AiIcon />}
        />
      </div>

      {/* Main content — table full width on mobile, 2/3 on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <IncidentTable />
        </div>
        {/* Activity Feed — full width on mobile/tablet, sidebar on xl */}
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* System Status */}
      <SystemStatus />
    </DashboardLayout>
  );
}
