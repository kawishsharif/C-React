// Converters to match the functionality of the C# converters

// Define interface for Location
export interface Location {
  lat?: number;
  lng?: number;
  name?: string;
}

/**
 * StatusToColorConverter - Returns the appropriate color for a status
 * @param {string} status - The incident status
 * @returns {string} - Color hex code
 */
export const statusToColor = (status: string | undefined): string => {
  switch(status && status.toLowerCase()) {
    case 'active': return '#FF9800'; // Orange
    case 'confirmed': return '#4CAF50'; // Green
    case 'false': return '#F44336'; // Red 
    case 'pending': return '#2196F3'; // Blue
    default: return '#9E9E9E'; // Gray for unknown
  }
};

/**
 * BooleanToVisibilityConverter - Converts boolean to display style
 * @param {boolean} value - Boolean value
 * @returns {string} - CSS display property
 */
export const booleanToVisibility = (value: boolean): string => {
  return value ? 'block' : 'none';
};

/**
 * NonZeroToVisibilityConverter - Shows element if count is non-zero
 * @param {number} count - Number to check
 * @returns {string} - CSS display property
 */
export const nonZeroToVisibility = (count: number): string => {
  return count > 0 ? 'block' : 'none';
};

/**
 * ZeroToVisibilityConverter - Shows element if count is zero
 * @param {number} count - Number to check
 * @returns {string} - CSS display property
 */
export const zeroToVisibility = (count: number): string => {
  return count === 0 ? 'block' : 'none';
};

/**
 * Base64ToImageConverter - Converts base64 string to image source
 * @param {string} base64 - Base64 encoded string
 * @returns {string} - Image data URL
 */
export const base64ToImage = (base64: string | null): string => {
  return base64 ? `data:image/jpeg;base64,${base64}` : '';
};

/**
 * LocationToStringConverter - Formats location object to string
 * @param {Object} location - Location object with lat and lng
 * @returns {string} - Formatted location string
 */
export const locationToString = (location: Location | null | undefined): string => {
  if (!location) return 'Unknown';
  
  // Format based on what properties are available
  if (location.name) {
    return location.name;
  } else if (location.lat !== undefined && location.lng !== undefined) {
    return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  } else {
    return 'Location data unavailable';
  }
};

/**
 * NullToFalseConverter - Returns false if null or undefined
 * @param {any} value - Value to check
 * @returns {boolean} - Returns false if null/undefined, otherwise true
 */
export const nullToFalse = (value: any): boolean => {
  return value != null;
};

/**
 * InvertedNullVisibilityConverter - Shows element if value is null
 * @param {any} value - Value to check
 * @returns {string} - CSS display property
 */
export const invertedNullVisibility = (value: any): string => {
  return value == null ? 'block' : 'none';
};
