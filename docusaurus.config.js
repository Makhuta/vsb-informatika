// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'VŠB Informatika',
    tagline: 'Database of the hardest/most needed subjects',
    favicon: 'img/logo.svg',

    // Set the production url of your site here
    url: 'https://makhuta.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/vsb-informatika/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'Makhuta', // Usually your GitHub org/user name.
    projectName: 'vsb-informatika', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    staticDirectories: ['public', 'static'],
    i18n: {
        defaultLocale: 'cs',
        locales: ['cs'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/Makhuta/vsb-informatika-source/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/Makhuta/vsb-informatika-source/tree/main/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    stylesheets: [{
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
    }, ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
        // Replace with your project's social card
        image: 'img/vsb_informatika_banner.webp',
        colorMode: {
            defaultMode: 'dark'
        },
        navbar: {
            title: 'VŠB Informatika',
            logo: {
                alt: 'VŠB Informatika',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'dropdown',
                    label: 'Subjects',
                    position: 'left',
                    items: [{
                            type: 'docSidebar',
                            label: 'Bezpečnost v elektrotechnice',
                            sidebarId: 'BOZP',
                        },
                        {
                            type: 'docSidebar',
                            label: 'Úvod do logického myšlení',
                            sidebarId: 'ULM',
                        },
                        {
                            type: 'docSidebar',
                            label: 'Algoritmy I',
                            sidebarId: 'ALGI',
                        },
                        {
                            type: 'docSidebar',
                            label: 'Architektury počítačů a paralelních systémů',
                            sidebarId: 'APPS',
                        },
                        {
                            type: 'docSidebar',
                            label: 'Počítačové systémy',
                            sidebarId: 'POS',
                        },
                        {
                            type: 'docSidebar',
                            label: 'Programování v Java 1',
                            sidebarId: 'JAVAI',
                        },
                    ],
                },
                {
                    type: 'dropdown',
                    label: 'Tests',
                    position: 'left',
                    items: [{
                            label: 'Bezpečnost v elektrotechnice',
                            to: 'tests/BOZP/main',
                        },
                    ],
                },
                
                {
                    label: "Deadlines",
                    to: "deadlines",
                    position: "left"
                },
                {
                    label: 'Blog',
                    to: 'blog/authors',
                    position: 'right',
                },
                {
                    href: 'https://github.com/Makhuta/vsb-informatika',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [{
                title: 'More',
                items: [{
                    label: 'GitHub',
                    href: 'https://github.com/Makhuta/vsb-informatika',
                }, ],
            }, ],
            copyright: `Copyright © ${new Date().getFullYear()} VŠB Informatika, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
    }),
};

module.exports = config;