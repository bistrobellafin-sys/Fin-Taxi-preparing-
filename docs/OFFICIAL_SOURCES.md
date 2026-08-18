# Official Sources Registry

**Knowledge base:** Taksi Helsinki Driver Academy  
**Last verified:** 2026-08-18  
**Policy:** source discovery and status are recorded locally; restricted material is not bypassed, and a URL is not treated as evidence until the relevant text has been read.

The application uses the same registry in `artifacts/mockup-sandbox/src/knowledgeBase.ts`. `content_hash` is intentionally `not_computed_in_static_build`; the static build does not silently claim that it has a remote hash or an automatic change detector.

The Sources screen's `Verify Sources` action performs a browser-side, no-store `HEAD` check for public URLs. Restricted entries are not requested. If a real baseline hash is later recorded, the same interaction can compare a downloaded response with SHA-256 and mark `SOURCE_CHANGED`; with the current registry it reports reachability only and never promotes a source to `unchanged`.

## Status values

- `official_current` — official public material treated as current at the verification date; re-check before operational use.
- `official_historical` — official material retained for history; never presented as a current rule.
- `official_future` — official material describing a future date or contract period.
- `official_notice` — an official notice record when the notice itself is publicly available.
- `access_restricted` — an official entry point redirected to Extranet/login; no protected content was accessed.
- `not_verified` — a topic remains deliberately unverified because a usable official claim was not found.

## Registry

