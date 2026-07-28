'use client';

import React, { useEffect, useState, useRef } from "react";
import BodyMapOrtho from "./BodyMapOrtho";
import CategoryGuide from "./CategoryGuide";

/* ─────────────────────────────────────────────────────────────────────────────
   ImpairmentPicker — the inline "add an impairment" surface.

   A self-contained browser: search, common-condition shortcuts, the body-system
   category grid, the orthopedics body map, and category → subcategory → disease
   drill-down. It owns its own navigation state (unlike the old full-screen
   version, whose state had to be lifted for the linked-disease flow). Selecting a
   disease hands it up via onDiseaseSelected; the builder adds it to the stack,
   opens its card, and closes this picker.

   Props:
     categories, onDiseaseSelected, onCommonConditionClick, onCategorySelected
     onClose()   — collapse the picker (only offered when the stack is non-empty)
     chosenIds   — Set of already-added disease ids (shown as "added")
     canClose    — whether to render the close affordance
───────────────────────────────────────────────────────────────────────────── */

const COMMON_CONDITIONS = [
  { id: "disease_205", name: "בקע דיסק", icon: "🦴" },
  { id: "disease_202", name: "גב תחתון", icon: "🔙" },
  { id: "disease_279", name: "ברך", icon: "🦵" },
  { id: "disease_234", name: "כתף", icon: "💪" },
  { id: "disease_361", name: "ירידה בשמיעה", icon: "👂" },
  { id: "disease_23", name: "סוכרת", icon: "💉" },
];

const BackArrow = () => (
  <svg height="20px" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
      fill="currentColor"
    />
  </svg>
);

