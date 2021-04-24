export default {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors: {
        text: '#040405',
        textSecondary: 'rgba(4, 4, 5, 0.5)',
        background: '#fff',
        hover: 'rgba(4, 4, 5, 0.05)',
        primary: '#0066ff',
        red: '#ff5757',
        modes: {
            dark: {
                text: '#fff',
                textSecondary: 'rgba(255, 255, 255, 0.5)',
                background: '#1f1f1f',
                hover: 'rgba(255, 255, 255, 0.05)',
            },
        },
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, 0.125)',
        large: '0 0 24px rgba(0, 0, 0, 0.125)',
    },
    variants: {},
    text: {
        heading: {
            fontFamily: 'sans-serif',
            lineHeight: 'heading',
            fontWeight: 'heading',
        },
    },
    buttons: {
        primary: {
            display: 'flex',
            flexFlow: 'row nowrap',
            height: 48,
            cursor: 'pointer',
            backgroundColor: 'primary',
            borderRadius: 48,
            transition: 'all 0.12s ease-in-out 0s',
            paddingLeft: 26,
            paddingRight: 26,
            paddingTop: 0,
            paddingBottom: 0,
            minWidth: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 900,
            ':hover': {
                backgroundColor: 'rgba(0, 102, 255, 0.95)',
                color: 'rgba(255,255,255,0.9)',
            },
            ':focus': {
                outline: 'none',
            },
        },
        secondary: {
            display: 'flex',
            flexFlow: 'row nowrap',
            backgroundColor: 'rgba(0, 102, 255, 0.15)',
            color: 'primary',
            height: 40,
            paddingLeft: 22,
            paddingRight: 22,
            paddingTop: 0,
            paddingBottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 40,
            fontSize: 14,
            fontWeight: 900,
            transition: 'all 0.12s ease-in-out 0s',
            cursor: 'pointer',
            ':hover': {
                color: 'rgba(0, 102, 255, 0.9)',
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
            },
            ':focus': {
                outline: 'none',
            },
        },
    },
    images: {
        avatar: {
            xs: {
                width: 26,
                height: 26,
            },
            sm: {
                width: 48,
                height: 48,
            },
            md: {
                width: 64,
                height: 64,
            },
            lg: {
                width: 68,
                height: 68,
            },
            xl: {
                width: 120,
                height: 120,
            },
        },
        background: {
            height: 100,
        },
    },
}
