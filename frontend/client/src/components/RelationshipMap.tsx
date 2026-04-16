/**
 * RelationshipMap.tsx
 * Design: Modern Arabic Institutional
 * Interactive SVG-based relationship diagram showing coordination between 13 institutions
 * Central node: لجنة السلامة الرقمية (Committee)
 * Primary ring: 6 primary institutions
 * Supporting ring: 7 supporting institutions
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  shortLabel: string;
  tier: 'center' | 'primary' | 'supporting';
  color: string;
  x: number;
  y: number;
  description: string;
  connections: string[]; // IDs of nodes this connects to
}

interface Edge {
  from: string;
  to: string;
  type: 'hierarchy' | 'coordination' | 'support';
  label?: string;
}

const NODES: Node[] = [
  // Center
  {
    id: 'committee',
    label: 'لجنة السلامة الرقمية للأطفال والنشء',
    shortLabel: 'اللجنة الوطنية',
    tier: 'center',
    color: '#8D1B3D',
    x: 500, y: 340,
    description: 'الجهة التنسيقية العليا — قرار مجلس الوزراء رقم (38) لسنة 2025',
    connections: ['ncsa', 'mcit', 'cra', 'nic', 'moi', 'msf', 'moe', 'moph', 'moj', 'moc', 'moys', 'qu', 'qf'],
  },
  // Primary ring — 6 nodes arranged in inner circle
  {
    id: 'msf',
    label: 'وزارة التنمية الاجتماعية والأسرة',
    shortLabel: 'التنمية الاجتماعية',
    tier: 'primary',
    color: '#AD1457',
    x: 500, y: 170,
    description: 'رئاسة اللجنة الوطنية للسلامة الرقمية',
    connections: ['committee', 'moe', 'moph', 'moj'],
  },
  {
    id: 'ncsa',
    label: 'الوكالة الوطنية للأمن السيبراني',
    shortLabel: 'الأمن السيبراني',
    tier: 'primary',
    color: '#8D1B3D',
    x: 690, y: 215,
    description: 'نيابة رئاسة اللجنة — تطوير المناهج التعليمية',
    connections: ['committee', 'mcit', 'moe', 'qu'],
  },
  {
    id: 'mcit',
    label: 'وزارة الاتصالات وتكنولوجيا المعلومات',
    shortLabel: 'الاتصالات',
    tier: 'primary',
    color: '#1C2B3A',
    x: 760, y: 370,
    description: 'إصدار التشريعات الرقمية وتشغيل مبادرة سيف سبيس',
    connections: ['committee', 'cra', 'ncsa', 'qf'],
  },
  {
    id: 'cra',
    label: 'هيئة تنظيم الاتصالات',
    shortLabel: 'هيئة الاتصالات',
    tier: 'primary',
    color: '#C9A84C',
    x: 690, y: 510,
    description: 'الإشراف على المحتوى الرقمي والتنسيق الدولي',
    connections: ['committee', 'mcit', 'nic'],
  },
  {
    id: 'moi',
    label: 'وزارة الداخلية',
    shortLabel: 'الداخلية',
    tier: 'primary',
    color: '#7B1FA2',
    x: 310, y: 510,
    description: 'مكافحة الجرائم الإلكترونية وحماية الأطفال',
    connections: ['committee', 'moj', 'nic'],
  },
  {
    id: 'nic',
    label: 'اللجنة الوطنية لأمن المعلومات',
    shortLabel: 'أمن المعلومات',
    tier: 'primary',
    color: '#2E7D32',
    x: 240, y: 370,
    description: 'تنسيق الجهود الوطنية لأمن المعلومات',
    connections: ['committee', 'cra', 'moi', 'mcit'],
  },
  // Supporting ring — 7 nodes in outer circle
  {
    id: 'moe',
    label: 'وزارة التربية والتعليم',
    shortLabel: 'التربية والتعليم',
    tier: 'supporting',
    color: '#0277BD',
    x: 500, y: 55,
    description: 'دمج السلامة الرقمية في المناهج الدراسية',
    connections: ['committee', 'ncsa', 'msf', 'qf'],
  },
  {
    id: 'moph',
    label: 'وزارة الصحة العامة',
    shortLabel: 'الصحة',
    tier: 'supporting',
    color: '#00838F',
    x: 790, y: 130,
    description: 'معالجة التأثيرات النفسية للإدمان الرقمي',
    connections: ['committee', 'msf'],
  },
  {
    id: 'moc',
    label: 'وزارة الثقافة',
    shortLabel: 'الثقافة',
    tier: 'supporting',
    color: '#E65100',
    x: 880, y: 310,
    description: 'تصنيف المحتوى الرقمي وحماية الهوية الثقافية',
    connections: ['committee', 'mcit', 'cra'],
  },
  {
    id: 'moys',
    label: 'وزارة الرياضة والشباب',
    shortLabel: 'الرياضة والشباب',
    tier: 'supporting',
    color: '#1565C0',
    x: 820, y: 510,
    description: 'تعزيز السلوك الرقمي الإيجابي لدى الشباب',
    connections: ['committee', 'moe'],
  },
  {
    id: 'moj',
    label: 'وزارة العدل',
    shortLabel: 'العدل',
    tier: 'supporting',
    color: '#37474F',
    x: 180, y: 510,
    description: 'الإطار القانوني ومحكمة الأحداث',
    connections: ['committee', 'moi', 'msf'],
  },
  {
    id: 'qu',
    label: 'جامعة قطر',
    shortLabel: 'جامعة قطر',
    tier: 'supporting',
    color: '#4527A0',
    x: 120, y: 310,
    description: 'البحث العلمي وتطوير الكوادر المتخصصة',
    connections: ['committee', 'ncsa', 'qf'],
  },
  {
    id: 'qf',
    label: 'مؤسسة قطر للتربية والعلوم',
    shortLabel: 'مؤسسة قطر',
    tier: 'supporting',
    color: '#558B2F',
    x: 210, y: 130,
    description: 'دعم البحث والابتكار في التعليم الرقمي الآمن',
    connections: ['committee', 'moe', 'qu', 'mcit'],
  },
];

const EDGES: Edge[] = [
  // Hierarchy: committee → primary
  { from: 'committee', to: 'msf', type: 'hierarchy', label: 'رئاسة' },
  { from: 'committee', to: 'ncsa', type: 'hierarchy', label: 'نيابة الرئاسة' },
  { from: 'committee', to: 'mcit', type: 'hierarchy' },
  { from: 'committee', to: 'cra', type: 'hierarchy' },
  { from: 'committee', to: 'moi', type: 'hierarchy' },
  { from: 'committee', to: 'nic', type: 'hierarchy' },
  // Hierarchy: committee → supporting
  { from: 'committee', to: 'moe', type: 'support' },
  { from: 'committee', to: 'moph', type: 'support' },
  { from: 'committee', to: 'moc', type: 'support' },
  { from: 'committee', to: 'moys', type: 'support' },
  { from: 'committee', to: 'moj', type: 'support' },
  { from: 'committee', to: 'qu', type: 'support' },
  { from: 'committee', to: 'qf', type: 'support' },
  // Coordination between primaries
  { from: 'ncsa', to: 'moe', type: 'coordination', label: 'مناهج تعليمية' },
  { from: 'mcit', to: 'cra', type: 'coordination', label: 'تنظيم المحتوى' },
  { from: 'moi', to: 'moj', type: 'coordination', label: 'ملاحقة قضائية' },
  { from: 'nic', to: 'cra', type: 'coordination' },
  { from: 'msf', to: 'moph', type: 'coordination', label: 'دعم نفسي' },
  { from: 'ncsa', to: 'qu', type: 'coordination', label: 'بحث علمي' },
  { from: 'moe', to: 'qf', type: 'coordination', label: 'تعليم رقمي' },
  { from: 'mcit', to: 'qf', type: 'coordination' },
];

const NODE_RADIUS: Record<string, number> = {
  center: 44,
  primary: 34,
  supporting: 26,
};

export default function RelationshipMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const viewBox = `${-pan.x / scale} ${-pan.y / scale} ${1000 / scale} ${680 / scale}`;

  const getNode = (id: string) => NODES.find(n => n.id === id);

  const isHighlighted = (nodeId: string) => {
    if (!selectedNode && !hoveredNode) return true;
    const active = selectedNode || hoveredNode;
    if (nodeId === active) return true;
    const activeNode = getNode(active!);
    return activeNode?.connections.includes(nodeId) ?? false;
  };

  const isEdgeHighlighted = (edge: Edge) => {
    if (!selectedNode && !hoveredNode) return true;
    const active = selectedNode || hoveredNode;
    return edge.from === active || edge.to === active;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest('.node-group')) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale(s => Math.min(2.5, Math.max(0.4, s - e.deltaY * 0.001)));
  }, []);

  const resetView = () => { setScale(1); setPan({ x: 0, y: 0 }); setSelectedNode(null); };

  const selectedNodeData = selectedNode ? getNode(selectedNode) : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-black text-gray-900">خريطة العلاقات المؤسسية</h3>
          <p className="text-xs text-gray-500 mt-0.5">اضغط على أي مؤسسة لعرض علاقاتها التنسيقية</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setScale(s => Math.min(2.5, s + 0.2))} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors" title="تكبير">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setScale(s => Math.max(0.4, s - 0.2))} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors" title="تصغير">
            <ZoomOut size={16} />
          </button>
          <button onClick={resetView} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors" title="إعادة ضبط">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-5 py-2.5 bg-gray-50 border-b border-gray-100 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8D1B3D' }} />
          <span className="text-gray-600">اللجنة الوطنية</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-100 border-2 border-red-400" />
          <span className="text-gray-600">جهات رئيسية</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-400" />
          <span className="text-gray-600">جهات داعمة</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5" style={{ backgroundColor: '#8D1B3D' }} />
          <span className="text-gray-600">تسلسل هرمي</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-400" />
          <span className="text-gray-600">تنسيق مشترك</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative" style={{ height: '480px' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={viewBox}
          className={`select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <defs>
            {/* Glow filter for selected */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Arrow markers */}
            <marker id="arrow-hierarchy" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#8D1B3D" opacity="0.6" />
            </marker>
            <marker id="arrow-coordination" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#94A3B8" opacity="0.5" />
            </marker>
            <marker id="arrow-support" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#3B82F6" opacity="0.4" />
            </marker>
          </defs>

          {/* Background subtle grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F1F5F9" strokeWidth="0.5" />
          </pattern>
          <rect width="1000" height="680" fill="url(#grid)" />

          {/* Edges */}
          {EDGES.map((edge, i) => {
            const fromNode = getNode(edge.from);
            const toNode = getNode(edge.to);
            if (!fromNode || !toNode) return null;
            const highlighted = isEdgeHighlighted(edge);
            const opacity = (!selectedNode && !hoveredNode) ? 0.35 : highlighted ? 0.85 : 0.08;

            // Shorten line to not overlap node circles
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const fromR = NODE_RADIUS[fromNode.tier] + 2;
            const toR = NODE_RADIUS[toNode.tier] + 6;
            const x1 = fromNode.x + (dx / dist) * fromR;
            const y1 = fromNode.y + (dy / dist) * fromR;
            const x2 = toNode.x - (dx / dist) * toR;
            const y2 = toNode.y - (dy / dist) * toR;

            const isHierarchy = edge.type === 'hierarchy';
            const isSupport = edge.type === 'support';
            const strokeColor = isHierarchy ? '#8D1B3D' : isSupport ? '#3B82F6' : '#94A3B8';
            const strokeWidth = isHierarchy ? 1.8 : 1.2;
            const dashArray = edge.type === 'coordination' ? '5,4' : edge.type === 'support' ? '3,3' : undefined;

            return (
              <g key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={strokeColor}
                  strokeWidth={highlighted ? strokeWidth + 0.8 : strokeWidth}
                  strokeDasharray={dashArray}
                  opacity={opacity}
                  markerEnd={`url(#arrow-${edge.type})`}
                  style={{ transition: 'opacity 0.2s' }}
                />
                {edge.label && highlighted && (
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2 - 5}
                    textAnchor="middle"
                    fontSize="9"
                    fill={strokeColor}
                    opacity={0.9}
                    style={{ fontFamily: 'Lusail, sans-serif' }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map(node => {
            const r = NODE_RADIUS[node.tier];
            const highlighted = isHighlighted(node.id);
            const isSelected = selectedNode === node.id;
            const isHovered = hoveredNode === node.id;
            const opacity = highlighted ? 1 : 0.25;
            const isCenter = node.tier === 'center';

            return (
              <g
                key={node.id}
                className="node-group"
                style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                opacity={opacity}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer glow ring for selected/hovered */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={node.x} cy={node.y}
                    r={r + 8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.3"
                    filter="url(#glow)"
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={node.x} cy={node.y} r={r}
                  fill={isCenter ? node.color : 'white'}
                  stroke={node.color}
                  strokeWidth={isCenter ? 0 : isSelected ? 3 : 2}
                />

                {/* Inner fill for non-center */}
                {!isCenter && (
                  <circle
                    cx={node.x} cy={node.y} r={r - 4}
                    fill={node.color}
                    opacity={isSelected ? 1 : 0.15}
                  />
                )}

                {/* Short label */}
                <text
                  x={node.x} y={node.y + (isCenter ? 5 : 4)}
                  textAnchor="middle"
                  fontSize={isCenter ? 9 : node.tier === 'primary' ? 8 : 7}
                  fontWeight="700"
                  fill={isCenter ? 'white' : node.color}
                  style={{ fontFamily: 'Lusail, sans-serif', pointerEvents: 'none' }}
                >
                  {node.shortLabel.length > 10 ? node.shortLabel.substring(0, 9) + '…' : node.shortLabel}
                </text>

                {/* External label for primary/supporting */}
                {!isCenter && (isHovered || isSelected) && (
                  <text
                    x={node.x}
                    y={node.y + r + 14}
                    textAnchor="middle"
                    fontSize="8.5"
                    fill="#1C2B3A"
                    fontWeight="600"
                    style={{ fontFamily: 'Lusail, sans-serif', pointerEvents: 'none' }}
                  >
                    {node.label.length > 18 ? node.label.substring(0, 17) + '…' : node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Info panel for selected node */}
        {selectedNodeData && (
          <div
            className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs border-r-4 z-10"
            style={{ borderColor: selectedNodeData.color }}
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-2 left-2 p-1 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-2 mb-2 pr-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: selectedNodeData.color }}
              >
                {selectedNodeData.shortLabel.substring(0, 2)}
              </div>
              <div>
                <p className="text-xs font-black text-gray-900 leading-snug">{selectedNodeData.label}</p>
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: selectedNodeData.tier === 'center' ? '#FEF3C7' :
                      selectedNodeData.tier === 'primary' ? '#FEE2E2' : '#DBEAFE',
                    color: selectedNodeData.tier === 'center' ? '#92400E' :
                      selectedNodeData.tier === 'primary' ? '#991B1B' : '#1E40AF',
                  }}
                >
                  {selectedNodeData.tier === 'center' ? 'اللجنة الوطنية' :
                    selectedNodeData.tier === 'primary' ? 'جهة رئيسية' : 'جهة داعمة'}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">{selectedNodeData.description}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Info size={11} />
              <span>
                {selectedNodeData.connections.length} علاقة تنسيقية
              </span>
            </div>
          </div>
        )}

        {/* Hint when nothing selected */}
        {!selectedNode && !hoveredNode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/70 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
            اضغط على مؤسسة لعرض علاقاتها · اسحب للتنقل · استخدم عجلة الماوس للتكبير
          </div>
        )}
      </div>
    </div>
  );
}
