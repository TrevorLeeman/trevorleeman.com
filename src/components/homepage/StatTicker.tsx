export type Stat = {
  label: string;
  value: string;
};

/** Ticker-style strip of figures between two hairlines, no card chrome. */
const StatTicker = ({ stats }: { stats: Stat[] }) => (
  <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 lg:grid-cols-4">
    {stats.map(stat => (
      <div key={stat.label}>
        <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-label text-muted">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-signal" />
          {stat.label}
        </dt>
        <dd className="mt-2 font-display text-xl font-semibold text-ink">{stat.value}</dd>
      </div>
    ))}
  </dl>
);

export default StatTicker;
