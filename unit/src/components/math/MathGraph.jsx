import React, { useState, useMemo, useRef } from 'react';

// Safely evaluates standard math expressions without using eval()
const safeEvaluate = (eq, x) => {
  if (!eq) return x;
  let expr = eq.replace(/\s+/g, '')
               .replace(/e\^\(([^)]+)\)/g, 'Math.exp($1)') 
               .replace(/e\^x/g, 'Math.exp(x)')             
               .replace(/x\^2/g, '(x*x)')
               .replace(/x\^3/g, '(x*x*x)')
               .replace(/sin\(x\)/g, 'Math.sin(x)')
               .replace(/cos\(x\)/g, 'Math.cos(x)')
               .replace(/ln\(x\)/g, 'Math.log(x)');
  try {
    const func = new Function('x', 'Math', `return ${expr};`);
    return func(x, Math);
  } catch (e) {
    return 0;
  }
};

// Helper to calculate "nice" round numbers for grid lines
const getNiceStep = (span, maxTicks) => {
  const roughStep = span / maxTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const rel = roughStep / mag;
  let niceMult;
  if (rel < 1.5) niceMult = 1;
  else if (rel < 3) niceMult = 2;
  else if (rel < 7) niceMult = 5;
  else niceMult = 10;
  return niceMult * mag;
};

