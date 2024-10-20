export default function InfoSection({ title, children, onClick, editBtnText }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <p className="text-2xl font-bold">{title}</p>
        <button
          onClick={onClick}
          className="btn btn-secondary btn-sm sm:btn-wide"
        >
          {editBtnText}
        </button>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
