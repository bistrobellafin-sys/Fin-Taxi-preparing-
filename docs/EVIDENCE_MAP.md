# Evidence Map

**Last verified:** 2026-08-18  
**Rule:** a claim used as an operational fact must have a source ID and a page/section. Items without a public claim are represented as `NOT_VERIFIED`, not filled from memory.

| Evidence ID | Lesson / topic | Source | Page / section | Evidence claim | Confidence | Status |
|---|---|---|---|---|---|---|
| `e-ad-001` | AD device | `th-ad-sote-2026` | p. 2 · Välityslaite ja ohjelmisto | Samsung Android/Knox device; keep AD in foreground and avoid key lock so offers arrive. | high | current |
| `e-ad-002` | AD login | `th-ad-sote-2026` | p. 3 · Sovellukseen kirjautuminen | Choose SMS, enter received code, and use the login-by-code action. | high | current |
| `e-ad-003` | AD shift | `th-ad-sote-2026` | p. 6 · Työvuoron aloitus | Choose company and vehicle, set shift times, and save the shift. | high | current |
| `e-ad-004` | AD status | `th-ad-sote-2026` | p. 7 · Varattuna olo | Varattuna means no driving offers; return to Olet ajossa when available. | high | current |
| `e-ad-005` | AD offer | `th-ad-sote-2026` | p. 8 · Ajotarjous | Offer contains pickup time, pickup/destination, estimated price, special requirements, customers and stages. | high | current |
| `e-ad-006` | AD trip states | `th-ad-sote-2026` | pp. 9–12 · Matkan aloittaminen ja vaiheet | Public sequence covers start, arrival, pickup ready, no-show when applicable, destination arrival and completion. | high | current |
| `e-ad-007` | AD open list | `th-ad-sote-2026` | p. 13 · Avoimet-lista | Open orders can be sorted by time or distance. | high | current |
| `e-ad-008` | AD Ruudut | `th-ad-sote-2026` | pp. 15–16 · Ruudut | Vehicle-type filters and 30/60/120-minute queue values are described. | high | current |
| `e-ad-009` | AD history | `th-ad-sote-2026` | p. 17 · Matkahistoria | Date filtering and UUID for possible billing correction requests. | high | current |
| `e-ad-010` | AD troubleshooting | `th-ad-sote-2026` | p. 19 · Ongelmia? | Refresh connection from the red connection icon; notification/location permissions may matter. | high | current |
| `e-ad-011` | AD restart | `th-ad-sote-2026` | p. 20 · Ongelmia? | End shift, log out, close app, and power down for a slow/unresponsive device. | high | current |
| `e-kela-001` | Historical Kela login | `th-ad-kela-2024` | p. 2 | Historical guide describes phone number + four-digit SMS code. | high | historical |
| `e-kela-002` | Historical Kela menu | `th-ad-kela-2024` | pp. 3–4 | Historical menu areas include driver, vehicle, messages, offers, future trips, history, open list and Ruudut. | high | historical |
| `e-kela-003` | Historical Kela shift | `th-ad-kela-2024` | pp. 5–7 | Offers require an active saved shift; Ajossa and Varattuna are distinguished. | high | historical |
| `e-kela-004` | Historical Kela trip | `th-ad-kela-2024` | pp. 8–10 | Historical offer and trip-state controls are recorded. | high | historical |
| `e-kela-005` | Kela meter link | `th-ad-kela-2024` | p. 12 · Matkahistoria | Historical guide says meter data is joined using the order identifier. | high | historical |
| `e-kela-006` | Kela troubleshooting | `th-ad-kela-2024` | pp. 14–15 | Historical guide covers connection refresh and notification/location permissions. | high | historical |
| `e-kela-007` | Kela compensation | `th-ad-kela-2024` | pp. 16–17 | Historical guide contains approach-compensation examples and a stated maximum; no current price claim is made. | high | historical |
| `e-quality-001` | Quality controls | `th-quality-commitment` | p. 1 · Sanktiot | Possible breach consequences include notice, attribute removal, training/test, dispatch ban or driving ban. | high | current document; verify policy updates |
| `e-quality-002` | Appearance and price compliance | `th-quality-commitment` | p. 2 | Follow current price/agreement, show driver card, keep car/workwear clean, follow clothing guidance, no smoking. | high | current document; verify policy updates |
| `e-quality-003` | Accepted order | `th-quality-commitment` | pp. 2–3 | Read the accepted order fully; contact the service centre if information is missing. | high | current document; verify policy updates |
| `e-quality-004` | Route | `th-quality-commitment` | p. 3 | Use economical/appropriate route unless customer requests another; compensate own route-error surcharge. | high | current document; verify policy updates |
| `e-quality-005` | Payment and receipt | `th-quality-commitment` | pp. 3–4 | Accept common payment methods and offer a receipt, including cash. | high | current document; verify policy updates |
| `e-quality-006` | Privacy | `th-quality-commitment` | pp. 4–5 | Confidentiality; phone use only for matters directly tied to the ride; no unrelated phone use with customer aboard. | high | current document; verify policy updates |
| `e-quality-007` | Customer care | `th-quality-commitment` | pp. 5–6 | Help as needed, handle lost property according to law, avoid sensitive topics, preserve travel peace, do not block front seat without valid reason. | high | current document; verify policy updates |
| `e-service-001` | Operator services | `th-services-drivers` | web page | Public page links to Cabman MDT, dispatch device, vehicle, Kela connection and contract stand services. | high | current page; not a private procedure |
| `e-app-001` | Public fare display | `th-app-guide` | web page · ordering | Customer guide describes fixed price with destination and meter pricing when no destination is supplied; live fare page remains authoritative. | high | current page; verify pricing |
| `e-materials-001` | Autocab / materials boundary | `th-materials` | login page | Official Materiaalisalkku entry point redirects to Extranet; protected material was not accessed. | high | access_restricted |
| `e-notices-001` | Driver notices boundary | `th-driver-notices` | login page | Official notice entry point redirects to Extranet; no notice is represented without its public text. | high | access_restricted |
| `e-kela-historical-001` | Historical Kela contract | `th-kela-service-description-2022` | pp. 5–9 | Historical service description discusses regional dispatch, TAKSO, direct compensation and special vehicle needs; not current 2026 guidance. | high | historical |
| `e-kela-current-001` | Kela special needs | `kela-transport` | web page · additional information | Kela dispatch receives authorised vehicle type and can retain information about special assistance or assistive devices. | high | current |
| `e-th-kela-001` | Kela driver training | `th-kela` | web page · Good to know | Taksi Helsinki says Kela drivers have completed special-groups training and Taksi Helsinki Kela training. | high | current |
| `e-kela-th-001` | Current Kela regions | `th-kela-autot` | web page · current contract through 31.12.2026 | Current regions listed are Uusimaa, Kanta-Häme, Varsinais-Suomi, Pirkanmaa, Satakunta, Keski-Suomi, Pohjois-Savo and Lapland. | high | current |
| `e-kela-th-002` | Ahola Digital and current meters | `th-kela-autot` | web page · general Kela dispatch | Ahola Digital is named for dispatch; the page lists a dispatch-terminal option and Cabman MDT, Semel M2, Mitax 300 and Mitax 400. | high | current |
| `e-kela-future-001` | 2027 Kela contract | `th-kela-2027` | web page · contract period and schedule | Future period is 1.1.2027–31.12.2030 and new dispatch starts 1.1.2027 in the listed regions. | high | future; effective 2027-01-01 |
| `e-kela-future-002` | 2027 devices and meters | `th-kela-2027` | web page · Laitevaatimukset | Future accepted devices and meters are listed explicitly, including Mitax 500 and Cabman. | high | future; effective 2027-01-01 |
| `e-kela-future-003` | 2027 driver requirements | `th-kela-2027` | web page · driver requirements and training | Future page lists licence, taxi professional licence, language, special-groups training and Kela training; updated Kela training opens in November 2026. | high | future; effective 2027-01-01 |
| `e-kela-future-004` | Requested taxi versus familiar driver | `th-kela-2027` | web page · FAQ | The future page distinguishes Toivetaksi from Kela-granted familiar-driver rights. | high | future; effective 2027-01-01 |

