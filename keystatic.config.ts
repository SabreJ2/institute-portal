import { config, fields, collection } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: 'SabreJ2',
          name: 'institute-portal',
        },
      }
    : {
        kind: 'local',
      },
  collections: {
    documents: collection({
      label: 'Document Repository',
      slugField: 'identifierSlug',
      path: 'src/content/documents/*',
      format: { contentField: 'content' },
      schema: {
        identifierSlug: fields.slug({
          name: {
            label: 'Slug Identifier',
            description: 'e.g. 20262609-400-gunsmart-core-doctrine',
          },
        }),
        title: fields.string({
          label: 'Document Title',
          validation: { isRequired: true },
        }),
        identifier: fields.string({
          label: 'Standard Catalog Identifier',
          description: 'Syntax: yyyyddmm 000 Src Description',
          validation: { isRequired: true },
        }),
        workstream: fields.select({
          label: 'Workstream Code',
          options: [
            { label: '000 Official Docs & Correspondences', value: '000 Official Docs & Correspondences' },
            { label: '100 SCS / CADC & AFP Modernization', value: '100 SCS / CADC & AFP Modernization' },
            { label: '200 Ethical AI & Pax Silica', value: '200 Ethical AI & Pax Silica' },
            { label: '300 Geopolitics & Foreign Affairs', value: '300 Geopolitics & Foreign Affairs' },
            { label: '400 GunSMART Civic Defense & Safety Institute', value: '400 GunSMART Civic Defense & Safety Institute' },
            { label: '500 The Arts & Creative Works', value: '500 The Arts & Creative Works' },
            { label: '600 Legal, Public Policy & Strategic Studies', value: '600 Legal, Public Policy & Strategic Studies' },
            { label: '700 Operations, Consulting & Administration', value: '700 Operations, Consulting & Administration' },
            { label: '800 Personal Logistics & Household', value: '800 Personal Logistics & Household' },
            { label: '900 AI Systems Architecture & Continuity', value: '900 AI Systems Architecture & Continuity' },
          ],
          defaultValue: '100 SCS / CADC & AFP Modernization',
        }),
        date: fields.date({
          label: 'Release Date',
          validation: { isRequired: true },
        }),
        documentType: fields.select({
          label: 'Document Classification',
          options: [
            { label: 'Executive Brief', value: 'Executive Brief' },
            { label: 'Technical Memorandum', value: 'Technical Memorandum' },
            { label: 'White Paper', value: 'White Paper' },
            { label: 'Doctrine / Charter', value: 'Doctrine / Charter' },
            { label: 'Strategic Study', value: 'Strategic Study' },
          ],
          defaultValue: 'White Paper',
        }),
        summary: fields.text({
          label: 'Executive Summary',
          multiline: true,
          validation: { isRequired: true },
        }),
        author: fields.string({
          label: 'Author Credit',
          defaultValue: 'Eric John San Miguel',
        }),
        status: fields.select({
          label: 'Publication Status',
          options: [
            { label: 'Published', value: 'Published' },
            { label: 'Draft', value: 'Draft' },
            { label: 'Archived', value: 'Archived' },
          ],
          defaultValue: 'Published',
        }),
        pdfDownloadUrl: fields.string({
          label: 'PDF File URL',
          description: 'e.g. /assets/docs/20262609_400_GunSMART_Core_Doctrine.pdf',
        }),
        tags: fields.array(fields.string({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({
          label: 'Document Content',
        }),
      },
    }),
  },
});
