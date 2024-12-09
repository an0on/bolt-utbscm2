import React, { useState, useEffect } from 'react';
import { useContestStore } from '../store/contestStore';
import { Category } from '../types';
import { AddCategoryModal } from './AddCategoryModal';
import { WarningModal } from './WarningModal';
import { HeatConfigForm } from './HeatConfigForm';

interface HeatConfig {
  firstRoundSize: number;
  secondRoundQualifiers: number;
  secondRoundSize: number;
  finalists: number;
}

export function ContestManagement() {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { categories: allCategories, updateHeats, participants, addCategory, removeCategory, heatConfigs, setHeatConfig } = useContestStore();
  const [showHeatConfigForm, setShowHeatConfigForm] = useState<Record<Category, boolean>>({});

  useEffect(() => {
    // Initialize selectedCategories with default categories if none are selected
    if (selectedCategories.length === 0) {
      setSelectedCategories(['A-SPONSORED', 'B-AMATEUR', 'MINIRAMP', 'GIRLS']);
    }
  }, [selectedCategories]);

  const handleAddCategory = (newCategory: Category) => {
    addCategory(newCategory);
    setSelectedCategories([...selectedCategories, newCategory]);
    setShowAddCategoryModal(false);
  };

  const handleRemoveCategory = (categoryToRemove: Category) => {
    const paidParticipants = participants.filter(p => p.paidCategories.includes(categoryToRemove)).map(p => p.firstName + ' ' + p.lastName);
    if (paidParticipants.length > 0) {
      setShowWarningModal(true);
      setEditingCategory(categoryToRemove);
      return;
    }
    setShowWarningModal(true);
    setEditingCategory(categoryToRemove);
  };

  const handleWarningModalClose = () => {
    setShowWarningModal(false);
    setEditingCategory(null);
  };

  const handleWarningModalConfirm = () => {
    removeCategory(editingCategory!);
    setSelectedCategories(selectedCategories.filter(c => c !== editingCategory));
    setShowWarningModal(false);
    setEditingCategory(null);
  };

  const handleSaveHeatConfig = (category: Category, config: HeatConfig) => {
    setHeatConfig(category, config);
    setShowHeatConfigForm(prev => ({ ...prev, [category]: false }));
  };

  const handleStartCategory = (category: Category) => {
    updateHeats(category);
  };

  const handleToggleHeatConfigForm = (category: Category) => {
    setShowHeatConfigForm(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const getCategoryLabel = (category: Category): string => {
    switch (category) {
      case 'A-SPONSORED':
        return 'A - Sponsored Rider';
      case 'B-AMATEUR':
        return 'B - Amateur Rider';
      default:
        return category;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contest Management</h2>
      <div className="mb-4">
        <button
          onClick={() => setShowAddCategoryModal(true)}
          className="px-4 py-2 bg-accent-green hover:bg-accent-green/80 text-white rounded-md"
        >
          Add Category
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              First Round Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Second Round Qualifiers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Second Round Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Finalists
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedCategories.map((category) => {
            const config = heatConfigs[category] || { firstRoundSize: 5, secondRoundQualifiers: 3, secondRoundSize: 2, finalists: 1 };
            return (
              <tr key={category}>
                <td className="px-6 py-4 whitespace-nowrap">{getCategoryLabel(category)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{config.firstRoundSize}</td>
                <td className="px-6 py-4 whitespace-nowrap">{config.secondRoundQualifiers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{config.secondRoundSize}</td>
                <td className="px-6 py-4 whitespace-nowrap">{config.finalists}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveCategory(category)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleToggleHeatConfigForm(category)}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleStartCategory(category)}
                      className="px-2 py-1 bg-accent-orange hover:bg-accent-orange/80 text-white rounded-md"
                    >
                      Start
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showAddCategoryModal && (
        <AddCategoryModal onSave={handleAddCategory} onClose={() => setShowAddCategoryModal(false)} />
      )}
      {showWarningModal && (
        <WarningModal
          title={editingCategory ? `Remove ${getCategoryLabel(editingCategory)}?` : "Warning"}
          message={editingCategory
            ? `Are you sure you want to remove the ${getCategoryLabel(editingCategory)} category? This action cannot be undone.`
            : `Removing this category will affect the following participants who have already paid: ${participants.filter(p => p.paidCategories.includes(editingCategory!)).map(p => p.firstName + ' ' + p.lastName).join(', ')}. Are you sure you want to proceed?`}
          onConfirm={handleWarningModalConfirm}
          onCancel={handleWarningModalClose}
        />
      )}
      {Object.entries(showHeatConfigForm).map(([category, show]) => show && (
        <HeatConfigForm
          key={category}
          category={category as Category}
          onSave={handleSaveHeatConfig}
          onClose={() => setShowHeatConfigForm(prev => ({ ...prev, [category]: false }))}
        />
      ))}
    </div>
  );
}
