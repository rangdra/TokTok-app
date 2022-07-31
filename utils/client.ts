import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '0ywpoixc',
  dataset: 'production',
  apiVersion: '2022-07-13',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
