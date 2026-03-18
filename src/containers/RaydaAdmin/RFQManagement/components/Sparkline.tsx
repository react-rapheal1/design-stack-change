import { cn } from "@/lib/utils";
import type { TrendDirection } from "../TrendDirection";
import { trendColors } from "../trendColors";

interface SparklineProps {
  points: number[];
  id: string;
  trend?: TrendDirection;
  className?: string;
}

function Sparkline({ points, id, trend = "up", className }: SparklineProps) {
  const width = 200;
  const height = 56;
  const paddingX = 2;
  const paddingY = 10;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const coords = points.map((val, i) => ({
    x: paddingX + (i / (points.length - 1)) * (width - paddingX * 2),
    y: paddingY + (1 - (val - min) / range) * (height - paddingY * 2),
  }));

  if (trend === "neutral") {
    const midY = height / 2;
    const linePath = `M${paddingX},${midY} L${width - paddingX},${midY}`;
    const areaPath = `${linePath} L${width - paddingX},${height} L${paddingX},${height} Z`;
    const gradId = `sparkGrad-${id}`;
    const colors = trendColors[trend];

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn("h-full w-full", className)}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={colors.gradFrom} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.gradTo} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  let linePath = `M${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const tension = 0.3;
    const prev = coords[i - 1] || curr;
    const after = coords[i + 2] || next;
    const cp1x = curr.x + (next.x - prev.x) * tension;
    const cp1y = curr.y + (next.y - prev.y) * tension;
    const cp2x = next.x - (after.x - curr.x) * tension;
    const cp2y = next.y - (after.y - curr.y) * tension;
    linePath += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
  }

  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
  const gradId = `sparkGrad-${id}`;
  const colors = trendColors[trend];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-full w-full", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.gradFrom} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.gradTo} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={colors.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Sparkline };
