export default function Titles({ size, title }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className={`${size} font-bold uppercase mb-1 text-center`}>
        {title}
      </h1>
      <div>
        <hr className="w-32 mx-auto border-secondary" />
        <hr className="w-32 mx-auto border-secondary" />
        <hr className="w-32 mx-auto border-secondary" />
      </div>
    </div>
  );
}
