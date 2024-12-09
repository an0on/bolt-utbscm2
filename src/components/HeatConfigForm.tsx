import React, { useState } from 'react';
import { Category } from '../types';

interface HeatConfig {
  firstRoundSize: number;
  secondRoundQualifiers: number;
  secondRoundSize: number;
  finalists: number;
}

interface HeatConfigFormProps {
  category: Category;
  onSave: (category: Category, config: HeatConfig) => void;
  onClose: () => void;
}

export function HeatConfigForm({ category, onSave, onClose }: HeatConfigFormProps) {
  const [heatConfig, setHeatConfig] = useState<HeatConfig>({
    firstRoundSize: 5,
    secondRoundQualifiers: 3,
    secondRoundSize: 2,
    finalists: 1
  });

  const handleSubmit = () => {
    onSave(category, heatConfig);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Heat Configuration for {category}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Round Size</label>
              <input
                type="number"
                min="1"
                value={heatConfig.firstRoundSize}
                onChange={e => setHeatConfig(prev => ({ ...prev, firstRoundSize: parseInt(e.target.value, 10) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Second Round Qualifiers</label>
              <input
                type="number"
                min="1"
                value={heatConfig.secondRoundQualifiers}
                onChange={e => setHeatConfig(prev => ({ ...prev, secondRoundQualifiers: parseInt(e.target.value, 10) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Second Round Size</label>
              <input
                type="number"
                min="1"
                value={heatConfig.secondRoundSize}
                onChange={e => setHeatConfig(prev => ({ ...prev, secondRoundSize: parseInt(e.target.value, 10) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Finalists</label>
              <input
                type="number"
                min="1"
                value={heatConfig.finalists}
                onChange={e => setHeatConfig(prev => ({ ...prev, finalists: parseInt(e.target.value, 10) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
