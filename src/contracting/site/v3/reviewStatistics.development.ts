// Generated from the existing draft SQL seed, for local visual review only.
// Never imported outside import.meta.env.DEV; no approval state is changed.
import type { SiteLanguage } from '../i18n/types'
import type { StatisticView } from '../v2/content/model'
const records=[
  {
    "id": "d50f708c-44fa-5477-a153-1724ecc7bbf1",
    "value": 1200000000,
    "unit": "SAR",
    "qualifier": "plus",
    "divisor": 1000000000,
    "referenceDate": null,
    "labels": {
      "en": "Project value",
      "ar": "قيمة المشاريع"
    }
  },
  {
    "id": "a650f8b7-6ad0-5a31-a0c5-796787d97b17",
    "value": 15,
    "unit": null,
    "qualifier": "exact",
    "divisor": 1,
    "referenceDate": null,
    "labels": {
      "en": "Residential projects",
      "ar": "مشاريع سكنية"
    }
  },
  {
    "id": "4b0bb955-855f-5105-a7eb-47f403448874",
    "value": 3000,
    "unit": null,
    "qualifier": "plus",
    "divisor": 1,
    "referenceDate": null,
    "labels": {
      "en": "Residential units",
      "ar": "وحدات سكنية"
    }
  },
  {
    "id": "6a6a1fb2-256f-5dbc-a79f-0d7c002e82b6",
    "value": 800000,
    "unit": "m²",
    "qualifier": "plus",
    "divisor": 1000,
    "referenceDate": null,
    "labels": {
      "en": "Built-up area",
      "ar": "مساحة البناء"
    }
  },
  {
    "id": "49662e13-b5f5-5006-aec5-ccc7abb0ee10",
    "value": 30,
    "unit": null,
    "qualifier": "plus",
    "divisor": 1,
    "referenceDate": null,
    "labels": {
      "en": "Commercial projects",
      "ar": "مشاريع تجارية"
    }
  },
  {
    "id": "09e1c8b0-a27d-512f-aa2c-9c6308ec0c7b",
    "value": 200000,
    "unit": "m³",
    "qualifier": "plus",
    "divisor": 1000,
    "referenceDate": null,
    "labels": {
      "en": "Concrete works",
      "ar": "الأعمال الخرسانية"
    }
  },
  {
    "id": "4f6ffd18-91ae-5534-a807-32608f6135d7",
    "value": 2000,
    "unit": null,
    "qualifier": "plus",
    "divisor": 1,
    "referenceDate": null,
    "labels": {
      "en": "Employees",
      "ar": "العاملون"
    }
  }
]
export function reviewStatistics(language:SiteLanguage):StatisticView[]{return records.map(({labels,...record})=>({...record,label:labels[language]}))}
