'use client';
import { useState } from 'react';

// ── Region → subcategory mapping ──────────────────────────────────────────────
// Each entry lists the SVG region IDs that belong to a given subcategory.
const SUBCAT_REGIONS = {
  sub_cat_skull:            ['head'],
  sub_cat_spine:            ['spine'],
  sub_cat_chest:            ['l_chest', 'r_chest'],
  sub_cat_shoulder:         ['l_shoulder', 'r_shoulder'],
  sub_cat_shoulder_muscles: ['l_shld_musc', 'r_shld_musc'],
  sub_cat_arm:              ['l_uarm', 'r_uarm'],
  sub_cat_elbow:            ['l_elbow', 'r_elbow'],
  sub_cat_elbow_muscles:    ['l_farm', 'r_farm'],
  sub_cat_palm_fingers:     ['l_hand', 'r_hand'],
  sub_cat_hip:              ['hip'],
  sub_cat_leg:              ['l_thigh', 'r_thigh', 'l_shin', 'r_shin'],
  sub_cat_knee:             ['l_knee', 'r_knee'],
  sub_cat_feet:             ['l_foot', 'r_foot'],
  sub_cat_feet_fingers:     ['l_toes', 'r_toes'],
  // sub_cat_joints has no specific region — it covers the whole body
};

// Reverse map: region ID → subcategory ID
const REGION_SUBCAT = Object.fromEntries(
  Object.entries(SUBCAT_REGIONS).flatMap(([sub, regs]) =>
    regs.map((r) => [r, sub])
  )
);

// ── Component ─────────────────────────────────────────────────────────────────
/**
 * Interactive SVG body map for the orthopedics category.
 *
 * Props:
 *   items          – array of subcategory objects (each has .id and .name)
 *   highlightSubcat – subcategory id to highlight (driven by list hover)
 *   onSelect       – callback(item) when a region is clicked
 */
