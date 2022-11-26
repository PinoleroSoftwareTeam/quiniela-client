import { extendTheme } from '@chakra-ui/react';

const fontWeights = {
  normal: 300,
  medium: 500,
  'semi-bold': 700,
  bold: 800,
};

const colors = {
  brand: {
    yellow: '#FFB600',
    'yellow-dark': '#CC9200',
    purple: '#6442DD',
    'purple-dark': '#4D33AB',
    whiteLite: '#ededed',
    white: '#ffffff',
    blackLite: '#010409',
    black: '#000000',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semi-bold',
    },
    sizes: {
      medium: {
        h: '48px',
        fontSize: 'md',
        px: '32px',
      },
    },
    variants: {
      yellow: {
        bg: 'brand.yellow',
        boxShadow: '0 0 2px 2px #efdfde',
      },
    },
  },
};

const styles = {
  global: {
    body: {
    },
  },
};

const customTheme = extendTheme({ styles, fontWeights, colors, components });

export default customTheme;
