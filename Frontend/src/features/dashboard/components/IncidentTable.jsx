const MOCK_INCIDENTS = [
  { id: 'INC-4301', title: 'Database cluster unreachable', severity: 'Critical', status: 'Open', service: 'Database', assignee: 'Alex M.', time: '2m ago' },
  { id: 'INC-4300', title: 'API gateway latency spike >2s', severity: 'High', status: 'Investigating', service: 'API Gateway', assignee: 'Sarah K.', time: '18m ago' },
  { id: 'INC-4299', title: 'Memory usage >90% on prod-03', severity: 'High', status: 'Investigating', service: 'Compute', assignee: 'James R.', time: '34m ago' },
  { id: 'INC-4298', title: 'SSL certificate expiring in 3 days', severity: 'Medium', status: 'Scheduled', service: 'Security', assignee: 'Priya S.', time: '1h ago' },
  { id: 'INC-4297', title: 'CDN cache miss rate elevated', severity: 'Medium', status: 'Open', service: 'CDN', assignee: 'Chen W.', time: '2h ago' },
  { id: 'INC-4296', title: 'Payment webhook timeout (3 events)', severity: 'Low', status: 'Resolved', service: 'Payments', assignee: 'Maria L.', time: '3h ago' },
  { id: 'INC-4295', title: 'Build pipeline failed — frontend', severity: 'Low', status: 'Resolved', service: 'CI/CD', assignee: 'Tom B.', time: '5h ago' },
];

const SEVERITY_STYLES = {
  Critical: 'bg-red-500/15 text-red-400 border border-red-500/25',
  High: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  Medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  Low: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
};

const STATUS_STYLES = {
  Open: 'bg-red-500/10 text-red-400',
  Investigating: 'bg-amber-500/10 text-amber-400',
  Scheduled: 'bg-blue-500/10 text-blue-400',
  Resolved: 'bg-emerald-500/10 text-emerald-400',
};

const STATUS_DOT = {
  Open: 'bg-red-400',
  Investigating: 'bg-amber-400 animate-pulse',
  Scheduled: 'bg-blue-400',
  Resolved: 'bg-emerald-400',
};

// Mobile card view for each incident
function IncidentCard({ inc }) {
  return (
    <div className="p-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-mono text-xs text-indigo-400 font-medium">{inc.id}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold shrink-0 ${SEVERITY_STYLES[inc.severity]}`}>
          {inc.severity}
        </span>
      </div>
      <p className="text-sm font-medium text-slate-200 mb-2 leading-snug">{inc.title}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[inc.status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[inc.status]}`} />
          {inc.status}
        </span>
        <span className="text-xs text-slate-500">{inc.service}</span>
        <span className="text-xs text-slate-600 ml-auto">{inc.time}</span>
      </div>
    </div>
  );
}

export default function IncidentTable() {
  return (
    <div className="bg-[#0d1117]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-white font-semibold text-base">Active Incidents</h2>
          <p className="text-slate-500 text-xs mt-0.5">Showing 7 of 12 open incidents</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05] border border-white/[0.06] hidden sm:block">
            Filter
          </button>
          <button className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-1.5 rounded-lg font-medium whitespace-nowrap">
            + New
          </button>
        </div>
      </div>

      {/* Mobile card list — shown only on small screens */}
      <div className="md:hidden divide-y divide-white/[0.04]">
        {MOCK_INCIDENTS.map((inc) => (
          <IncidentCard key={inc.id} inc={inc} />
        ))}
      </div>

      {/* Desktop/tablet table — hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.04]">
              {['ID', 'Title', 'Severity', 'Status', 'Service', 'Assignee', 'Time'].map((col) => (
                <th key={col} className="px-4 lg:px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_INCIDENTS.map((inc) => (
              <tr key={inc.id} className="hover:bg-white/[0.02] cursor-pointer transition-colors group">
                <td className="px-4 lg:px-5 py-3.5 font-mono text-xs text-indigo-400 font-medium whitespace-nowrap">
                  {inc.id}
                </td>
                <td className="px-4 lg:px-5 py-3.5 text-slate-200 font-medium max-w-[180px] lg:max-w-[220px] truncate group-hover:text-white transition-colors">
                  {inc.title}
                </td>
                <td className="px-4 lg:px-5 py-3.5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${SEVERITY_STYLES[inc.severity]}`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="px-4 lg:px-5 py-3.5 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[inc.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[inc.status]}`} />
                    {inc.status}
                  </span>
                </td>
                <td className="px-4 lg:px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{inc.service}</td>
                <td className="px-4 lg:px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{inc.assignee}</td>
                <td className="px-4 lg:px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{inc.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-t border-white/[0.06]">
        <p className="text-xs text-slate-600">Updated 30s ago</p>
        <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          View all →
        </button>
      </div>
    </div>
  );
}