export default function BodyMapOrtho({ items = [], highlightSubcat, onSelect }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Which subcategory is currently active (map hover takes precedence)
  const activeSubcat = hoveredRegion
    ? REGION_SUBCAT[hoveredRegion]
    : highlightSubcat ?? null;

  const isActive = (regionId) =>
    REGION_SUBCAT[regionId] && REGION_SUBCAT[regionId] === activeSubcat;

  /** Returns SVG props for a clickable body region. */
  const rp = (regionId) => {
    const active = isActive(regionId);
    const subcatId = REGION_SUBCAT[regionId];
    const label = items.find((i) => i.id === subcatId)?.name ?? '';
    return {
      fill:        active ? '#6366f1' : '#c7d2fe',
      stroke:      active ? '#3730a3' : '#818cf8',
      strokeWidth: active ? 2 : 1,
      style:       { cursor: 'pointer', transition: 'fill 0.12s, stroke 0.12s' },
      'aria-label': label,
      role:         'button',
      onMouseEnter: () => setHoveredRegion(regionId),
      onMouseLeave: () => setHoveredRegion(null),
      onClick: () => {
        if (!subcatId) return;
        const item = items.find((i) => i.id === subcatId);
        if (item) onSelect(item);
      },
    };
  };

  const tooltipLabel = activeSubcat
    ? items.find((i) => i.id === activeSubcat)?.name
    : null;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Instruction / tooltip label */}
      <div className="mb-1 h-7 flex items-center justify-center">
        {tooltipLabel ? (
          <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-0.5 rounded-full">
            {tooltipLabel}
          </span>
        ) : (
          <span className="text-xs text-gray-400">לחצ/י על אזור בגוף</span>
        )}
      </div>

      {/* ── SVG body ───────────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 260 535"
        width="160"
        height="330"
        aria-label="מפת גוף אינטראקטיבית – אורתופדיה"
        role="img"
      >
        {/* ── Background silhouette (decorative, not clickable) ───────────── */}
        <g fill="#f0f4ff" stroke="#c7d2fe" strokeWidth="1.5">
          {/* Head */}
          <ellipse cx="130" cy="46" rx="33" ry="37" />
          {/* Neck */}
          <rect x="119" y="81" width="22" height="19" rx="4" />
          {/* Torso */}
          <rect x="82" y="98" width="96" height="164" rx="8" />
          {/* Hip */}
          <rect x="84" y="260" width="92" height="56" rx="12" />
          {/* L arm */}
          <rect x="38" y="98" width="26" height="244" rx="10" />
          {/* R arm */}
          <rect x="196" y="98" width="26" height="244" rx="10" />
          {/* L hand */}
          <rect x="36" y="340" width="30" height="46" rx="10" />
          {/* R hand */}
          <rect x="194" y="340" width="30" height="46" rx="10" />
          {/* L leg */}
          <rect x="85" y="313" width="40" height="190" rx="10" />
          {/* R leg */}
          <rect x="135" y="313" width="40" height="190" rx="10" />
          {/* L foot */}
          <rect x="70" y="501" width="56" height="34" rx="10" />
          {/* R foot */}
          <rect x="134" y="501" width="56" height="34" rx="10" />
        </g>

        {/* Face details (non-clickable) */}
        <circle cx="120" cy="41" r="3.5" fill="#94a3b8" />
        <circle cx="140" cy="41" r="3.5" fill="#94a3b8" />
        <path d="M 121 55 Q 130 61 139 55" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ── Clickable regions ───────────────────────────────────────────── */}

        {/* HEAD – גולגולת */}
        <ellipse cx="130" cy="46" rx="33" ry="37" {...rp('head')} />

        {/* CHEST (two halves, spine sits on top) – בית החזה */}
        <rect x="84"  y="100" width="36" height="92" rx="4" {...rp('l_chest')} />
        <rect x="140" y="100" width="36" height="92" rx="4" {...rp('r_chest')} />

        {/* SPINE (center strip) – עמוד השדרה */}
        <rect x="120" y="98" width="20" height="166" rx="4" {...rp('spine')} />

        {/* SHOULDER JOINTS (L + R) – כתפיים */}
        <ellipse cx="78"  cy="104" rx="22" ry="17" {...rp('l_shoulder')} />
        <ellipse cx="182" cy="104" rx="22" ry="17" {...rp('r_shoulder')} />

        {/* SHOULDER MUSCLES – deltoid cap (L + R) – שרירי הכתף */}
        <ellipse cx="43"  cy="136" rx="14" ry="24" {...rp('l_shld_musc')} />
        <ellipse cx="217" cy="136" rx="14" ry="24" {...rp('r_shld_musc')} />

        {/* UPPER ARM – humerus (L + R) – זרוע וכף יד */}
        <rect x="40"  y="158" width="20" height="60" rx="8" {...rp('l_uarm')} />
        <rect x="200" y="158" width="20" height="60" rx="8" {...rp('r_uarm')} />

        {/* ELBOW JOINTS (L + R) – מרפק */}
        <ellipse cx="50"  cy="222" rx="13" ry="12" {...rp('l_elbow')} />
        <ellipse cx="210" cy="222" rx="13" ry="12" {...rp('r_elbow')} />

        {/* FOREARM MUSCLES – biceps / triceps / flexors (L + R) – שרירי המרפק */}
        <rect x="40"  y="232" width="20" height="62" rx="8" {...rp('l_farm')} />
        <rect x="200" y="232" width="20" height="62" rx="8" {...rp('r_farm')} />

        {/* HAND + FINGERS (L + R) – אצבעות הידיים */}
        <rect x="38"  y="292" width="24" height="52" rx="8" {...rp('l_hand')} />
        <rect x="198" y="292" width="24" height="52" rx="8" {...rp('r_hand')} />

        {/* HIP / PELVIS – אגן */}
        <rect x="86" y="262" width="88" height="52" rx="10" {...rp('hip')} />

        {/* THIGHS (L + R) – ירך */}
        <rect x="87"  y="312" width="36" height="88" rx="8" {...rp('l_thigh')} />
        <rect x="137" y="312" width="36" height="88" rx="8" {...rp('r_thigh')} />

        {/* KNEES (L + R) – ברך */}
        <ellipse cx="105" cy="404" rx="18" ry="14" {...rp('l_knee')} />
        <ellipse cx="155" cy="404" rx="18" ry="14" {...rp('r_knee')} />

        {/* SHINS (L + R) – שוק */}
        <rect x="89"  y="416" width="32" height="86" rx="8" {...rp('l_shin')} />
        <rect x="139" y="416" width="32" height="86" rx="8" {...rp('r_shin')} />

        {/* FEET (L + R) – כף רגל */}
        <rect x="73"  y="500" width="50" height="22" rx="7" {...rp('l_foot')} />
        <rect x="137" y="500" width="50" height="22" rx="7" {...rp('r_foot')} />

        {/* TOES (L + R) – אצבעות הרגליים */}
        <rect x="73"  y="520" width="50" height="14" rx="5" {...rp('l_toes')} />
        <rect x="137" y="520" width="50" height="14" rx="5" {...rp('r_toes')} />
      </svg>

      {/* Legend */}
      <p className="mt-1 text-xs text-gray-400 text-center leading-tight">
        ריחוף = הדגשה
        <br />
        לחיצה = בחירה
      </p>
    </div>
  );
}
