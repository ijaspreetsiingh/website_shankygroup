import { getSiteUrl } from './site-url';

export const BRAND_LOGO_PATHS = {
  light: '/images/new_logo_shanky_group.png',
  dark: '/images/shanky-group-logo-dark.png',
} as const;

export const BRAND_LOGO_SIZE = {
  width: 1024,
  height: 1024,
} as const;

export function getBrandLogoUrl(variant: keyof typeof BRAND_LOGO_PATHS = 'light') {
  return `${getSiteUrl()}${BRAND_LOGO_PATHS[variant]}`;
}

export function getBrandLogoImageObjects(siteUrl = getSiteUrl()) {
  return [
    {
      '@type': 'ImageObject' as const,
      '@id': `${siteUrl}#logo-light`,
      url: `${siteUrl}${BRAND_LOGO_PATHS.light}`,
      contentUrl: `${siteUrl}${BRAND_LOGO_PATHS.light}`,
      width: BRAND_LOGO_SIZE.width,
      height: BRAND_LOGO_SIZE.height,
      name: 'Shanky Group Logo',
      caption: 'Shanky Group official logo for light backgrounds',
      description:
        'Official Shanky Group brand logo used on light mode and light backgrounds across the website.',
      encodingFormat: 'image/png',
      representativeOfPage: true,
    },
    {
      '@type': 'ImageObject' as const,
      '@id': `${siteUrl}#logo-dark`,
      url: `${siteUrl}${BRAND_LOGO_PATHS.dark}`,
      contentUrl: `${siteUrl}${BRAND_LOGO_PATHS.dark}`,
      width: BRAND_LOGO_SIZE.width,
      height: BRAND_LOGO_SIZE.height,
      name: 'Shanky Group Logo Dark',
      caption: 'Shanky Group official logo for dark backgrounds',
      description:
        'Official Shanky Group brand logo used on dark mode and dark backgrounds across the website.',
      encodingFormat: 'image/png',
      representativeOfPage: false,
    },
  ];
}

export function getBrandOpenGraphImages() {
  return getBrandLogoImageObjects().map((image) => ({
    url: image.url,
    width: image.width,
    height: image.height,
    alt: image.caption,
    type: 'image/png',
  }));
}
