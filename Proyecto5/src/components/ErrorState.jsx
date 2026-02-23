export default function ErrorState({ title = "Ocurrió un error", message = "" }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
      <h2 className="text-lg font-semibold text-red-200">{title}</h2>
      {message ? (
        <p className="mt-2 text-sm text-red-100/80">{message}</p>
      ) : null}
    </div>
  );
}