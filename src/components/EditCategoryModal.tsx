import React, { useState } from 'react';
import { Category } from '../types';

interface EditCategoryModalProps {
  category: Category;
  onSave: (updatedCategory: Category) => void;
  onClose: () => void;
}

export function EditCategoryModal({ category, onSave, onClose }: EditCategoryModalProps) {
  const [updatedCategory, setUpdatedCategory] = useState(category);

  const handleSubmit = () => {
    if (updatedCategory.trim()) {
      onSave(updatedCategory.trim() as Category);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit Category</h3>
          <div className="mb-4">
            <input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter updated category name"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-accent-green hover:bg-accent-green/80 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
