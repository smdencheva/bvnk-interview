/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{ts,tsx,js,jsx}',
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/components/ui/**/*.{ts,tsx,js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                'page-bg': 'var(--page-background)',
                'text-primary': 'var(--color-primary)',
                'text-secondary': 'var(--color-secondary)',
                'text-error': 'var(--color-error)',
                border: 'var(--page-background)',
                accent: 'var(--color-accent)',
                error: 'var(--color-error)',
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '12px',
                lg: '16px',
                xl: '25px',
            },
            borderRadius: {
                sm: 'var(--radius)',
                md: 'var(--radius)',
            },
            fontFamily: {
                sans: "var(--font-inter)",
            },
            fontSize: {
                caption: ['12px', '16px'],
                'body-md': ['14px', '22px'],
                'body-lg': ['15px', '24px'],
                button: ['15px', '24px'],
                'button-sm': ['14px', '24px'],
                'label-md': ['14px', '20px'],
                'heading-sm': ['20px', '28px'],
                'heading-lg': ['32px', '40px'],
            },
        },
    },
    plugins: [],
}