export default function ImpairmentPicker({
  categories,
  onDiseaseSelected,
  onCommonConditionClick,
  onCategorySelected,
  onClose,
  chosenIds,
  canClose = true,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [hoveredSubcat, setHoveredSubcat] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef(null);

  const isChosen = (id) => chosenIds && chosenIds.has(id);

  // Debounced search
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        setSearchResults(await res.json());
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(searchTimerRef.current);
  }, [searchQuery]);

  const handleCategoryClick = async (category) => {
    const response = await fetch(`/api/categories/${category.id}`);
    const newCategory = await response.json();
    if (onCategorySelected) onCategorySelected(newCategory.name);

    if (!newCategory.subcategories) {
      setSelectedSubCategory(newCategory);
      if (newCategory.diseases && newCategory.diseases.length === 1) {
        onDiseaseSelected(newCategory.diseases[0]);
      }
    } else {
      setSelectedCategory(newCategory);
    }
  };

  const DiseaseButton = ({ disease }) => {
    const added = isChosen(disease.id);
    return (
      <button
        type="button"
        disabled={added}
        onClick={() => onDiseaseSelected(disease)}
        className={`w-full text-right p-3 bg-white rounded-lg border transition ${
          added
            ? "border-indigo-200 opacity-60 cursor-default"
            : "border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-900">{disease.name}</span>
          {added && <span className="shrink-0 text-xs text-indigo-600 font-medium">נוסף ✓</span>}
        </div>
        {disease.description && (
          <p className="font-normal text-xs text-gray-600 mt-0.5">{disease.description}</p>
        )}
      </button>
    );
  };

  /* Shared header with a title and (optional) close */
  const Header = ({ children, onBack, backTitle }) => (
    <div className="relative flex items-center mb-4 min-h-[2.5rem]">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          title={backTitle}
          className="absolute right-0 flex bg-white rounded-lg border border-indigo-200 p-2 items-center text-indigo-600 hover:bg-indigo-50 transition"
        >
          <BackArrow />
        </button>
      )}
      <h3 className={`w-full text-center text-lg font-bold text-indigo-800 ${onBack ? "px-12" : ""}`}>
        {children}
      </h3>
      {canClose && !onBack && (
        <button
          type="button"
          onClick={onClose}
          aria-label="סגירה"
          className="absolute left-0 flex bg-white rounded-lg border border-indigo-200 p-2 items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  // ── Subcategory disease list ──────────────────────────────────────────────
  if (selectedSubCategory) {
    return (
      <div dir="rtl" className="p-4 sm:p-5 bg-indigo-50 rounded-xl border border-indigo-200">
        <Header onBack={() => setSelectedSubCategory(null)} backTitle="חזרה">
          {selectedSubCategory.name}
        </Header>
        <div className="space-y-2">
          {selectedSubCategory.diseases.map((disease) => (
            <DiseaseButton key={disease.id} disease={disease} />
          ))}
        </div>
      </div>
    );
  }

  // ── Category contents (subcategories + direct diseases) ───────────────────
  if (selectedCategory) {
    const combinedItems = [
      ...(selectedCategory.subcategories || []),
      ...(selectedCategory.diseases || []),
    ];
    const isOrtho = selectedCategory.id === "category_2";
    const subcategoryItems = combinedItems.filter((item) => "diseases" in item);

    return (
      <div dir="rtl" className="p-4 sm:p-5 bg-indigo-50 rounded-xl border border-indigo-200">
        <Header onBack={() => setSelectedCategory(null)} backTitle="חזרה לקטגוריות">
          {selectedCategory.name}
        </Header>

        {isOrtho ? (
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="flex-shrink-0 self-center sm:self-start sm:sticky sm:top-4 max-w-[200px] mx-auto sm:mx-0 sm:max-w-none w-full sm:w-auto">
              <BodyMapOrtho
                items={subcategoryItems}
                highlightSubcat={hoveredSubcat}
                onSelect={(item) => setSelectedSubCategory(item)}
              />
            </div>
            <div className="flex-1 space-y-2 w-full">
              {combinedItems.map((item) => {
                const isSubCat = "diseases" in item;
                if (!isSubCat) return <DiseaseButton key={item.id} disease={item} />;
                const isHovered = hoveredSubcat === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSubCategory(item)}
                    onMouseEnter={() => setHoveredSubcat(item.id)}
                    onMouseLeave={() => setHoveredSubcat(null)}
                    className={`w-full text-right p-3 rounded-lg border transition ${
                      isHovered
                        ? "bg-indigo-100 border-indigo-500 shadow-sm"
                        : "bg-white border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400"
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    {item.description && (
                      <p className="font-normal text-xs text-gray-600 mt-0.5">{item.description}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {combinedItems.map((item) => {
              const isSubCat = "diseases" in item;
              if (!isSubCat) return <DiseaseButton key={item.id} disease={item} />;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSubCategory(item)}
                  className="w-full text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition"
                >
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  {item.description && (
                    <p className="font-normal text-xs text-gray-600 mt-0.5">{item.description}</p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Root: search + shortcuts + category grid ──────────────────────────────
  return (
    <div dir="rtl" className="p-4 sm:p-5 bg-indigo-50 rounded-xl border border-indigo-200">
      <Header>הוספת מחלה או ליקוי</Header>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 חיפוש מחלה לפי שם…"
          className="w-full px-4 py-2.5 rounded-lg border-2 border-indigo-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
        />
        {isSearching && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 text-xs">מחפש…</span>
        )}
        {searchQuery.trim().length >= 2 && (
          <div className="mt-1 bg-white rounded-lg border border-indigo-200 shadow-md overflow-hidden">
            {searchResults.length === 0 && !isSearching ? (
              <p className="px-4 py-3 text-sm text-gray-600">
                לא נמצאו תוצאות עבור &quot;{searchQuery}&quot;
              </p>
            ) : (
              searchResults.map((result) => {
                const added = isChosen(result.id);
                return (
                  <button
                    key={result.id}
                    type="button"
                    disabled={added}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      onCommonConditionClick && onCommonConditionClick(result.id);
                    }}
                    className={`w-full text-right px-4 py-3 border-b border-gray-100 last:border-0 transition ${
                      added ? "opacity-60 cursor-default" : "hover:bg-indigo-50"
                    }`}
                  >
                    <p className="text-sm font-semibold text-indigo-800">
                      {result.name} {added && <span className="text-xs text-indigo-600">· נוסף ✓</span>}
                    </p>
                    <p className="text-xs text-gray-600">{result.categoryName}</p>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Common conditions */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-indigo-800 mb-2">מחלות נפוצות — קיצור דרך</p>
        <div className="flex flex-wrap gap-2">
          {COMMON_CONDITIONS.map((cond) => {
            const added = isChosen(cond.id);
            return (
              <button
                key={cond.id}
                type="button"
                disabled={added}
                onClick={() => onCommonConditionClick && onCommonConditionClick(cond.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 bg-white text-sm font-medium transition ${
                  added
                    ? "border-indigo-200 text-indigo-400 opacity-60 cursor-default"
                    : "border-indigo-400 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-600"
                }`}
              >
                <span aria-hidden="true">{cond.icon}</span>
                <span>{cond.name}</span>
                {added && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* "Not sure where to start" */}
      <button
        type="button"
        onClick={() => setShowGuide(true)}
        className="w-full mb-4 p-3 bg-white border-2 border-dashed border-indigo-400 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-50 transition text-sm"
      >
        לא בטוח/ה איפה להתחיל? לחצ/י כאן לעזרה
      </button>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className="text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition"
          >
            <div className="flex flex-row items-center font-semibold text-gray-900">
              {category.svg && (
                <img className="ml-2" src={category.svg} style={{ width: "1.5em" }} alt="" />
              )}
              {category.name}
            </div>
          </button>
        ))}
      </div>

      {showGuide && (
        <CategoryGuide
          categories={categories}
          onCategoryClick={(cat) => {
            setShowGuide(false);
            handleCategoryClick(cat);
          }}
          onClose={() => setShowGuide(false)}
        />
      )}
    </div>
  );
}
