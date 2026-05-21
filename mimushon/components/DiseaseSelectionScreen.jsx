'use client'

import React, { useEffect, useState, useRef } from "react";
import BodyMapOrtho from "./BodyMapOrtho";
import CategoryGuide from "./CategoryGuide";

const COMMON_CONDITIONS = [
  { id: 'disease_205', name: 'בקע דיסק', icon: '🦴' },
  { id: 'disease_202', name: 'גב תחתון', icon: '🔙' },
  { id: 'disease_279', name: 'ברך', icon: '🦵' },
  { id: 'disease_234', name: 'כתף', icon: '💪' },
  { id: 'disease_361', name: 'ירידה בשמיעה', icon: '👂' },
  { id: 'disease_23', name: 'סוכרת', icon: '💉' },
];

const DiseaseSelectionScreen = ({
  selectedCategory,
  selectedSubCategory,
  setSelectedCategory,
  setSelectedSubCategory,
  categories,
  onDiseaseSelected,
  chosenDiseases,
  onStartOver,
  onCommonConditionClick,
  onCategorySelected,
}) => {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Tracks which subcategory text-button the user is hovering,
  // so the body map can highlight the matching region.
  const [hoveredSubcat, setHoveredSubcat] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef(null);

  useEffect(() => {
    if (selectedCategory || selectedSubCategory) {
      const section = document.getElementById("calculator");
      if (section) {
        section.scrollIntoView({
          behavior: "smooth", // This makes the scroll smooth
          block: "start", // Aligns the top of the element with the top of the viewport
        })
      }
    }
    console.log(selectedCategory, selectedSubCategory)
  }, [selectedCategory, selectedSubCategory])

  // Debounced search effect
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
        const data = await res.json();
        setSearchResults(data);
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

    if (onCategorySelected) {
      onCategorySelected(newCategory.name);
    }

    if (!newCategory.subcategories) {
      setSelectedSubCategory(newCategory); // Treat it like a subcategory with its diseases
      if (newCategory.diseases.length === 1) {
        onDiseaseSelected(newCategory.diseases[0]);
      }
    } else {
      setSelectedCategory(newCategory);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleBackToSubCategories = () => {
    setSelectedSubCategory(null);
  };

  const StartOverButton = () => {
    return (
      <div className="flex justify-center">
        <button className="bg-indigo-600 text-white p-3 rounded-lg" onClick={onStartOver}>אפס מחשבון</button>
      </div>
    )
  }

  // Shared back-arrow icon — declared before any early returns so it's always in scope
  const BackArrow = () => (
    <svg height="22px" width="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
        fill="#5a67d8" />
    </svg>
  );

  if (selectedSubCategory) {
    return (
      <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200 screen-container">
        <div className="relative flex items-center mb-4">
          <button
            onClick={handleBackToSubCategories}
            title={`חזור ל${selectedCategory?.name || "קטגוריות"}`}
            className="absolute right-0 flex bg-white rounded-lg border border-indigo-200 p-2 items-center text-indigo-600 hover:bg-indigo-50 transition"
          >
            <BackArrow />
          </button>
          <h2 className="w-full text-center text-2xl font-bold text-indigo-800 px-14">
            {selectedSubCategory.name}
          </h2>
        </div>
        <div className="space-y-2">
          {selectedSubCategory.diseases.map((disease) => (
            <button
              key={disease.id}
              onClick={() => onDiseaseSelected(disease)}
              className="w-full text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition"
            >
              <div className="font-semibold">{disease.name}</div>
              <p className="font-normal text-xs text-gray-600">
                {disease.description}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-6">
          <StartOverButton />
        </div>
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div className="bg-indigo-50 rounded-xl border border-indigo-200 screen-container select-category" id="select-category">
        <>
          {/* Search box */}
          <div className="px-4 pt-4 pb-2 relative">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 חפש/י מחלה לפי שם..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-sm"
                dir="rtl"
              />
              {isSearching && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-xs">מחפש...</span>
              )}
            </div>
            {searchQuery.trim().length >= 2 && (
              <div className="mt-1 bg-white rounded-xl border border-indigo-200 shadow-md overflow-hidden z-10">
                {searchResults.length === 0 && !isSearching ? (
                  <p className="px-4 py-3 text-sm text-gray-500">לא נמצאו תוצאות עבור &quot;{searchQuery}&quot;</p>
                ) : (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        onCommonConditionClick && onCommonConditionClick(result.id);
                      }}
                      className="w-full text-right px-4 py-3 hover:bg-indigo-50 transition border-b border-gray-100 last:border-0"
                    >
                      <p className="text-sm font-semibold text-indigo-800">{result.name}</p>
                      <p className="text-xs text-gray-500">{result.categoryName}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="border-t border-indigo-200 mx-4 mt-1 mb-0" />

          {/* Common conditions shortcuts */}
          <div className="px-4 pt-3 pb-2">
            <h3 className="text-base font-bold text-indigo-800 mb-0.5">קיצורי דרך – מחלות נפוצות</h3>
            <p className="text-xs text-gray-500 mb-3">לחצ/י ישירות על המחלה שלך</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_CONDITIONS.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => onCommonConditionClick && onCommonConditionClick(cond.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-indigo-400 bg-white text-indigo-700 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-600 transition"
                >
                  <span>{cond.icon}</span>
                  <span>{cond.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-indigo-200 mx-4 mt-2" />

          <h2 className="text-2xl font-bold text-indigo-800 mb-4 p-4">
            בחר/י קטגוריה
          </h2>
          <div className="px-3">
            <button
              onClick={() => setShowGuide(true)}
              className="w-full mb-4 p-3 bg-white border-2 border-dashed border-indigo-400 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              לא בטוח/ה איפה להתחיל? לחצ/י כאן לעזרה
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 p-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                id={category.id}
                onClick={() => handleCategoryClick(category)}
                className="text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition"
              >
                <div className="flex flex-row font-semibold">
                  <img
                    className="ml-2"
                    src={category.svg}
                    style={{ width: "1.5em" }}
                    alt="אייקון קטגוריה"
                  />
                  {category.name}
                </div>
              </button>
            ))}
          </div>
          {chosenDiseases.length > 0 && (
            <div className="flex justify-center">
              {/* <button onClick={() => {setCurrentScreen("summary")}} className="w-75 mt-6 p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">עבור לסיכום המחלות שנבחרו</button> */}
            </div>
          )}
        </>
        <div className="pb-6 mt-3">
          <StartOverButton />
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

  const combinedItems = [
    ...(selectedCategory.subcategories || []),
    ...(selectedCategory.diseases || []),
  ];

  // Show interactive body map for the Orthopedics & Trauma category
  const isOrtho = selectedCategory.id === 'category_2';
  const subcategoryItems = combinedItems.filter((item) => 'diseases' in item);

  // BackArrow is declared earlier (before early returns) — no duplicate needed here

  return (
    <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200 screen-container">
      {/* Header */}
      <div className="relative flex items-center mb-4">
        <button
          onClick={handleBackToCategories}
          title="חזור לקטגוריות"
          className="absolute right-0 flex bg-white rounded-lg border border-indigo-200 p-2 items-center text-indigo-600 hover:bg-indigo-50 transition"
        >
          <BackArrow />
        </button>
        <h2 className="w-full text-center text-2xl font-bold text-indigo-800 px-14">
          {selectedCategory.name}
        </h2>
      </div>

      {isOrtho ? (
        /* ── Orthopedics: body map + list side by side ─────────────────── */
        <div className="flex flex-col sm:flex-row gap-5 items-start">

          {/* Body map */}
          <div className="flex-shrink-0 self-center sm:self-start sm:sticky sm:top-4 max-w-[200px] mx-auto sm:mx-0 sm:max-w-none w-full sm:w-auto">
            <BodyMapOrtho
              items={subcategoryItems}
              highlightSubcat={hoveredSubcat}
              onSelect={(item) => setSelectedSubCategory(item)}
            />
          </div>

          {/* Subcategory + disease list */}
          <div className="flex-1 space-y-2 w-full">
            {combinedItems.map((item) => {
              const isSubCat = 'diseases' in item;
              const isHovered = isSubCat && hoveredSubcat === item.id;

              if (!isSubCat) {
                // Direct disease (no sub-category)
                return (
                  <button
                    key={item.id}
                    onClick={() => onDiseaseSelected(item)}
                    className="font-semibold w-full text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition"
                  >
                    {item.name}
                    <p className="font-normal text-xs text-gray-600">{item.description}</p>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSubCategory(item)}
                  onMouseEnter={() => setHoveredSubcat(item.id)}
                  onMouseLeave={() => setHoveredSubcat(null)}
                  className={`w-full text-right p-3 rounded-lg border transition ${isHovered
                      ? 'bg-indigo-100 border-indigo-500 shadow-sm'
                      : 'bg-white border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400'
                    }`}
                >
                  <div className="font-semibold">{item.name}</div>
                  {item.description && (
                    <p className="font-normal text-xs text-gray-600 mt-0.5">{item.description}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── All other categories: standard list ────────────────────────── */
        <div className="space-y-2">
          {combinedItems.map((item) => {
            const isSubCategory = 'diseases' in item;
            if (!isSubCategory) {
              return (
                <button
                  key={item.id}
                  onClick={() => onDiseaseSelected(item)}
                  className="font-semibold w-full text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition"
                >
                  {item.name}
                  <p className="font-normal text-xs text-gray-600">{item.description}</p>
                </button>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSubCategory(item)}
                className="w-full text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition"
              >
                <div className="font-semibold">{item.name}</div>
                <p className="font-normal text-xs text-gray-600">{item.description}</p>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        <StartOverButton />
      </div>
    </div>
  );
};

export default DiseaseSelectionScreen;
