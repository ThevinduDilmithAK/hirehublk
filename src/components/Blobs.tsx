export function Blobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div
        className="animate-blob absolute top-24 -right-24 h-[26rem] w-[26rem] rounded-full bg-pink/25 blur-3xl"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber/25 blur-3xl"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}
