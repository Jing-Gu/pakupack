import React, { useState } from 'react';

interface ChecklistItem {
  id: number;
  label: string;
  details?: string;
  completed: boolean;
}

interface ChecklistItems {
  category: string;
  contents: ChecklistItem[];
}

const Checklist: React.FC<{ checklist: ChecklistItems[] }> = ({ checklist }) => {
  const checklistTotalItems = checklist.reduce((acc, category) => acc + category.contents.length, 0);
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  const handleCheckboxChange = (index: number) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !isChecked[index];
    setCheckedCount(newIsChecked.filter(Boolean).length);
    setIsChecked(newIsChecked);
  };

  const handleUncheckAll = () => {
    setIsChecked(new Array(checklist.length).fill(false));
    setCheckedCount(0);
  };

  return (
    <div>
      {checklist.map((categoryItem, categoryIndex) => (
        <div key={categoryIndex} className='mb-4'>
          <h2 className='text-lg capitalize text-chk-smoke'>{categoryItem.category}</h2>
          <ul>
            {categoryItem.contents.map((item, itemIndex) => (
              <li key={itemIndex}>
                <div className='inline-flex items-center'>
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={`checkbox-${item.id}`}>
                    <input type="checkbox" id={`checkbox-${item.id}`}
                      checked={isChecked[categoryIndex * categoryItem.contents.length + itemIndex]}
                      onChange={() => handleCheckboxChange(categoryIndex * categoryItem.contents.length + itemIndex)}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none
                      rounded-md border-2 border-chk-teal transition-all
                      before:absolute before:top-2/4 before:left-2/4 before:block before:h-12
                      before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full
                      before:bg-chk-teal before:opacity-0 before:transition-opacity
                      checked:bg-chk-teal checked:before:bg-chk-teal
                      hover:before:opacity-10"/>
                    <div className="absolute text-white transition-opacity opacity-0 pointer-events-none
                      top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="white"
                        stroke="white" stroke-width="1">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </label>
                  <div>
                    <label htmlFor={`checkbox-${item.id}`} className='block text-chk-charcoal capitalize cursor-pointer'>{item.label}</label>
                    {item.details && <span className="block text-xs text-chk-smoke">{item.details}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className='text-chk-charcoal'><span className='text-chk-teal'>{checkedCount}</span> out of {checklistTotalItems} checked</p>
      <button onClick={handleUncheckAll} className='rounded-md py-2 px-6 bg-chk-teal text-chk-cream'>Uncheck All</button>
    </div>
  );
};

export default Checklist;
