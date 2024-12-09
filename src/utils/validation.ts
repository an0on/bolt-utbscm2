import { Category } from '../types';

interface FormData {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
  };
  categories: Category[];
}

export const validateForm = (formData: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!formData.firstName.trim()) errors.push('First name is required');
  if (!formData.lastName.trim()) errors.push('Last name is required');
  if (!formData.address.street.trim()) errors.push('Street is required');
  if (!formData.address.houseNumber.trim()) errors.push('House number is required');
  if (!formData.address.postalCode.trim()) errors.push('Postal code is required');
  if (!formData.address.city.trim()) errors.push('City is required');

  // Category validation
  if (formData.categories.length === 0) {
    errors.push('Please select at least one category');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
