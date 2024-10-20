export default function NoDataDisplay({ content }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-center text-3xl font-bold">{content}</p>
    </div>
  );
}
