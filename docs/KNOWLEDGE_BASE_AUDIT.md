# Knowledge Base Audit

**Last verified:** 2026-08-18  
**Data source:** `artifacts/mockup-sandbox/src/knowledgeBase.ts`  
**Scope:** public, readable official material only.

| Metric | Count |
|---|---:|
| Official sources discovered and registered | 23 |
| Official PDFs discovered | 7 |
| Official PDFs parsed for claims | 4 |
| Current official sources | 17 |
| Historical official sources | 2 |
| Future official sources | 2 |
| Access-restricted official entry points | 2 |
| Evidence claims | 53 |
| Structured lessons | 64 |
| Practical scenarios | 3 |
| Source-backed training questions | 120 |
| Glossary terms (Finnish–Arabic) | 48 |
| Mock exams | 12 |
| Sources with imported screenshots | 0 |
| Unverified claims stored as facts | 0 |
| Topics marked NOT_VERIFIED | 3 |
| Last verified date | 2026-08-18 |

## Content expansion (v2)

The second content pass expanded from 24 lessons / 31 questions to **64 lessons / 120 questions** by:

- Splitting existing lessons into focused sub-lessons (AD device, login, navigation, shift, Varattuna, offers, trip states, cancellation, Avoimet/Ruudut, troubleshooting).
- Adding lessons from each quality-commitment evidence row (sanctions, order reading, route, payment, privacy, customer care, clothing, smoking ban).
- Expanding Kela from 4 to 5 lessons covering current operations, booking, familiar driver, Ahola Digital, and the 2027 future contract.
- Adding practical scenarios from documented evidence (no-show, missing order info, route error).
- Deriving 110 new quiz questions from the existing 38+53 evidence records, each with `evidenceId`, `sourcePage`, `trainingQuestion: true`, and `officialExamQuestion: false`.
- Expanding the glossary from 12 to 48 Finnish–Arabic terms, all sourced from official documents or web pages.

## Interpretation

- The counters are computed from arrays in the local registry, not manually displayed marketing numbers.
- `PDFs parsed` means the text was available and used for claims. The three meter PDFs are registered but their public text extraction exposed only title/page metadata, so they are not counted as parsed.
- `Sources with imported screenshots` is zero because screenshots were not copied into the project.
- `Unverified claims stored as facts` is zero by design. Restricted and missing topics are shown as boundaries, not invented lessons.
- All 120 quiz questions include `evidenceId`, source page, `trainingQuestion: true`, and `officialExamQuestion: false`.
- The 48 glossary terms are sourced from official documents or Taksi Helsinki web pages; educational explanations are marked as such.
