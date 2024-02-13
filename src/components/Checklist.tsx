import React, { useState } from 'react';
import { v5 as uuidv5 } from 'uuid';

interface ChecklistItem {
  label: string;
  details?: string;
}

interface ChecklistItems {
  category: string;
  contents: ChecklistItem[];
}

const Checklist: React.FC<{ checklist: ChecklistItems[] }> = ({ checklist }) => {
  const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  const generateUUID = (label: string) => uuidv5(label, NAMESPACE);

  const listWithIds = checklist.map((category) => ({
    ...category,
    contents: category.contents.map((content) => ({
      ...content,
      uid: generateUUID(content.label)  as string
    }))
  }));

   const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>(
    listWithIds.reduce((acc, category) => {
      category.contents.forEach((item) => {
        acc[item.uid] = false;
      });
      return acc;
    }, {} as {[key: string]: boolean})
  );

  const [checkedCount, setCheckedCount] = useState<number>(0);
  const totalCount = Object.keys(checkedItems).length;

  const handleCheckboxChange = (uid: string) => {
    setCheckedItems(prevCheckedItems => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [uid]: !prevCheckedItems[uid],
      };
      setCheckedCount(Object.values(updatedCheckedItems).filter(item => item).length);
      return updatedCheckedItems;
    });
  };

  const handleUncheckAll = () => {
    const uncheckedItems: {[key: string]: boolean} = {};
    Object.keys(checkedItems).forEach((key) => {
      uncheckedItems[key] = false;
    });
    setCheckedItems(uncheckedItems);
    setCheckedCount(0);
  };

  return (
    <div>
      {listWithIds.map((categoryItem, categoryIndex) => (
        <div key={categoryIndex} className='mb-4'>
          <h2 className='text-lg my-4 capitalize text-chk-smoke'>{categoryItem.category}</h2>
          <ul>
            {categoryItem.contents.map((item, itemIndex) => (
              <li key={itemIndex} className='mb-4'>
                <div className='inline-flex items-center'>
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={`checkbox-${item.uid}`}>
                    <input type="checkbox" id={`checkbox-${item.uid}`}
                      checked={checkedItems[item.uid] || false}
                      onChange={() => handleCheckboxChange(item.uid)}
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
                        stroke="white" strokeWidth="1">
                        <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </label>
                  <div>
                    <label htmlFor={`checkbox-${item.uid}`}
                      className={`${categoryItem.category === 'tips' ? 'text-chk-teal' : 'text-chk-charcoal'}
                      block capitalize cursor-pointer`}>
                        {item.label}
                    </label>
                    {item.details && <span className="block capitalize text-xs text-chk-smoke">{item.details}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='flex flex-col md:flex-row md:justify-between items-center pt-6 mt-12 border-t-4 border-chk-cream'>
        <p className='text-chk-charcoal mb-4 md:mb-0'>
          <span className='text-chk-teal'>{checkedCount}</span> out of {totalCount} checked
        </p>
        <button onClick={handleUncheckAll} className='rounded-md py-2 px-6
          bg-chk-teal text-chk-cream'>Uncheck All
        </button>
      </div>

    </div>
  );
};

export default Checklist;
