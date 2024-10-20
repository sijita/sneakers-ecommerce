import { PiTrendUpBold } from "react-icons/pi";

export default function DashboardInfoCard({
  title,
  value,
  percentage,
  comparative,
}) {
  return (
    <div className="border border-neutral p-5 rounded-md flex flex-col gap-5">
      <p className="text-lg font-medium uppercase">{title}</p>
      <p className="text-2xl font-bold">$ {value}</p>
      <div className="flex gap-3 items-center">
        <PiTrendUpBold className="text-green-400" size={15} />
        <span className="text-green-400">{percentage}%</span>
        <span className="text-base-200">{comparative}</span>
      </div>
    </div>
  );
}
