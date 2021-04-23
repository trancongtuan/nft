export default {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors: {
        text: '#000',
        fadeText: 'rgba(255, 255, 255, 0.5)',
        background: '#fff',
        hover: 'rgba(4, 4, 5, 0.05)',
        modes: {
            dark: {
                text: '#fff',
                fadeText: 'rgba(255, 255, 255, 0.5)',
                background: '#000',
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
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)',
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
        primary: {},
    },
}
