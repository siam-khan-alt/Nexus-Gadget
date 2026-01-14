export default function ItemSkeleton() {
  return (
    <div className="rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden animate-pulse">
      <div className="aspect-square bg-[var(--border-color)]/20" />
      <div className="p-6 space-y-4">
        <div className="h-3 bg-[var(--border-color)]/20 rounded-full w-1/4" />
        <div className="h-6 bg-[var(--border-color)]/20 rounded-xl w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-[var(--border-color)]/10 rounded-full w-full" />
          <div className="h-3 bg-[var(--border-color)]/10 rounded-full w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-[var(--border-color)]/20 rounded-xl w-1/3" />
          <div className="h-10 w-10 bg-[var(--border-color)]/20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}