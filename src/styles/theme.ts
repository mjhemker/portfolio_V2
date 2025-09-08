export const theme = {
  colors: {
    primary: '#0a0a0a', // Deep black
    secondary: '#121212', // Very dark gray
    surface: '#1a1a1a', // Dark gray
    surfaceLight: '#2a2a2a', // Lighter dark gray
    accent: '#1DB954', // Spotify green accent
    accentHover: '#1ed760',
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      tertiary: '#686868'
    },
    border: '#333333',
    hover: '#282828'
  },
  lightColors: {
    primary: '#ffffff', // Pure white
    secondary: '#f8f9fa', // Light gray
    surface: '#e9ecef', // Lighter gray
    surfaceLight: '#dee2e6', // Medium gray
    accent: '#1DB954', // Keep same green accent
    accentHover: '#1ed760',
    text: {
      primary: '#212529', // Dark text
      secondary: '#495057', // Medium gray text
      tertiary: '#868e96' // Light gray text
    },
    border: '#dee2e6',
    hover: '#e9ecef'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f23 100%)',
    secondary: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
    accent: 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)',
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    blue: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
    warm: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    card: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(18, 18, 18, 0.9) 100%)',
    glow: 'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.1) 0%, transparent 70%)'
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(29, 185, 84, 0.3)'
  },
  animations: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease'
  }
} as const;

export type Theme = typeof theme;