'use client'

import React, { useEffect, useState } from "react";
import BodyMapOrtho from "./BodyMapOrtho";

const DiseaseSelectionScreen = ({
  selectedCategory,
  selectedSubCategory,
  setSelectedCategory,
  setSelectedSubCategory,
  categories,
  onDiseaseSelected,
  chosenDiseases,
  onStartOver
}) => {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Tracks which subcategory text-button the user is hovering,
  // so the body map can highlight the matching region.
  const [hoveredSubcat, setHoveredSubcat] = useState(null);

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

  const handleCategoryClick = async (category) => {
    const response = await fetch(`/api/categories/${category.id}`);
    const newCategory = await response.json();

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

  if (selectedSubCategory) {
    return (
      <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200 screen-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-800">
            {selectedSubCategory.name}
          </h2>
          <button
            onClick={handleBackToSubCategories}
            className="mt-2 flex bg-white rounded-lg border border-indigo-200 p-2 items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
          >
            <svg
              height="25px"
              width="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                  fill="#5a67d8"
                ></path>{" "}
              </g>
            </svg>
            <span >חזור ל{selectedCategory?.name || "קטגוריות"}</span>
          </button>
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
          <h2 className="text-2xl font-bold text-indigo-800 mb-4 p-4">
            בחר/י קטגוריה
          </h2>
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

  // Shared back-arrow icon
  const BackArrow = () => (
    <svg height="25px" width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
        fill="#5a67d8" />
    </svg>
  );

  return (
    <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200 screen-container">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">
          {selectedCategory.name}
        </h2>
        <button
          onClick={handleBackToCategories}
          className="mt-2 flex bg-white rounded-lg border border-indigo-200 p-2 items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
        >
          <BackArrow />
          <span>חזור לקטגוריות</span>
        </button>
      </div>

      {isOrtho ? (
        /* ── Orthopedics: body map + list side by side ─────────────────── */
        <div className="flex flex-col sm:flex-row gap-5 items-start">

          {/* Body map */}
          <div className="flex-shrink-0 self-center sm:self-start sm:sticky sm:top-4">
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
                  className={`w-full text-right p-3 rounded-lg border transition ${
                    isHovered
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
