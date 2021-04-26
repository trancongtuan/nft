import { Theme } from 'theme-ui'

export const theme: Theme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors: {
        text: '#040405',
        textSecondary: 'rgba(4, 4, 5, 0.5)',
        textButton: '#040405',
        textButtonActive: '#FFF',
        borderColor: '#E1E1E1',
        borderHoverColor: '#292929',
        placeHolder: 'rgba(4, 4, 5, 0.2)',
        background: '#FFF',
        backgroundButton: '#FFF',
        backgroundButtonActive: '#1f1f1f',
        hover: 'rgba(4, 4, 5, 0.05)',
        primary: '#0066ff',
        red: '#ff5757',
        modes: {
            dark: {
                text: '#FFF',
                textSecondary: 'rgba(255, 255, 255, 0.5)',
                textButton: '#FFF',
                textButtonActive: '#040405',
                borderColor: '#292929',
                borderHoverColor: 'rgba(255, 255, 255, 0.3)',
                placeHolder: 'rgba(255, 255, 255, 0.2)',
                background: '#1f1f1f',
                backgroundButton: '#1f1f1f',
                backgroundButtonActive: '#FFF',
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
    forms: {
        input: {
            border: 'none',
            borderBottom: '2px #eaeaea solid',
            borderRadius: '0',
            padding: '15px 0',
            color: 'textSecondary',
            fontSize: 1,
            fontWeight: '600',
            ':focus': {
                outline: 'none',
            },
            '::placeholder': {
                color: 'placeHolder',
            },
        },
    },
    buttons: {
        border: {
            display: 'flex',
            flexFlow: 'row nowrap',
            height: 48,
            cursor: 'pointer',
            backgroundColor: 'backgroundButton',
            color: 'textButton',
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
            border: '1px solid',
            borderColor: 'borderColor',
            ':hover': {
                borderColor: 'borderHoverColor',
            },
            ':focus': {
                outline: 'none',
            },
        },
        borderActive: {
            display: 'flex',
            flexFlow: 'row nowrap',
            height: 48,
            cursor: 'pointer',
            backgroundColor: 'backgroundButtonActive',
            color: 'textButtonActive',
            borderRadius: 48,
            border: '1px rgba(4, 4, 5, 0.1) solid',
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
                border: '1px rgba(4, 4, 5, 0.28) solid',
            },
            ':focus': {
                outline: 'none',
            },
        },
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
        circle: {
            padding: '0 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            transition: 'all 0.12s ease-in-out 0s',
            color: '#040405',
            background: '#FFF',
            border: '1px #E1E1E1 solid',
            cursor: 'pointer',
            ':hover': {
                border: '1px #ccc solid',
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