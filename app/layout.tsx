import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ccdc32',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dragfit.com'),
  title: {
    default: 'DragFit | Premium Fitness & Gym – Transform Your Body',
    template: '%s | DragFit Premium Gym',
  },
  description:
    'DragFit is a world-class premium gym offering CrossFit, strength training, yoga, cardio, and personal training. Join thousands who have transformed their lives. Free 7-day trial available.',
  keywords: [
    'premium gym', 'fitness center', 'crossfit', 'personal training', 'strength training',
    'yoga classes', 'gym membership', 'body transformation', 'elite fitness', 'dragfit gym',
  ],
  authors: [{ name: 'DragFit', url: 'https://dragfit.com' }],
  creator: 'DragFit',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dragfit.com',
    siteName: 'DragFit Premium Gym',
    title: 'DragFit | Premium Fitness & Gym – Transform Your Body',
    description:
      'Join DragFit – the elite fitness destination where champions are built. World-class equipment, expert trainers, proven results.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DragFit Premium Gym',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DragFit | Premium Fitness & Gym',
    description: 'Transform your body with DragFit – elite training, world-class facilities.',
    images: ['/og-image.jpg'],
    creator: '@dragfit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dragfit.com',
  },
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: 'DragFit Premium Gym',
  description:
    'World-class premium fitness center offering CrossFit, strength training, yoga, cardio, and personal training.',
  url: 'https://dragfit.com',
  telephone: '+1-800-DRAGFIT',
  email: 'hello@dragfit.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Fitness Boulevard',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90001',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '34.0522',
    longitude: '-118.2437',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '05:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '06:00',
      closes: '22:00',
    },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2847',
  },
  sameAs: [
    'https://facebook.com/dragfit',
    'https://instagram.com/dragfit',
    'https://twitter.com/dragfit',
    'https://youtube.com/dragfit',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-brand-black text-brand-white antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
