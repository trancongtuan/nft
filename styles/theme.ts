import { Theme } from 'theme-ui'

export const theme: Theme = {
    breakpoints: ['40em', '47.5em', '61.5em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors: {
        text: '#040405',
        textSecondary: 'rgba(4, 4, 5, 0.5)',
        textButton: '#040405',
        textButtonActive: '#FFF',
        borderColor: 'rgba(4, 4, 5, 0.1)',
        borderHoverColor: 'rgba(4, 4, 5, 0.2)',
        placeHolder: 'rgba(4, 4, 5, 0.2)',
        background: '#FFF',
        backgroundButton: '#FFF',
        backgroundButtonActive: '#1f1f1f',
        backgroundYellow: 'rgba(254, 218, 3, 0.1)',
        hover: 'rgba(4, 4, 5, 0.05)',
        primary: '#0066ff',
        red: '#ff5757',
        toggleButtonOff: 'rgba(45, 129, 255, 0.1)',
        toggleButtonOn: 'rgba(45, 129, 255)',
        toggleCircle: '#FFF',
        modes: {
            dark: {
                text: '#FFF',
                textSecondary: 'rgba(255, 255, 255, 0.5)',
                textButton: '#FFF',
                textButtonActive: '#040405',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderHoverColor: 'rgba(255, 255, 255, 0.2)',
                placeHolder: 'rgba(255, 255, 255, 0.2)',
                background: '#121212',
                backgroundButton: '#1f1f1f',
                backgroundButtonActive: '#FFF',
                backgroundYellow: 'rgba(255, 255, 255, 0.1)',
                hover: 'rgba(255, 255, 255, 0.05)',
                toggleButtonOff: 'rgba(45, 129, 255, 0.3)',
                toggleButtonOn: 'rgba(45, 129, 255)',
                toggleCircle: '#111',
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
            borderRadius: '0',
            padding: '14px 0',
            color: 'textSecondary',
            fontSize: 1,
            fontWeight: '600',
            ':focus': {
                outline: 'none',
            },
            '::placeholder': {
                color: 'textSecondary',
            },
        },
        footerInput: {
            color: 'textButton',
            border: 'none',
            background: '#FFF',
            height: '100%',
            fontWeight: 'heading',
            fontSize: 1,
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
            height: 40,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: 'textButton',
            borderRadius: 40,
            transition: 'all 0.12s ease-in-out 0s',
            paddingLeft: 22,
            paddingRight: 22,
            paddingTop: 0,
            paddingBottom: 0,
            minWidth: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 900,
            border: '1px solid',
            borderColor: 'borderColor',
            lineHeight: '16px',
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
            height: 40,
            cursor: 'pointer',
            backgroundColor: 'backgroundButtonActive',
            color: 'textButtonActive',
            borderRadius: 40,
            border: '1px rgba(4, 4, 5, 0.1) solid',
            transition: 'all 0.12s ease-in-out 0s',
            paddingLeft: 22,
            paddingRight: 22,
            paddingTop: 0,
            paddingBottom: 0,
            minWidth: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 1,
            fontWeight: 900,
            lineHeight: '16px',
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
            color: 'text',
            backgroundColor: 'background',
            border: '1px solid',
            borderColor: '#aaa',
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
            width: 38,
            height: 38,
            borderRadius: 9999,
            xxs: {
                width: 16,
                height: 16,
            },
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
