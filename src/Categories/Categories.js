import React, { useEffect, useState } from 'react';
import './Categories.css';
import { getCategories } from '../services/productServices';
import { CategorySearchList } from '../CategorySearchList/CategorySearchList.js';


const Categories = () => {

  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    setData(getCategories());
  }, []);

  useEffect(()=>{
    const grouped = {};
    console.log(data)

    data?.forEach((item) => {
      grouped[item.gender] = grouped[item.gender] || {};
      grouped[item.gender][item.category] = grouped[item.gender][item.category] || [];
      grouped[item.gender][item.category].push(item.subCategory);
    });

    setGroupedData(grouped);
  },[data])


  const handleGenderClick = (e, gender) => {
    if(e.target.className === 'genderSelect'){
      setSelectedGender(selectedGender === gender ? null : gender);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } 
  };

  const handleCategoryClick = (e, category) => {
    if(e.target.className === 'categorySelect'){
      setSelectedCategory(selectedCategory === category ? null : category);
      setSelectedSubCategory(null);
    }
  };

  const loadProducts = (e, subCat) => {
    if(e.target.className === 'subCategorySelect'){
      setSelectedSubCategory(subCat);
    }
    
  }

  return (
    <div className='minHeight'>
    <div className="grouped-dropdown">
      <ul className="gender-list">
        {Object.keys(groupedData).map((gender) => (
          <li className="genderSelect" key={gender} onClick={(e) => handleGenderClick(e, gender)}>
            {gender}
            {selectedGender === gender && (
              <ul className="category-list">
                {Object.keys(groupedData[gender]).map((category) => (
                  <li className="categorySelect" key={category} onClick={(e) => handleCategoryClick(e, category)}>
                    {category}
                    {selectedCategory === category && (
                      <ul className="sub-category-list">
                        {groupedData[gender][category].map((subCategory) => (
                          <li className="subCategorySelect" key={subCategory} onClick={(e) => loadProducts(e, subCategory)}>{subCategory}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
    {
      selectedGender && selectedCategory &&  selectedSubCategory && 
      <CategorySearchList 
        gender={selectedGender}
        category={selectedCategory}
        subCategory={selectedSubCategory}
      />
    }
    </div>
  );
};

export default Categories;