export const theme = {
  // Paleta de colores principal
  colors: {
    // Fondos
    backgroundPrimary: '#F8F9FA',
    backgroundSecondary: '#E8EFFE',
    backgroundCard: '#FFFFFF',

    // Azules
    primary: '#0066CC',      // Azul principal - botones, enlaces
    primaryDark: '#003D99',  // Azul oscuro - encabezados
    primaryLight: '#E3F2FD', // Azul muy claro - hover, fondos

    // Texto
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',

    // Estados
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0066CC',

    // Bordes
    border: '#D9D9D9',
    borderLight: '#E8E8E8',

    // Sombras
    shadow: 'rgba(0, 102, 204, 0.08)',
  },

  Espaciado
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  Bordes redondeados
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },

  Tipografía
  typography: {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40, color: '#003D99' },
    h2: { fontSize: 24, fontWeight: '700', lineHeight: 32, color: '#003D99' },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28, color: '#003D99' },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24, color: '#1A1A1A' },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20, color: '#666666' },
    label: { fontSize: 12, fontWeight: '500', lineHeight: 16, color: '#999999' },
  },

  Sombras
  shadows: {
    sm: '0 1px 2px rgba(0, 102, 204, 0.05)',
    md: '0 4px 6px rgba(0, 102, 204, 0.08)',
    lg: '0 10px 25px rgba(0, 102, 204, 0.1)',
    xl: '0 20px 50px rgba(0, 102, 204, 0.15)',
  },
};