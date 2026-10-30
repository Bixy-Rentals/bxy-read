export const siteConfig = {
  name: "Bixy Stays Blog",
  description:
    "Book apartments, hotels, lodges, and vacation rentals easily on Bixy Stays. Discover your perfect stay with us today! Read our blog for travel tips, destination guides, and the latest updates on our offerings.",
  logo: {
    src: "/logo.svg",
    srcDark: "/logo.svg", // Used when strategy is 'switch'
    alt: "Bixy Stays Logo",
    strategy: "invert" as "invert" | "switch" | "static", // 'invert' | 'switch' | 'static'
  },
  ogImage: "/og-image.webp",
  primaryColor: "#00008B", // Default primary color
  search: {
    enabled: true,
  },
  blog: {
    postsPerPage: 8,
  },
  contact: {
    email: {
      support: "info@bixxxy.com",
      sales: "info@bixxxy.com",
    },
    phone: {
      main: "+256 782 009 476",
      label: "Mon-Fri 9am-5pm EAT",
    },
    address: {
      city: "Kampala",
      full: "Kampala, Uganda",
    },
  },
  analytics: {
    alwaysLoad: import.meta.env.ANALYTICS_ALWAYS_LOAD === "true",
    vendors: {
      googleAnalytics: {
        id: import.meta.env.GA_ID || "",
        enabled: import.meta.env.GA_ENABLED === "true",
      },
      rybbit: {
        id: import.meta.env.RYBBIT_ID || "",
        src:
          import.meta.env.RYBBIT_SRC ||
          "https://rybbit.example.com/api/script.js",
        enabled: import.meta.env.RYBBIT_ENABLED === "true",
      },
      umami: {
        id: import.meta.env.UMAMI_ID || "",
        src:
          import.meta.env.UMAMI_SRC || "https://analytics.umami.is/script.js",
        enabled: import.meta.env.UMAMI_ENABLED === "true",
      },
    },
  },
  dateOptions: {
    localeMapping: {
      en: "en-GB", // Example: Force UK English date format
    },
  },
};

export const NAV_LINKS = [
  {
    href: "/features",
    label: "Product",
    children: [
      {
        href: "https://landlord.bixyrentals.com/features",
        label: "Features",
        description: "What makes us different",
        icon: "Zap",
        localize: false,
      },
      {
        href: "https://landlord.bixxxy.com/pricing",
        label: "Pricing",
        description: "Simple, transparent commission-based pricing",
        icon: "CreditCard",
        localize: false,
      },
    ],
  },
  {
    href: "/docs",
    label: "Resources",
    children: [
      {
        href: "https://landlord.bixyrentals.com/get-started",
        label: "Docs",
        description: "Guides and tutorials to get you started",
        icon: "Book",
        localize: false,
      },
      {
        href: "/blog",
        label: "Blog",
        description: "Latest updates & guides",
        icon: "Newspaper",
      },
    ],
  },
  {
    href: "/about",
    label: "Company",
    children: [
      {
        href: "https://landlord.bixyrentals.com/about",
        label: "About",
        description: "Our story & mission",
        icon: "Building2",
        localize: false,
      },
      {
        href: "https://bixyrentals.com/inquiries",
        label: "Contact",
        description: "Get in touch with us",
        icon: "Mail",
        localize: false,
      },
    ],
  },
];

export const ACTION_LINKS = {
  primary: { label: "Get Started", href: "/docs/getting-started" },
  social: {
    linkedin: "https://www.linkedin.com/company/bixy-stays",
    github: "https://github.com/Bixy-Rentals",
    instagram: "https://www.instagram.com/bixystays",
    facebook: "https://www.facebook.com/people/Bixy-Rentals/61582636832817",
  },
};

export const FOOTER_LINKS = {
  product: {
    title: "Product",
    links: [
      {
        href: "https://landlord.bixyrentals.com/about",
        label: "About",
        localize: false,
      },
      {
        href: "https://landlord.bixxxy.com/pricing",
        label: "Pricing",
        localize: false,
      },
      {
        href: "https://landlord.bixyrentals.com/features",
        label: "Features",
        localize: false,
      },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      {
        href: "https://landlord.bixyrentals.com/policies/privacy",
        label: "Privacy",
        localize: false,
      },
      {
        href: "https://landlord.bixyrentals.com/policies/terms",
        label: "Terms",
        localize: false,
      },
    ],
  },
};