## Lesson-to-evidence index

- `kb-ad-001` → `e-ad-001`, `e-ad-002`
- `kb-ad-002` → `e-ad-003`, `e-ad-004`
- `kb-ad-003` → `e-ad-005`, `e-ad-006`
- `kb-ad-004` → `e-ad-007`, `e-ad-008`, `e-ad-009`
- `kb-quality-001` → `e-quality-001`, `e-quality-003`
- `kb-quality-002` → `e-quality-002`
- `kb-quality-003` → `e-quality-006`, `e-quality-007`
- `kb-autocab-001` → `e-materials-001`
- `kb-meter-001` → `e-service-001`, `e-quality-005`
- `kb-pricing-001` → `e-quality-002`, `e-app-001`
- `kb-areas-001` → `e-materials-001`, `e-notices-001`
- `kb-kela-001` → `e-kela-005`, `e-kela-current-001`, `e-th-kela-001`, `e-kela-historical-001`
- `kb-kela-002` → `e-kela-001`, `e-kela-004`, `e-kela-005`, `e-kela-007`
- `kb-kela-003` → `e-kela-th-001`, `e-kela-th-002`
- `kb-kela-004` → `e-kela-future-001`, `e-kela-future-002`, `e-kela-future-003`, `e-kela-future-004`
- `kb-special-001` → `e-kela-historical-001` (the current-page claims remain linked at lesson/source level; no current operational claim is asserted without a dedicated evidence row)
- `kb-services-001` → `e-service-001`
- `kb-exam-001` → `e-ad-001`, `e-ad-006`, `e-quality-002`

## Deliberately unverified

The following are not stored as facts: Autocab login/PIN/Driver ID flows, private Autocab Assistant behavior, Cabman button sequences, Mitax/Semel button sequences, current area opening times, airport/port queue instructions, private notices, credentials, and leaked exam questions. They appear in the app only as `ACCESS_RESTRICTED` or `NOT_VERIFIED` coverage records.
