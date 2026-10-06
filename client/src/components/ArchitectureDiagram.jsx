function FlowDiagram({ nodes }) {
  const positions = nodes.length === 3 ? [30, 125, 220] : [6, 84, 162, 240];

  return (
    <svg className="architecture-diagram" viewBox="0 0 320 70" aria-hidden="true" focusable="false">
      {nodes.slice(0, -1).map((node, index) => {
        const x1 = positions[index] + 70;
        const x2 = positions[index + 1] - 5;
        return (
          <g className="architecture-connector" style={{ '--diagram-delay': `${index * 45}ms` }} key={`${node.label}-connector`}>
            <path d={`M ${x1} 35 H ${x2}`} />
            <path d={`M ${x2 - 4} 31 L ${x2} 35 L ${x2 - 4} 39`} />
          </g>
        );
      })}
      {nodes.map((node, index) => (
        <g className="architecture-node" style={{ '--diagram-delay': `${index * 40}ms` }} key={`${node.label}-${index}`}>
          <rect x={positions[index]} y="16" width="70" height="38" rx="2" />
          <text x={positions[index] + 35} y={node.detail ? '32' : '39'} textAnchor="middle">
            <tspan x={positions[index] + 35}>{node.label}</tspan>
            {node.detail && <tspan x={positions[index] + 35} dy="13">{node.detail}</tspan>}
          </text>
        </g>
      ))}
    </svg>
  );
}

function BranchDiagram({ diagram }) {
  const { input, branches, output } = diagram;
  return (
    <svg className="architecture-diagram branch-diagram" viewBox="0 0 320 110" aria-hidden="true" focusable="false">
      <g className="architecture-connector" style={{ '--diagram-delay': '0ms' }}>
        <path d="M 83 55 H 101 V 31 H 112 M 101 55 V 79 H 112" />
        <path d="M 108 27 L 112 31 L 108 35 M 108 75 L 112 79 L 108 83" />
      </g>
      <g className="architecture-connector" style={{ '--diagram-delay': '90ms' }}>
        <path d="M 204 31 H 221 V 55 H 237 M 204 79 H 221 V 55" />
        <path d="M 233 51 L 237 55 L 233 59" />
      </g>
      <g className="architecture-node">
        <rect x="5" y="36" width="78" height="38" rx="2" />
        <text x="44" y="52" textAnchor="middle"><tspan x="44">{input.label}</tspan><tspan x="44" dy="13">{input.detail}</tspan></text>
      </g>
      {branches.map((node, index) => {
        const y = index === 0 ? 12 : 60;
        return (
          <g className="architecture-node" style={{ '--diagram-delay': `${70 + index * 60}ms` }} key={node.label}>
            <rect x="112" y={y} width="92" height="38" rx="2" />
            <text x="158" y={y + 16} textAnchor="middle"><tspan x="158">{node.label}</tspan><tspan x="158" dy="13">{node.detail}</tspan></text>
          </g>
        );
      })}
      <g className="architecture-node" style={{ '--diagram-delay': '160ms' }}>
        <rect x="237" y="36" width="78" height="38" rx="2" />
        <text x="276" y="52" textAnchor="middle"><tspan x="276">{output.label}</tspan><tspan x="276" dy="13">{output.detail}</tspan></text>
      </g>
    </svg>
  );
}

export default function ArchitectureDiagram({ diagram }) {
  if (!diagram) return null;
  return diagram.layout === 'branch'
    ? <BranchDiagram diagram={diagram} />
    : <FlowDiagram nodes={diagram.nodes} />;
}
