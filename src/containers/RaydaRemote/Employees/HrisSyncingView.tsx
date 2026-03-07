function HrisSyncingView() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative mb-6 h-20 w-20 animate-spin">
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          const radius = 30;
          const x = Math.sin(angle) * radius;
          const y = -Math.cos(angle) * radius;

          return (
            <div
              key={index}
              className="absolute h-2.5 w-2.5 rounded-full bg-brand-600"
              style={{ left: `calc(50% + ${x}px - 5px)`, opacity: Math.max(0.08, 1 - index * 0.083), top: `calc(50% + ${y}px - 5px)` }}
            />
          );
        })}
      </div>
      <p className="text-lg font-semibold text-primary">Sync data...</p>
    </div>
  );
}

export { HrisSyncingView };
