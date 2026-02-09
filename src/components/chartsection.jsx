import React from "react";
import TrendGraph from "./trendgraph";

// Helper: create a small synthetic timeseries around the current value
function makeSeries(currentValue, points = 5) {
  const series = [];
  const base = Number(currentValue) || 0;
  for (let i = 0; i < points; i++) {
    // time labels: 1..points (show as 1..5 on X axis)
    const timeLabel = `${i + 1}`;
    // small random walk around base
    const variation = (Math.sin(i / 2) + (Math.random() - 0.5) * 0.2) * (base === 0 ? 1 : base * 0.03);
    const value = Math.round((base + variation) * 100) / 100;
    series.push({ time: timeLabel, value });
  }
  return series;
}

function ChartSection({ data = [] }) {
	// prefer showing these metrics (order matters). Include TDS and DO.
	const keysToShow = ["tds", "do", "pH", "turbidity", "temperature", "wqi"];

	const graphs = data
		.filter((d) => keysToShow.includes(d.key))
		.map((d) => ({
			key: d.key,
			title: d.label,
			series: makeSeries(d.value),
		}))
		.sort((a, b) => keysToShow.indexOf(a.key) - keysToShow.indexOf(b.key))
		.slice(0, 5); // allow temperature plus other key charts

	// fallback: if none matched, show first up to 4 metrics
	const fallback =
		graphs.length === 0
			? data.slice(0, 4).map((d) => ({ key: d.key, title: d.label, series: makeSeries(d.value) }))
			: graphs;

	return (
		<section className="chart-section">
			<h2>Trends</h2>
			<div className="charts-grid">
				{fallback.map((g) => (
					<TrendGraph key={g.key} title={g.title} data={g.series} height={160} />
				))}
			</div>
		</section>
	);
}

export default ChartSection;
