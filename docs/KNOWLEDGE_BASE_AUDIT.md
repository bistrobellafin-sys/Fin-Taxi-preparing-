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
| Evidence claims | 38 |
| Structured lessons | 24 |
| Practical scenarios | 3 |
| Source-backed training questions in the new registry | 10 |
| Sources with imported screenshots | 0 |
| Unverified claims stored as facts | 0 |
| Topics marked NOT_VERIFIED | 3 |
| Last verified date | 2026-08-18 |

## Interpretation

- The counters are computed from arrays in the local registry, not manually displayed marketing numbers.
- `PDFs parsed` means the text was available and used for claims. The three meter PDFs are registered but their public text extraction exposed only title/page metadata, so they are not counted as parsed.
- The current public Kela operator page was read as a web source and adds evidence for the current contract boundary, Ahola Digital, dispatch-terminal context and current meter list. Its 2027 section is represented by a separate future source and effective dates.
- `Sources with imported screenshots` is zero because screenshots were not copied into the project. The app uses text evidence and links to the official PDFs instead of pretending that a recreated UI is an official screenshot.
- `Unverified claims stored as facts` is zero by design. Restricted and missing topics are shown as boundaries, not invented lessons.
- The legacy quiz bank remains in the app for continuity. The new 10-question registry is the auditable set: each question includes `evidenceId`, source page, `trainingQuestion: true`, and `officialExamQuestion: false`.
