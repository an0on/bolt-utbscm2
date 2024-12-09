import React from 'react';
import { Participant, Category, Address } from '../types';

interface EditParticipantModalProps {
  participant: Participant;
  onSave: (updatedParticipant: Participant) => void;
  onCancel: () => void;
  isProfileMode?: boolean;
}

export function EditParticipantModal({ participant, onSave, onCancel, isProfileMode = false }: EditParticipantModalProps) {
  const [formData, setFormData] = React.useState<Participant>(participant);

  const handleAddressChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: e.target.value
      }
    }));
  };

  const handleCategoryToggle = (category: Category) => {
    // Don't allow category changes if it's paid in profile mode
    if (isProfileMode && participant.paidCategories.includes(category)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSponsoredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSponsored = e.target.checked;
    setFormData(prev => ({
      ...prev,
      isSponsored,
      categories: isSponsored 
        ? [...new Set([...prev.categories, 'A-SPONSORED'])]
        : prev.categories.filter(c => c !== 'A-SPONSORED')
    }));
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {isProfileMode ? 'Edit Profile' : 'Edit Participant'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Address</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={handleAddressChange('street')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">House Number</label>
                  <input
                    type="text"
                    value={formData.address.houseNumber}
                    onChange={handleAddressChange('houseNumber')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    value={formData.address.postalCode}
                    onChange={handleAddressChange('postalCode')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={handleAddressChange('city')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isSponsored}
                  onChange={handleSponsoredChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Sponsored Rider</span>
              </label>

              {formData.isSponsored && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sponsor Details</label>
                  <input
                    type="text"
                    value={formData.sponsorDetails || ''}
                    onChange={e => setFormData(prev => ({ ...prev, sponsorDetails: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <div className="space-y-2">
                {(['A-SPONSORED', 'B-AMATEUR', 'MINIRAMP', 'GIRLS'] as Category[]).map(category => {
                  const isPaid = participant.paidCategories.includes(category);
                  const isDisabled = (category === 'A-SPONSORED' && formData.isSponsored) || 
                                   (isProfileMode && isPaid);
                  
                  return (
                    <label 
                      key={category} 
                      className={`flex items-center ${isProfileMode && isPaid ? 'cursor-not-allowed opacity-60' : ''}`}
                      title={isProfileMode && isPaid ? 'Contact contest management to modify paid categories' : ''}
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        disabled={isDisabled}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {getCategoryLabel(category)}
                        {isProfileMode && isPaid && (
                          <span className="ml-2 text-xs text-green-600">(Paid)</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
