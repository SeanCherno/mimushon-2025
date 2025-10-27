import React, { useEffect } from "react"

const DiseaseSelectionScreen = ({ selectedCategory, selectedSubCategory, setSelectedCategory, setSelectedSubCategory, showInfo, setShowInfo, categories, onDiseaseSelected, chosenDiseases, setCurrentScreen }) => {
    // const [selectedCategory, setSelectedCategory] = useState(null);
    // const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    useEffect(() => {
  const section = document.getElementById("calculator");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // This makes the scroll smooth
        block: "start", // Aligns the top of the element with the top of the viewport
      })}
    }, [selectedCategory, selectedSubCategory])

    const handleCategoryClick = async (category) => {
      const response = await fetch (`/api/categories/${category.id}`)
      const newCategory = await response.json()

        if (!newCategory.subcategories) {
            setSelectedSubCategory(newCategory); // Treat it like a subcategory with its diseases
            if(newCategory.diseases.length === 1){
              onDiseaseSelected(newCategory.diseases[0])
            }
        }
        else {setSelectedCategory(newCategory);}
    };
    
    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
    };

    const handleBackToSubCategories = () => {
        setSelectedSubCategory(null);
    };


    
  if (!categories || categories.length === 0) {
    return <div>Loading...</div>
  }

    if (selectedSubCategory) {
    return (
      <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-800">{selectedSubCategory.name}</h2>
               <button 
  onClick={handleBackToSubCategories} 
  className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
>
  <svg height="25px" width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#5a67d8"></path> </g></svg>
  <span>חזור ל{selectedCategory?.name || "קטגוריות"}</span>
</button>
        </div>
        <div className="space-y-2">
          {selectedSubCategory.diseases.map(disease => (
            <button key={disease.id} onClick={() => onDiseaseSelected(disease)} className="w-full text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition">
              <div className="font-semibold">{disease.name}</div>
              <p className="font-normal text-xs text-gray-600">{disease.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

    if (!selectedCategory) {
        return (
            <div className="bg-indigo-50 rounded-xl border border-indigo-200">
                <>
                    <h2 className="text-2xl font-bold text-indigo-800 mb-4 p-4">בחר/י קטגוריה</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 p-3 gap-4">
                        {categories.map(category => (
                            <button 
                                key={category.id} 
                                id={category.id}
                                onClick={() => handleCategoryClick(category)}
                                className="text-right p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition"
                            >
                                <div className="flex flex-row font-semibold">
                                    <img className="ml-2" src={category.svg} style={{ width: '1.5em' }} alt="" />
                                    {category.name}
                                </div>
                            </button>
                        ))}
                    </div>
                    {chosenDiseases.length > 0 && <div className="flex justify-center">
                {/* <button onClick={() => {setCurrentScreen("summary")}} className="w-75 mt-6 p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">עבור לסיכום המחלות שנבחרו</button> */}
            </div>}
                </>
          <div id="calculation-exp" />
          <div className="p-3">
          <button
            onClick={() => {
              setShowInfo(!showInfo)
            }}
            className="w-full border border-indigo-200 flex items-center justify-between p-3 bg-white rounded-lg font-semibold hover:bg-indigo-300 transition duration-200 ease-in-out mt-2"
          >
            <span>איך עובדת שיטת החישוב?</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
           </button>
           </div>
          {showInfo && 
          <div>
          <ol className="mt-2 list-decimal list-inside bg-slate-50 p-4 rounded-lg border border-indigo-200 space-y-1">
            <p className="font-semibold">זה לא חיבור פשוט — זו שיטה מבוססת, שקופה וברורה. <br /><br /></p>
            <li>
                מתחילים מהליקוי עם אחוז הנכות הגבוה ביותר, מתוך 100%.
            </li>
            <li>
                הליקוי הבא מחושב מתוך האחוזים שנותרו, לא מתוך 100%.
            </li>
            <li>
               כל ליקוי נוסף מחושב מתוך מה שנותר לאחר הקודם. 
            </li>
            <li>
                התוצאות מכל שלב מצטברות — ואם מתקבל שבר, הוא מעוגל כלפי מעלה.
            </li>
            <br /><br />
            <p className="font-semibold">כך מתקבל אחוז נכות משוקלל, שמייצג בצורה מדויקת את ההשפעה המצטברת של הליקויים שלך, בהתאם לתקנות הביטוח הלאומי.</p>
          </ol>
          </div>}
        </div>
        );
    }

    const combinedItems = [
    ...(selectedCategory.subcategories || []),
    ...(selectedCategory.diseases || [])
  ];

  return (
    <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">{selectedCategory.name}</h2>
                      <button 
  onClick={handleBackToCategories} 
  className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
>
  <svg height="25px" width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#5a67d8"></path> </g></svg>
  <span>חזור לקטגוריות</span>
</button>
      </div>
      <div className="space-y-2">
        {combinedItems.map(item => {
          // To tell them apart, we check for a property that only sub-categories have, like 'description' or another 'diseases' array.
          // Here, we'll use the existence of a 'diseases' array to identify a sub-category.
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
          } else {
            // This is a direct disease
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
          }
        })}
      </div>
        </div>
    );
};

export default DiseaseSelectionScreen;