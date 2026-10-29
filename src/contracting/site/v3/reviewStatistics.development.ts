// Existing draft SQL seed shown as a public demo dataset with a preliminary label.
// This does not change CMS records or their approval state.
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
      "ar": "\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"
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
      "ar": "\u0645\u0634\u0627\u0631\u064a\u0639 \u0633\u0643\u0646\u064a\u0629"
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
      "ar": "\u0648\u062d\u062f\u0627\u062a \u0633\u0643\u0646\u064a\u0629"
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
      "ar": "\u0645\u0633\u0627\u062d\u0629 \u0627\u0644\u0628\u0646\u0627\u0621"
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
      "ar": "\u0645\u0634\u0627\u0631\u064a\u0639 \u062a\u062c\u0627\u0631\u064a\u0629"
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
      "ar": "\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062e\u0631\u0633\u0627\u0646\u064a\u0629"
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
      "ar": "\u0627\u0644\u0639\u0627\u0645\u0644\u0648\u0646"
    }
  }
]
export function reviewStatistics(language:SiteLanguage):StatisticView[]{return records.map(({labels,...record})=>({...record,label:labels[language]}))}
