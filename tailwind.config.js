module.exports = {
    purge: ['./src/**/*.html', './src/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                112: '28rem',
                128: '32rem',
                144: '36rem',
                160: '40rem',
                176: '44rem',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            textColor: ['active'],
        },
    },
    plugins: [],
};
