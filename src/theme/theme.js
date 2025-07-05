// Theme configuration for the application
// This replaces the MaterialDesign themes from the C# WPF application

export const theme = {
  colors: {
    // Material design colors
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    background: '#121212',
    surface: '#121212',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#FFFFFF',

    // Custom colors matching the C# application
    materialDesignBackground: '#1F242F',
    materialDesignPaper: '#252A36',
    materialDesignCardBackground: '#252A36',
    materialDesignSelection: '#3E4451',
    materialDesignControlBackground: '#2A303C',
    materialDesignBody: '#FFFFFF',
    materialDesignDivider: 'rgba(255, 255, 255, 0.12)',
    
    // Status colors for incidents (matching StatusToColorConverter)
    statusActive: '#FF9800', // Orange
    statusConfirmed: '#4CAF50', // Green
    statusFalse: '#F44336', // Red
    statusPending: '#2196F3', // Blue
    statusUnknown: '#9E9E9E', // Gray
  },
  
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    headline6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
  },
  
  shape: {
    borderRadius: 8,
  }
};

// Helper function to get status color from theme
export const getStatusColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'active': return theme.colors.statusActive;
    case 'confirmed': return theme.colors.statusConfirmed;
    case 'false': return theme.colors.statusFalse;
    case 'pending': return theme.colors.statusPending;
    default: return theme.colors.statusUnknown;
  }
};
