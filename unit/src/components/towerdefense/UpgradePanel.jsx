// src/components/towerdefense/UpgradePanel.jsx
import { memo } from 'react';
import {
  Coins, Gauge, Swords, Maximize2, Target, Sparkles,
  Trash2, Check, Lock, X, ShieldAlert, Wand2
} from 'lucide-react';
import { TOWERS, getEffectiveStats, getSellValue } from './gameData';
import { TARGET_MODES, towerTargetingMode } from './useGameEngine';
import TowerVisual from './TowerVisual';

const UPGRADE_ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];
const UPGRADE_ICONS = {
  rate:      Gauge,
  damage:    Swords,
  range:     Maximize2,
  targeting: Target,
  passive:   Sparkles
};

function UpgradePanel({
  tower, towers, credits, onUpgrade, onSell, onClose, onSetTargetMode,
  unicornChargePct = 0, unicornReady = false,
  // Not read: the engine changes towers in place, so this stamp is what tells
  // the memo that an upgrade or a new target mode needs showing.
  // eslint-disable-next-line no-unused-vars -- a memo key
  towersVersion = 0
}) {
  if (!tower) {
    return (
      <aside className="hidden md:flex order-2 md:order-none w-56 lg:w-80 bg-slate-800 border-l-4 border-slate-950 flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 text-slate-500">
          <div className="text-lg font-black text-slate-300 mb-2">No tower selected</div>
          <div className="text-sm font-bold leading-relaxed">Tap any tower on the board to view upgrades.</div>
        </div>
      </aside>
    );
  }

  const tConf = TOWERS[tower.typeId];
  // Calculate fully derived stats directly from the board state
  const stats = getEffectiveStats(tower, towers);
  const sellValue = getSellValue(tower);
  const upgrades = tower.upgrades || {};
  const isUnicorn = tConf.type === 'UNICORN';
  // Towers that pick a target get a priority selector; the aura and the
  // hand-aimed unicorn have nothing to prioritise.
  const aims = tConf.type !== 'BUFF' && !isUnicorn;
  const smartLabel = upgrades.targeting ? tConf.upgrades?.targeting?.label : null;
  const activeMode = tower.targetMode || (smartLabel ? 'SMART' : towerTargetingMode(tower));
  const modes = smartLabel
    ? [...TARGET_MODES, { id: 'SMART', label: smartLabel, hint: tConf.upgrades.targeting.desc }]
    : TARGET_MODES;

  return (
    <aside className="order-2 md:order-none flex w-full md:w-56 lg:w-80 h-auto md:h-full bg-slate-800 md:border-l-4 border-b-4 md:border-b-0 border-slate-950 flex-col md:flex-col flex-shrink-0 z-20 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
      
      <div className="flex flex-row md:flex-col">
        {/* Name/Icon Card */}
        <div className={`relative ${tConf.accent} p-3 md:p-6 flex items-center md:border-b-4 border-slate-900 w-48 md:w-full shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all border-b-2 border-black/40 active:border-b-0 active:translate-y-[2px] z-10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-3 w-full">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center border-b-4 border-black/20 shadow-sm shrink-0">
              <TowerVisual typeId={tower.typeId} size="md" upgrades={upgrades} />
            </div>
            <div className="min-w-0 pr-6 md:pr-0">
              <div className="text-lg md:text-2xl font-black text-white leading-tight drop-shadow-sm truncate">{tConf.name}</div>
              <div className="text-[9px] md:text-[11px] font-bold text-white/90 leading-tight mt-0.5 line-clamp-2">{tConf.desc}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Live Stats Strip */}
        <div className="hidden sm:flex md:flex px-4 py-2 md:py-4 bg-slate-900 md:border-b-2 border-l-2 md:border-l-0 border-slate-700 flex-wrap gap-2 md:gap-4 text-xs font-black shadow-inner items-center shrink-0">
          {isUnicorn ? (
            <>
              <Stat label="DMG" value={stats.damage} modified={stats.damage !== tConf.base.damage} />
              <Stat label="CHARGE" value={`${(stats.chargeTime / 1000).toFixed(1)}s`} modified={stats.chargeTime !== tConf.base.chargeTime} />
              <Stat label="WIDTH" value={stats.beamWidth > tConf.base.beamWidth ? 'WIDE' : 'STD'} modified={stats.beamWidth !== tConf.base.beamWidth} />
              {stats.autoAim && <Stat label="AUTO" value="ON" modified={true} />}
              {stats.twin && <Stat label="TWIN" value="ON" modified={true} />}
            </>
          ) : tConf.type === 'BUFF' ? (
            <>
              <Stat label="AURA" value={stats.auraRange} modified={stats.auraRange !== tConf.base.auraRange} />
              <Stat label="BOOST" value={`+${Math.round((1 - stats.buff) * 100)}%`} modified={stats.buff !== tConf.base.buff} />
              {stats.rangeBoost && <Stat label="RNG" value="+1.5" modified={true} />}
              {stats.overcharge && <Stat label="DMG" value="+30%" modified={true} />}
            </>
          ) : (
            <>
              {stats.damage != null && <Stat label="DMG" value={stats.damage} modified={stats.damage !== tConf.base.damage} />}
              <Stat label="RNG" value={stats.range} modified={stats.range !== tConf.base.range} />
              <Stat label="CD"  value={`${(stats.cooldown / 1000).toFixed(1)}s`} modified={stats.cooldown !== tConf.base.cooldown} />
              {stats.pierce && <Stat label="PIERCE" value="YES" modified={true} />}
              {stats.armorPiercing && <Stat label="ARMOR PEN" value="YES" modified={true} />}
              {stats.napalm && <Stat label="NAPALM" value="YES" modified={true} />}
              {stats.frostBurst && <Stat label="BURST" value="YES" modified={true} />}
              {stats.bounces != null && <Stat label="CHAIN" value={stats.bounces} modified={stats.bounces !== tConf.base.bounces} />}
            </>
          )}
        </div>
      </div>

      {/* Unicorn firing hint — the rainbow ring on the board is the charge gauge,
          and firing is done there (tap the unicorn to aim, tap a square to fire). */}
      {isUnicorn && (
        <div className="px-3 py-2.5 md:px-4 md:py-3 bg-slate-900 border-b-2 md:border-b-0 border-slate-700 flex items-center gap-2.5 shrink-0">
          <Wand2 className={`w-5 h-5 shrink-0 ${unicornReady ? 'text-fuchsia-400 animate-pulse' : 'text-slate-500'}`} strokeWidth={2.5} />
          <div className="text-[11px] font-bold leading-snug">
            {unicornReady ? (
              <span className="text-fuchsia-300">Charged! Tap the unicorn, then tap a target to fire.</span>
            ) : (
              <span className="text-slate-400">Charging {Math.round(unicornChargePct * 100)}% — the rainbow ring fills as it powers up.</span>
            )}
          </div>
        </div>
      )}

      {/* Who to shoot. Free, instant, and the difference between a Marksman that
          wastes a 3-second shot on an ant and one that saves it for the Beetle. */}
      {aims && (
        <div className="px-3 py-2 md:px-4 md:py-3 bg-slate-900 border-b-2 md:border-b-0 border-t-2 md:border-t-0 border-slate-700 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <Target className="w-3 h-3" strokeWidth={3} /> Target
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 tabular-nums">
              {tower.kills || 0} kills · {formatDealt(tower.dealt || 0)} dmg
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => onSetTargetMode?.(m.id)}
                title={m.hint}
                aria-pressed={activeMode === m.id}
                className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border-b-2 active:border-b-0 active:translate-y-[2px]
                  ${activeMode === m.id
                    ? (m.id === 'SMART' ? 'bg-[#FFC800] border-[#b38c00] text-amber-950' : 'bg-[#1CB0F6] border-[#1899D6] text-white')
                    : 'bg-slate-700 border-slate-950 text-slate-300 hover:bg-slate-600'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upgrades Scrolling Container */}
      <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex flex-row md:flex-col gap-2 md:gap-3 custom-scrollbar bg-slate-800 border-t-2 md:border-t-0 border-slate-700">
        {UPGRADE_ORDER.map(key => {
          const upg = tConf.upgrades[key];
          if (!upg) return null;
          
          const ownedByMe = !!upgrades[key];
          const canAfford = credits >= upg.cost;
          const Icon = UPGRADE_ICONS[key];
          const isPassive = key === 'passive';
          
          const globalPassiveOwned = towers.some(t => t.typeId === tower.typeId && t.upgrades?.passive);
          const uniqueLocked = isPassive && tower.typeId !== 'DART' && globalPassiveOwned && !ownedByMe;

          let cls;
          if (ownedByMe) {
            cls = 'bg-[#58A700] border-b-[4px] border-[#46a802] text-white';
          } else if (uniqueLocked) {
            cls = 'bg-slate-800 border-b-[4px] border-slate-900 opacity-60 cursor-not-allowed text-slate-400 grayscale';
          } else if (!canAfford) {
            cls = 'bg-slate-700 border-b-[4px] border-slate-900 opacity-50 cursor-not-allowed text-slate-300';
          } else {
            cls = 'bg-slate-700 border-b-[4px] border-slate-900 hover:bg-slate-600 active:translate-y-[4px] active:border-b-0 cursor-pointer text-slate-100';
          }

          return (
            <button
              key={key}
              onClick={() => !ownedByMe && canAfford && !uniqueLocked && onUpgrade(key)}
              disabled={ownedByMe || !canAfford || uniqueLocked}
              className={`w-64 md:w-full flex-shrink-0 text-left rounded-2xl p-3 md:p-4 transition-all ${cls} relative`}
            >
              <div className="flex items-center gap-3 h-full">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner
                  ${ownedByMe ? 'bg-white/20' : uniqueLocked ? 'bg-slate-900' : 'bg-slate-800 border border-slate-600'}`}>
                  {ownedByMe 
                    ? <Check className="w-5 h-5 text-white" strokeWidth={4} />
                    : uniqueLocked
                      ? <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-slate-500" strokeWidth={2.5} />
                      : <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[13px] md:text-sm font-black leading-tight truncate drop-shadow-sm flex items-center gap-2">
                    {upg.label}
                    {isPassive && !uniqueLocked && !ownedByMe && tower.typeId !== 'DART' && <span className="text-[8px] bg-[#FFC800] text-amber-950 px-1.5 py-0.5 rounded uppercase tracking-widest">Unique</span>}
                  </div>
                  <div className={`text-[10px] md:text-[11px] font-bold mt-0.5 md:mt-1 line-clamp-2 ${ownedByMe ? 'text-green-100' : uniqueLocked ? 'text-slate-500' : 'text-slate-400'}`}>
                    {uniqueLocked ? "Owned by another tower" : upg.desc}
                  </div>
                </div>
                {!ownedByMe && !uniqueLocked && (
                  <div className={`flex flex-col items-center justify-center px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-[10px] md:text-xs font-black flex-shrink-0 bg-slate-900 shadow-inner
                    ${canAfford ? 'text-[#FFC800]' : 'text-slate-500'}`}>
                    {canAfford ? <Coins className="w-3 h-3 md:w-4 md:h-4 mb-0.5" strokeWidth={3} /> : <Lock className="w-3 h-3 md:w-4 md:h-4 mb-0.5" strokeWidth={3} />}
                    {upg.cost}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-2 md:p-4 border-t-2 border-slate-700 bg-slate-900 flex-shrink-0 w-auto">
        <button
          onClick={onSell}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl bg-rose-500 hover:bg-rose-600 border-b-[4px] border-rose-700 text-white font-black text-xs md:text-sm uppercase tracking-wider transition-all active:scale-95 active:translate-y-[4px] active:border-b-0 shadow-sm"
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
          Sell
          <span className="flex items-center gap-1 text-[#FFC800] bg-black/20 px-2 py-0.5 rounded-lg ml-1">
            <Coins className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
            {sellValue}
          </span>
        </button>
      </div>
    </aside>
  );
}

export default memo(UpgradePanel);

const formatDealt = (n) => (n >= 10000 ? `${(n / 1000).toFixed(1)}k` : Math.round(n));

function Stat({ label, value, modified }) {
  return (
    <div className={`flex flex-col gap-0.5 px-2 py-1 md:px-3 md:py-1.5 rounded-xl border shadow-inner min-w-[50px] transition-colors ${modified ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-800 border-slate-700'}`}>
      <span className={`text-[8px] md:text-[9px] tracking-widest leading-none ${modified ? 'text-indigo-300' : 'text-slate-400'}`}>{label}</span>
      <span className={`text-xs md:text-sm leading-none font-black ${modified ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-white'}`}>{value}</span>
    </div>
  );
}