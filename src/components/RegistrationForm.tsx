import React, { useState } from 'react';
import { Category, Address } from '../types';
import { useContestStore } from '../store/contestStore';
import { validateForm } from '../utils/validation';
import { generateAccessCode } from '../utils/accessCode';
import { RegistrationSuccessModal } from './RegistrationSuccessModal';

const initialAddress: Address = {
  street: '',
  houseNumber: '',
  postalCode: '',
  city: ''
};

export function RegistrationForm() {
  const addParticipant = useContestStore(state => state.addParticipant);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    address: initialAddress,
    isSponsored: false,
    sponsorDetails: '',
    categories: [] as Category[]
  });
  const [errors, setErrors] = React.useState<string[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    const newAccessCode = generateAccessCode();
    setAccessCode(newAccessCode);
    addParticipant({ ...formData, accessCode: newAccessCode });
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: initialAddress,
      isSponsored: false,
      sponsorDetails: '',
      categories: []
    });
    setSubmitted(false);
  };

  const handleAddressChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: e.target.value
      }
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

  const handleCategoryToggle = (category: Category) => {
    if (category === 'A-SPONSORED') {
      setFormData(prev => ({
        ...prev,
        isSponsored: true,
        categories: prev.categories.includes('B-AMATEUR')
          ? [...prev.categories.filter(c => c !== 'B-AMATEUR'), 'A-SPONSORED']
          : [...prev.categories, 'A-SPONSORED']
      }));
    } else if (category === 'B-AMATEUR' && formData.categories.includes('A-SPONSORED')) {
      // Do nothing if category A is already selected
      return;
    } else {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }));
    }
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
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900">Participant Registration</h2>
        
        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Please correct the following errors:</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  submitted && !formData.firstName.trim() ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  submitted && !formData.lastName.trim() ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                submitted && !formData.email.trim() ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Address</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  required
                  value={formData.address.street}
                  onChange={handleAddressChange('street')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    submitted && !formData.address.street.trim() ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">House Number</label>
                <input
                  type="text"
                  required
                  value={formData.address.houseNumber}
                  onChange={handleAddressChange('houseNumber')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    submitted && !formData.address.houseNumber.trim() ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.address.postalCode}
                  onChange={handleAddressChange('postalCode')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    submitted && !formData.address.postalCode.trim() ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  required
                  value={formData.address.city}
                  onChange={handleAddressChange('city')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    submitted && !formData.address.city.trim() ? 'border-red-300' : 'border-gray-300'
                  }`}
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
                  required
                  value={formData.sponsorDetails}
                  onChange={e => setFormData(prev => ({ ...prev, sponsorDetails: e.target.value }))}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    submitted && !formData.sponsorDetails.trim() ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div className={`space-y-2 p-3 rounded-md ${
              submitted && formData.categories.length === 0 ? 'border-2 border-red-300 bg-red-50' : ''
            }`}>
              {(['A-SPONSORED', 'B-AMATEUR', 'MINIRAMP', 'GIRLS'] as Category[]).map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    disabled={category === 'B-AMATEUR' && formData.categories.includes('A-SPONSORED')}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{getCategoryLabel(category)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>

      {showSuccessModal && (
        <RegistrationSuccessModal
          accessCode={accessCode}
          categories={formData.categories}
          onClose={handleSuccessModalClose}
        />
      )}
    </>
  );
}