| Source ID | Title | URL | Type | Publication / upload date | Status | Topics | Pages | Used in lessons |
|---|---|---|---|---|---|---|---:|---:|
| `th-training` | Taksi Helsingin kuljettajakoulutus | https://taksihelsinki.fi/taksi-helsinki/taksi-helsingin-kuljettajakoulutus/ | Official web page | Not stated | official_current | driver path, training, Koulutusajo, special groups | — | 2 |
| `traficom-licence` | Apply for a taxi driving licence | https://traficom.fi/en/commercial-transport/drivers-licenses-and-qualifications/apply-taxi-driving-licence | Official web page | 2026-08-05 | official_current | licence, exam, health, Ajovarma | — | 2 |
| `traficom-reform` | Changes to taxi transport regulation | https://traficom.fi/en/commercial-transport/changes-taxi-transport-regulation | Official future-change page | 2026-08-03 | official_future | future law, taximeter, taxi plates, fare transparency | — | 0 |
| `kela-transport` | Transport by taxi | https://www.kela.fi/transport-by-taxi | Official web page | Not stated | official_current | Kela, regional dispatch, special needs, familiar driver | — | 2 |
| `th-kela` | Kela-taxi | https://taksihelsinki.fi/en/kela-taxi/ | Official web page | Not stated | official_current | Kela, driver training, service | — | 2 |
| `th-kela-autot` | Kela-autot — operator and driver services | https://taksihelsinki.fi/autoilija-ja-kuljettajapalvelut/kela-autot/ | Official web page | Not stated | official_current | Kela, Ahola Digital, dispatch terminal, meters, regions, driver requirements | — | 2 |
| `th-front` | Taksi Helsinki official front page | https://taksihelsinki.fi/en/frontpage/ | Official web page | Not stated | official_current | service quality, service area, driver permit | — | 1 |
| `th-ad-sote-2026` | Kuljettajaohje 02.02.2026 — AD Kuljettaja, Kuljettajan ajosovellus SOTE | https://taksihelsinki.fi/app/uploads/2026/02/Kuljettajaohje_02022026.pdf | Official PDF | 2026-02-02 | official_current | AD Kuljettaja, shifts, offers, trip states, Avoimet, Ruudut, troubleshooting | 20 | 5 |
| `th-ad-kela-2024` | AD Kuljettaja — Kuljettajan ajosovellus KELA | https://taksihelsinki.fi/app/uploads/2025/06/kela-kuljettajasovellus-03102024.pdf | Official PDF | 2024-10-03 filename date; uploaded 2025-06-19 | official_historical | AD Kuljettaja, Kela, trip states, notifications, meter data | 18 | 2 |
| `th-quality-commitment` | Liite 3: Kuljettajan laatusitoumus | https://taksihelsinki.fi/app/uploads/2025/06/Liite-3_Kuljettajan-laatusitoumus.pdf | Official PDF | 2025-06-21 | official_current | quality, customer service, clothing, privacy, payments, routes | 6 | 6 |
| `th-materials` | Materiaalisalkku — driver materials entry point | https://taksihelsinki.fi/materiaalisalkku/ | Official Extranet entry point | Not public | access_restricted | Materiaalisalkku, driver instructions, Autocab, Cabman, Kela | — | 2 |
| `th-driver-notices` | Kuljettajatiedotteet — driver notices | https://taksihelsinki.fi/kuljettajatiedotteet/ | Official notice archive entry point | Not public | access_restricted | notices, updates, driver communications | — | 1 |
| `th-services-drivers` | Palvelut autoilijoille — services for operators | https://taksihelsinki.fi/palvelut-autoilijoille/ | Official web page | Not stated | official_current | Cabman MDT, dispatch device, vehicle, Kela connection, taxi stand | — | 3 |
| `th-app-guide` | Taksi Helsinki -sovellusohjeet | https://taksihelsinki.fi/taksi-helsinki-sovellus/taksi-helsinki-sovellusohjeet/ | Official web page | Not stated | official_current | customer app, pricing display, payments, eKuitti, pickup | — | 1 |
| `th-mitax-300` | Kela-ohjeet Mitax 300 | https://taksihelsinki.fi/app/uploads/2025/06/mitax-300_Kela.pdf | Official PDF | Uploaded 2025-06-19 | official_current | Mitax 300, meter, Kela | 5 | 1 |
| `th-mitax-400` | Kela-ohjeet Mitax 400 | https://taksihelsinki.fi/app/uploads/2025/06/Mitax-400_Kela.pdf | Official PDF | Uploaded 2025-06-19 | official_current | Mitax 400, meter, Kela | 5 | 1 |
| `th-semel-m2` | Semel M2 — Kela | https://taksihelsinki.fi/app/uploads/2025/06/semel-m2_Kela.pdf | Official PDF | Uploaded 2025-06-19 | official_current | Semel M2, meter, Kela | 7 | 1 |
| `th-kela-service-description-2022` | Kela Palvelukuvaus 2022 | https://taksihelsinki.fi/app/uploads/2025/11/Kela_Palvelukuvaus_2022.pdf | Official historical PDF | 2021–2022 service period | official_historical | Kela, dispatch, TAKSO, historical contract, data protection | 109 | 2 |
| `th-kela-2027` | Kela — new contract period | https://taksihelsinki.fi/autoilija-ja-kuljettajapalvelut/kela-autot-uusi-sopimuskausi/ | Official future-information page | 2026 page describing 2027 start | official_future | Kela, 2027 contract, future equipment, driver requirements | — | 1 |
| `th-airport` | Toiminta lentoasemalla | https://taksihelsinki.fi/toiminta-lentoasemalla/ | Official web page | Not stated | official_current | airport | — | 1 |
| `th-ports` | Toiminta satamissa | https://taksihelsinki.fi/toiminta-satamissa/ | Official web page | Not stated | official_current | ports | — | 1 |
| `th-pricing` | Taksin hinta | https://taksihelsinki.fi/tilaa-taksi/taksin-hinta/ | Official web page | Not stated | official_current | pricing, fare | — | 1 |
| `th-taxi-stands` | Taksiasemat | https://taksihelsinki.fi/tilaa-taksi/taksiasemat/ | Official web page | Not stated | official_current | taxi stands, local knowledge | — | 1 |

## Important source limits

- `Materiaalisalkku` and `Kuljettajatiedotteet` redirected to an Extranet login during verification. No login-only content was accessed or guessed.
- The current public driver guide found and parsed is **AD Kuljettaja SOTE, 02.02.2026**, not an Autocab manual. Autocab button flows, Cabman interactions, credentials, and private notices remain `ACCESS_RESTRICTED` / `NOT_VERIFIED`.
- The three meter PDFs were registered, but the available public text extraction exposed only title/page metadata. They are not used for button-level instructions. The public Kela operator page is used only for the models it explicitly lists.
- The current Kela operator page explicitly separates the contract through `31.12.2026` from the future contract beginning `1.1.2027`. Ahola Digital, current regions, current meters, future devices, and future driver requirements are kept in separate evidence records.
- The 2021–2022 Kela service description and the 2024 Kela app guide are preserved as historical evidence. They are never silently promoted to 2026 rules.
- Airport, port, area-opening, and queue instructions are linked to live official pages where found; the app does not manufacture locations, times, or private operating procedures.
