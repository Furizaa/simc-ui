const Card = {
  baseStyle: {
    padding: 3,
    borderRadius: 'md',
  },
  variants: {
    clean: {},
    solid: {
      borderWidth: '2px',
      borderColor: 'gray.600',
    },
    outline: {
      borderWidth: '2px',
      borderColor: 'gray.600',
      borderStyle: 'dashed',
      backgroundColor: 'gray.900',
    },
  },
  defaultProps: {
    variant: 'solid',
  },
};

const Modal = {
  baseStyle: {
    content: {
      bg: 'gray.800',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    header: {
      borderBottomWidth: '1px',
      borderBottomColor: 'gray.600',
    },
    body: {
      padding: 0,
    },
  },
};

const Popover = {
  baseStyle: {
    popper: {
      width: 'auto',
      maxWidth: '45rem',
    },
    content: {
      bg: 'gray.800',
      borderColor: 'gray.600',
      boxShadow: 'dark-lg',
    },
    footer: {
      bg: 'gray.900',
      borderColor: 'gray.600',
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
    },
  },
};

const Button = {
  variants: {
    solid: ({ colorScheme }: { colorScheme: string }) => ({
      bg: `${colorScheme}.500`,
      color: 'gray.50',
    }),
  },
};

const FormLabel = {
  variants: {
    large: {
      fontSize: 'md',
      fontWeight: 'semibold',
      fontVariant: 'small-caps',
    },
  },
};

const Textarea = {
  variants: {
    filled: {
      fontFamily: 'monospace',
      backgroundColor: 'gray.800',
      color: 'gray.400',
      _hover: {
        backgroundColor: 'gray.800',
      },
      _focus: {
        backgroundColor: 'gray.800',
        color: 'gray.50',
      },
    },
  },
};

const Form = {
  baseStyle: {
    helperText: {
      fontWeight: 'semibold',
      color: 'gray.400',
    },
  },
};

const Tabs = {
  variants: {
    enclosed: {
      tab: {
        fontWeight: 'semibold',
        borderRadius: 0,
        borderBottomColor: 'gray.400',
        border: 0,
        py: '13px',
        _selected: {
          bgColor: 'frosted',
        },
        _disabled: {
          color: 'gray.400',
        },
      },
      tablist: {
        backdropFilter: 'blur(20px)',
        boxShadow: 'md',
        border: 0,
      },
    },
    config: {
      tab: {
        fontWeight: 'semibold',
        borderTopRightRadius: '4px',
        borderTopLeftRadius: '4px',
        borderBottom: 0,
        fontSize: 'xs',
        _selected: {
          backgroundColor: 'gray.700',
        },
        _hover: {
          backgroundColor: 'lightblue.900',
        },
      },
      tablist: {
        backgroundColor: 'gray.800',
      },
      tabpanel: {
        backgroundColor: 'gray.700',
      },
    },
    vertical: {
      tablist: {
        border: 0,
      },
      tab: {
        fontWeight: 'semibold',
        justifyContent: 'flex-start',
        border: 0,
        _selected: {
          backgroundColor: 'gray.800',
          border: 0,
          color: 'indigo.200',
        },
        _disabled: {
          color: 'gray.500',
          cursor: 'not-allowed',
        },
      },
    },
  },
};

export default {
  fonts: {
    body: '"proxima-nova", system-ui, sans-serif',
    heading: '"proxima-nova", Georgia, serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
      'html, body, #root': {
        height: '100%',
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  shadows: {
    cardInset: 'inset 0px 0px 0px 1px rgba(255,255,255,0.1)',
    outline: 'none',
  },
  components: {
    Card,
    Modal,
    Popover,
    Button,
    FormLabel,
    Form,
    Tabs,
    Textarea,
  },
  colors: {
    epicBg: '#1E1622',
    translucent: 'rgba(37, 40, 44, 0.5)',
    frosted: 'rgba(255,255,255,0.1)',
    darken: 'rgba(37, 40, 44, 0.5)',
    itemQuality: {
      poor: '#CBD1E0',
      common: '#FFFFFF',
      uncommon: '#1EFE01',
      rare: '#017FFC',
      epic: '#C600FF',
      legendary: '#FD7F00',
      artifact: '#E2CA7F',
      heirloom: '#02CCFF',
    },
    classWarrior: {
      900: '#331400',
      800: '#472900',
      700: '#5e3d14',
      600: '#775229',
      500: '#8f683e',
      400: '#a87f53',
      300: '#c2966a',
      200: '#dcaf81',
      100: '#f7c899',
      50: '#ffe8b8',
    },
    classPaladin: {
      900: '#3b001a',
      800: '#590232',
      700: '#751249',
      600: '#8c2c5c',
      500: '#a34271',
      400: '#bb5886',
      300: '#d36e9c',
      200: '#eb84b2',
      100: '#fc9fcd',
      50: '#ffbfee',
    },
    classHunter: {
      900: '#001900',
      800: '#102e00',
      700: '#1b4400',
      600: '#305a03',
      500: '#487112',
      400: '#60882c',
      300: '#78a143',
      200: '#91b95a',
      100: '#aad372',
      50: '#c3ed8a',
    },
    classRogue: {
      900: '#2a1b00',
      800: '#353300',
      700: '#474900',
      600: '#5e5f00',
      500: '#777600',
      400: '#918d01',
      300: '#aba610',
      200: '#c6bf33',
      100: '#e1d84d',
      50: '#fdf267',
    },
    classPriest: {
      900: '#1a170f',
      800: '#2e2a23',
      700: '#433f37',
      600: '#59554c',
      500: '#706c63',
      400: '#88837a',
      300: '#a19c93',
      200: '#bab5ac',
      100: '#d4cfc6',
      50: '#efeae0',
    },
    classShaman: {
      900: '#000d91',
      800: '#0021b4',
      700: '#0036d2',
      600: '#0f4bed',
      500: '#3762fe',
      400: '#6178ff',
      300: '#828fff',
      200: '#9ea6ff',
      100: '#babcff',
      50: '#d4d3ff',
    },
    classMage: {
      900: '#002641',
      800: '#003b58',
      700: '#005170',
      600: '#006988',
      500: '#0381a1',
      400: '#2799ba',
      300: '#4ab1d3',
      200: '#66c9ec',
      100: '#82e3fe',
      50: '#a1ffff',
    },
    classWarlock: {
      900: '#18144d',
      800: '#302764',
      700: '#473b7b',
      600: '#5f5193',
      500: '#7767ac',
      400: '#8f7fc5',
      300: '#a997df',
      200: '#c2affa',
      100: '#dfcbff',
      50: '#fce8ff',
    },
    classMonk: {
      900: '#002500',
      800: '#003a09',
      700: '#004f1e',
      600: '#006631',
      500: '#007d45',
      400: '#00955a',
      300: '#00ae71',
      200: '#00c788',
      100: '#00e19f',
      50: '#02fcb8',
    },
    classDeathknight: {
      900: '#530000',
      800: '#6f0002',
      700: '#8d0017',
      600: '#ab052a',
      500: '#c4203c',
      400: '#db394c',
      300: '#f14f5d',
      200: '#ff6c75',
      100: '#ff8e94',
      50: '#ffacb1',
    },
    classDruid: {
      900: '#560000',
      800: '#730500',
      700: '#8d1b00',
      600: '#a43200',
      500: '#bc4600',
      400: '#d55a00',
      300: '#ed6e05',
      200: '#fe881d',
      100: '#ffaa44',
      50: '#ffc962',
    },
    classDemonhunter: {
      900: '#360061',
      800: '#53007c',
      700: '#710198',
      600: '#8e0fb3',
      500: '#a330c8',
      400: '#b947de',
      300: '#d05df4',
      200: '#e975fe',
      100: '#fc92ff',
      50: '#ffb5ff',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E7F0',
      300: '#CBD1E0',
      400: '#A8ADC0',
      500: '#7E8396',
      600: '#525768',
      700: '#393D48',
      800: '#25282C',
      900: '#191719',
    },
    indigo: {
      900: '#061178',
      800: '#0B1D96',
      700: '#132DAD',
      600: '#1D3DBF',
      500: '#2251CC',
      400: '#3A66DB',
      300: '#5E8AEE',
      200: '#88B1FC',
      100: '#B0D0FF',
      50: '#D9E8FF',
    },
    purple: {
      900: '#44056E',
      800: '#580A94',
      700: '#690CB0',
      600: '#7A0ECC',
      500: '#8719E0',
      400: '#9446ED',
      300: '#A368FC',
      200: '#B990FF',
      100: '#DAC4FF',
      50: '#F2EBFE',
    },
    pink: {
      900: '#620042',
      800: '#870557',
      700: '#A30664',
      600: '#BC0A6F',
      500: '#DA127D',
      400: '#E8368F',
      300: '#F364A2',
      200: '#FF8CBA',
      100: '#FFB8D2',
      50: '#FFE3EC',
    },
    blue: {
      900: '#002159',
      800: '#01337D',
      700: '#03449E',
      600: '#0552B5',
      500: '#0967D2',
      400: '#2186EB',
      300: '#47A3F3',
      200: '#7CC4FA',
      100: '#BAE3FF',
      50: '#E6F6FF',
    },
    lightblue: {
      900: '#035388',
      800: '#0B69A3',
      700: '#127FBF',
      600: '#1992D4',
      500: '#2BB0ED',
      400: '#40C3F7',
      300: '#5ED0FA',
      200: '#81DEFD',
      100: '#B3ECFF',
      50: '#E3F8FF',
    },
    cyan: {
      900: '#05606E',
      800: '#07818F',
      700: '#099AA4',
      600: '#0FB5BA',
      500: '#1CD4D4',
      400: '#3AE7E1',
      300: '#62F4EB',
      200: '#92FDF2',
      100: '#C1FEF6',
      50: '#E1FCF8',
    },
    green: {
      900: '#014D40',
      800: '#0C6B58',
      700: '#147D64',
      600: '#199473',
      500: '#27AB83',
      400: '#3EBD93',
      300: '#65D6AD',
      200: '#8EEDC7',
      100: '#C6F7E2',
      50: '#EFFCF6',
    },
    limegreen: {
      900: '#1E5303',
      800: '#2E7B06',
      700: '#399709',
      600: '#5CB70B',
      500: '#6CD410',
      400: '#8DED2D',
      300: '#AFF75C',
      200: '#CAFF84',
      100: '#E6FFBF',
      50: '#F8FFED',
    },
    yellow: {
      900: '#8D2B0B',
      800: '#B44D12',
      700: '#CB6E17',
      600: '#DE911D',
      500: '#F0B429',
      400: '#F7C948',
      300: '#FADB5F',
      200: '#FCE588',
      100: '#FFF3C4',
      50: '#FFFBEA',
    },
    orange: {
      900: '#841003',
      800: '#AD1D07',
      700: '#C52707',
      600: '#DE3A11',
      500: '#F35627',
      400: '#F9703E',
      300: '#FF9466',
      200: '#FFB088',
      100: '#FFD0B5',
      50: '#FFE8D9',
    },
    red: {
      900: '#610316',
      800: '#8A041A',
      700: '#AB091E',
      600: '#CF1124',
      500: '#E12D39',
      400: '#EF4E4E',
      300: '#F86A6A',
      200: '#FF9B9B',
      100: '#FFBDBD',
      50: '#FFE3E3',
    },
  },
};