export default function MathGraph({ equation = 'e^x', xRange = [-3, 3], yRange = [0, 20] }) {
  const [sliderX, setSliderX] = useState(0);
  const containerRef = useRef(null);

  const width = 600;
  const height = 350;
  
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const mapX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const mapY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const xAxisY = clamp(mapY(0), 10, height - 10);
  const yAxisX = clamp(mapX(0), 10, width - 10);

  const xStep = getNiceStep(xMax - xMin, 8);
  const yStep = getNiceStep(yMax - yMin, 6);
  
  const xTicks = [];
  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) xTicks.push(x);
  
  const yTicks = [];
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) yTicks.push(y);

  const { pathData, areaData } = useMemo(() => {
    const points = [];
    const steps = 200; 
    const stepSize = (xMax - xMin) / steps;
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * stepSize;
      const y = safeEvaluate(equation, x);
      // Plot points extending slightly past the bounds to ensure smooth clipping
      if (y >= yMin - (yMax - yMin) && y <= yMax + (yMax - yMin)) {
         points.push(`${mapX(x)},${mapY(y)}`);
      }
    }
    
    if (points.length === 0) return { pathData: '', areaData: '' };
    
    const path = `M ${points.join(' L ')}`;
    const area = `${path} L ${points[points.length-1].split(',')[0]},${height} L ${points[0].split(',')[0]},${height} Z`;
    
    return { pathData: path, areaData: area };
  }, [equation, xMin, xMax, yMin, yMax, height]); // eslint-disable-line react-hooks/exhaustive-deps -- mapX/mapY are derived from these same bounds

  const currentY = safeEvaluate(equation, sliderX);
  const pointX = mapX(sliderX);
  const pointY = mapY(currentY);
  const isPointVisible = currentY >= yMin && currentY <= yMax;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center touch-none select-none" ref={containerRef}>
      
      <div className="w-full flex-1 min-h-[250px] relative flex flex-col items-center justify-center p-2 lg:p-4">
        <div className="w-full h-full relative max-w-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] shadow-inner overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1cb0f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1cb0f6" stopOpacity="0.0" />
              </linearGradient>
              <clipPath id="graphClip">
                <rect x="0" y="0" width={width} height={height} />
              </clipPath>
            </defs>

            {/* Grid Lines */}
            {xTicks.map(x => <line key={`gx-${x}`} x1={mapX(x)} y1="0" x2={mapX(x)} y2={height} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1.5" strokeDasharray="4 4" />)}
            {yTicks.map(y => <line key={`gy-${y}`} x1="0" y1={mapY(y)} x2={width} y2={mapY(y)} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1.5" strokeDasharray="4 4" />)}
            
            {/* Main Axes */}
            <line x1="0" y1={xAxisY} x2={width} y2={xAxisY} stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />
            <line x1={yAxisX} y1="0" x2={yAxisX} y2={height} stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />

            {/* Labels */}
            {xTicks.map(x => (
              <g key={`xt-${x}`}>
                <line x1={mapX(x)} y1={xAxisY - 4} x2={mapX(x)} y2={xAxisY + 4} stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                {x !== 0 && <text x={mapX(x)} y={xAxisY + 20} fontSize="12" textAnchor="middle" fill="currentColor" className="text-slate-500 font-bold">{parseFloat(x.toPrecision(3))}</text>}
              </g>
            ))}

            {yTicks.map(y => (
              <g key={`yt-${y}`}>
                <line x1={yAxisX - 4} y1={mapY(y)} x2={yAxisX + 4} y2={mapY(y)} stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                {y !== 0 && <text x={yAxisX - 8} y={mapY(y) + 4} fontSize="12" textAnchor="end" fill="currentColor" className="text-slate-500 font-bold">{parseFloat(y.toPrecision(3))}</text>}
              </g>
            ))}
            
            <text x={yAxisX - 8} y={xAxisY + 16} fontSize="12" textAnchor="end" fill="currentColor" className="text-slate-400 font-black">0</text>

            <g clipPath="url(#graphClip)">
              {areaData && <path d={areaData} fill="url(#curveFill)" />}
              {pathData && <path d={pathData} fill="none" stroke="#1cb0f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md" />}
            </g>

            {/* Tracers */}
            {isPointVisible && (
              <>
                <line x1={pointX} y1={xAxisY} x2={pointX} y2={pointY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <line x1={yAxisX} y1={pointY} x2={pointX} y2={pointY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <circle cx={pointX} cy={pointY} r="8" fill="#f59e0b" className="animate-pulse opacity-40" />
                <circle cx={pointX} cy={pointY} r="5" fill="#f59e0b" stroke="white" strokeWidth="2" className="drop-shadow-md" />
              </>
            )}
          </svg>

          {/* Dynamic Tooltip */}
          {isPointVisible && (
            <div 
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-[120%] transition-all duration-75 ease-out z-20"
              style={{ left: `${(pointX / width) * 100}%`, top: `${(pointY / height) * 100}%` }}
            >
              <div className="bg-slate-900/90 dark:bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-xl border border-white/20 dark:border-slate-800/20 text-white dark:text-slate-900 text-xs sm:text-sm font-mono font-bold flex flex-col items-center">
                <span>{parseFloat(sliderX).toFixed(2)}, {parseFloat(currentY).toFixed(2)}</span>
                <div className="absolute -bottom-1.5 w-3 h-3 bg-slate-900/90 dark:bg-white/95 rotate-45 border-r border-b border-white/20 dark:border-slate-800/20"></div>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-md font-mono text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 flex items-center">
            <span className="text-[#1cb0f6] mr-2">f(x) =</span> {equation}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-700 z-20 flex-shrink-0 mt-2">
        <div className="flex justify-between items-end mb-5">
          <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center shadow-inner">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mr-2 sm:mr-3">Domain (x)</span>
            <span className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200 font-mono w-20 text-right">{parseFloat(sliderX).toFixed(2)}</span>
          </div>
          
          <div className="bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/30 px-4 py-2 rounded-xl flex items-center shadow-inner">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1899d6] mr-2 sm:mr-3">Range (y)</span>
            <span className="text-xl sm:text-2xl font-black text-[#1cb0f6] font-mono w-20 text-right">
               {currentY > 999 ? '∞' : parseFloat(currentY).toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="relative flex items-center w-full px-2">
          <span className="text-slate-400 font-bold text-sm w-8 text-right mr-3">{xMin}</span>
          <input 
            type="range" 
            min={xMin} 
            max={xMax} 
            step={(xMax - xMin) / 300}
            value={sliderX} 
            onChange={(e) => setSliderX(parseFloat(e.target.value))} 
            className="flex-1 h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#f59e0b] hover:accent-[#d97706] transition-all"
          />
          <span className="text-slate-400 font-bold text-sm w-8 ml-3">{xMax}</span>
        </div>
      </div>
    </div>
  );
}