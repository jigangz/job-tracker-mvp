interface Props {
  label: string;
  value: number;
  color: string; // tailwind text color class
}

export default function StatCard({ label, value, color }: Props) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
