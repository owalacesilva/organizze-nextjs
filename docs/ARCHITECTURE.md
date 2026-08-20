# Architecture notes

`app/` and `components/` carry no explanatory comments — the code is meant to read on
its own. What the code cannot state for itself lives here: why a thing is built the way
it is, and what breaks if it is built the other way.

Companion documents: `docs/API_USAGE.md` (the transactions API surface and hooks).

## Page shell and chrome

**`<Layout>` is rendered inside each page, not from a Next.js `layout.jsx`.**
`components/layout/index.jsx` is imported by every page *and* by every
`app/*/loading.jsx`. That is why the route skeletons render the chrome themselves — a
skeleton that returned only its content would make the sidebar and header disappear while
the page streams in.

`Layout` takes either `breadcrumbTitle` (literal text) or `breadcrumbTitleKey` (a
dictionary key). Prefer the key: it lets server components stay server components.
`components/layout/breadcrumb.jsx` items follow the same pair — `{ href, title }` or
`{ href, titleKey }`.

**`data-sidebar-state` drives `--sidebar-w`.** `Layout` writes the attribute;
`app/globals.css` turns it into the variable; the header, footer and main content all read
that variable, so their offsets animate from a single source. A new chrome element reads
`--sidebar-w` — it does not hard-code a width.

**The sidebar adopts its stored state in a layout effect, never in the first render.**
`components/layout/sidebar-context.jsx` matches the server render first and then applies
the stored preference before the browser paints, so hydration stays clean and the rail does
not flicker. Both the read and the write are wrapped in `try {}` on purpose: private mode
and blocked cookies throw, and persistence here is best-effort — the sidebar still toggles.
The keyboard shortcut is Ctrl/Cmd + B.

The collapse toggle (`components/layout/sidebar.jsx`) is rendered twice, in the sidebar and
in the header, so it stays reachable in both states. On mobile the sidebar becomes a bottom
bar docked above the footer and carries only the primary destinations
(`components/layout/nav.jsx`); tooltips are attached only where the label is hidden, since
that is the only place they earn their keep.

**`accent-theme.jsx` and `milestone-modal.jsx` mount once in the authenticated layout**,
not in the root providers. The sign-in page has no profile to ask for, and a milestone can
be met on any page.

## Modals are side panels

`components/ui/dialog.tsx` keeps Radix's `Dialog*` names — and therefore its focus trap and
escape handling — but every modal in the app slides in from the right instead of appearing
centred. Inside, the panel is a flex column: sticky header, scrolling body, sticky footer,
so long forms behave. Two consequences worth knowing:

- **A `<form>` dropped straight into the panel becomes that flex column itself**, so its
  footer can still stick to the bottom.
- The header is full-bleed by cancelling the panel padding with negative margins, and the
  close button takes a translated accessible label.

**Only one panel is on screen at a time.** Opening the form from a details panel closes the
details first (budgets, goals) — otherwise the two stack. The transactions page closes the
detail panel before the delete confirmation for the same reason, and the settings
"add bank" flow swaps its manage panel for its edit panel rather than layering them.

**Form dialogs share one shape.** Passing the record (`budget`, `goal`, `tag`,
`transaction`, `wallet`) switches the panel to edit mode; `onSubmit` receives the API
payload and may return a promise; the form reloads whenever the panel opens for a different
row. `<input type="date">` needs a bare `YYYY-MM-DD`, so the goal and transaction forms trim
to that before filling.

## Internationalisation

**The locale is settled before the first paint.** `components/elements/i18n-provider.jsx`
has the server and the first client render agree on `initialLocale`, then applies the stored
preference in a layout effect — so there is neither a hydration mismatch nor a visible flash
of the wrong language. `useLayoutEffect` warns during SSR, so it is swapped for a no-op on
the server. Reading and writing `localStorage` is best-effort; a failure leaves the
in-memory locale switching normally.

`<html lang>` starts at `defaultLocale` in `app/layout.jsx` and is kept in sync by the
provider.

**Tab `value`s double as dictionary keys** under `<section>.tabs` — in analytics, profile,
quotes and settings. Renaming a tab value renames a translation key. On mobile those tab
strips collapse into a `<select>`.

**Copy stays one translatable string wherever it can.** The places that split it are
deliberate and few:

- `components/layout/footer.jsx` splits only so the brand name keeps its accent colour.
- `components/section/insights/insight-card.jsx` looks the sentence up under
  `insights.items.<id>` and does the formatting itself, so the dictionary holds
  placeholders and never a formatted number.
- `components/section/settings/session.jsx` stores `hoursAgo` rather than a rendered
  English timestamp.
- Weekday names in `insight-card.jsx` come from adding the weekday index to 2024-01-07 —
  a Sunday — so `Intl` can name the day in the active locale.

**Money on the quotes page is always BRL.** B3, Tesouro Direto and the BRL side of every
pair are priced in reais: the UI locale changes the notation, never the currency.
`components/section/quotes/use-quote-format.js` binds `formatBRL` to `useTranslation()` so
the table, the cards and the details dialog cannot drift apart.

`components/section/settings/categories.jsx` infers a category's icon from its name, because
categories carry no icon of their own; the keyword lists are written in both shipped
languages.

## Numbers come from the statement

Analytics and dashboard figures are derived from the same statement the transactions page
reads, so no two pages can disagree — `components/section/analytics/use-analytics-data.js`
and `components/section/dashboard/use-dashboard-data.js`. Every dashboard widget calls
`useDashboardData()`; React Query dedupes by key, so the page still makes one request per
resource however many cards ask for it.

- **Balance trends walk backwards from today's balance**, month by month, so the last point
  matches the wallets (dashboard and analytics both).
- Percentage change guards against a zero baseline.
- `metric-card` takes `inverted` for expenses-like metrics, where growth is bad news.
- **Expenses are stored as negative amounts** (`transaction-form-dialog.jsx`).
- A credit card's "usage" is how much of the limit is already committed, not a balance
  (`components/section/wallets/wallets.jsx`); only a credit card declares a limit at all.
- `expenses-breakdown.jsx` picks colours deterministically, so a category keeps its colour
  between renders.
- `components/elements/top-expenses.jsx` is presentational: it takes already-normalised
  transactions (see `lib/transactions`) so the dashboard and the insights page can each
  render it from their own query.
- Insights are grouped by urgency, so a long list still reads top-down.

**`components/section/analytics/transaction-history.jsx` reuses the transactions page
wholesale** — filters, pagination and CRUD — so the two stay in sync. It replaced a separate
implementation that read fields (`loading`, `pagination`, `searchTransactionsByTerm`) which
`useGetTransactions()` never returned, and threw on render. Do not fork it again.

## Loading states

`components/elements/skeletons.jsx` holds the building blocks, and each one mirrors the
shape of the content it stands in for so the layout does not jump when the data arrives.
**Wrap a page skeleton in `<SkeletonPage>` once** — it owns the single live region, so
assistive tech announces "loading" instead of reading out empty boxes.

Per-section skeletons (`components/section/*/skeleton.jsx`) mirror their section one for
one: a change to a section's layout is a change to its skeleton. Two details that look
arbitrary and are not:

- **Tables show a skeleton in the table's own shape**, not a centred spinner, which would
  collapse the card and re-expand it (`transactions-table.jsx`, and `SkeletonTable`, whose
  column widths cycle so the rows read as a table rather than a block of identical bars).
- The quotes route skeleton shows a card **grid**, because cards are that page's default
  view.

## Quotes

**`quotes-panel.jsx` is the shared shell for all five asset classes.** They list different
figures but behave identically — search, pagination, loading/error/empty states, a manual
refresh and a table/cards switch — so a tab only describes its data and hands over the
query. Its contract:

| Prop | What it is |
| --- | --- |
| `titleKey` | dictionary key for the card heading |
| `columns` | `{ key, labelKey, align?, className?, render(row, format) }`; `render` receives `useQuoteFormat()`, so cells format in the active locale with `formatBRL` already bound |
| `card` | card/dialog descriptor `{ title, subtitle, badge?, value, change?, stats }`, where `stats` names column keys |
| `range` | optional low/high window, drawn as a position bar on the card and in the dialog |
| `details` | extra dialog config `{ omit?, stats? }` |
| `rowKey` | picks a stable React key out of a row |
| `searchable` | `(row, format)` → the string the search box matches, so translated labels stay searchable |
| `query` | a `useGet*Quotes()` result |
| `view` | `"table"` or `"cards"`, owned by the section so the choice survives switching tabs |

**Cards lead the page.** They carry the *shape* of a move — the change in currency under the
percentage, and where the price sits in the session's range — which a table row can only
list. The view preference is owned by the section rather than a tab, because preferring
cards is a preference about quotes and not about stocks in particular, and the switch icon
shows the view you get, not the one you are in.

The whole card is the hit area, so it answers to the keyboard as well as the pointer — it is
the primary way into the details dialog.

**The details dialog builds its stat grid out of the tab's own table columns**, minus the
ones the header and hero already show, so a column added to a table appears in the dialog
too, formatted the same way. `details.stats` adds figures that earn a place in the dialog
but not in the table.

Precision differs by asset class deliberately:

- FX moves in the fourth decimal, so rates get more precision than prices.
- Coins span six orders of magnitude — BTC in the hundreds of thousands of reais, DOGE
  around one — so cheap coins get extra decimals instead of collapsing to "R$ 1,04" for
  every sub-cent move.
- **Treasury has no change column.** Bonds do not tick like a share: brokers list the annual
  rate, the maturity and what a slice costs. The annual rate takes the hero slot a price
  occupies everywhere else, and reads either as a spread over an index or as a flat rate.

`change-indicator.jsx` snaps sub-threshold moves to zero so nothing renders as "-0.00%", and
states the direction three ways — colour, arrow and an explicit `+`/`−` — because colour
alone does not carry the meaning for everyone. `range-bar.jsx` centres its marker on the
position so the marker keeps its full width at either extreme instead of half-disappearing
off the end of the track.

Every row in a quotes response shares the same feed timestamp. The FII yield column is
twelve months at the latest payout measured against today's price; the currencies round-trip
figure is before any bank spread.

## Gamification and rewards

**Streaks, XP, badges and quest progress are not persisted.** `app/api/gamification/types.ts`
stores only the half that cannot be derived — purchased theme ids, and the badges whose
"milestone achieved" modal has already been shown. Everything else is computed from the
account by `lib/gamification`. That is exactly why `reward-ledger.jsx` is worth showing: the
numbers are derived rather than banked, so a user can check the arithmetic against their own
statement.

**The leaderboard is anonymous by construction, not by filtering.** `buildLeaderboard` never
ranks a savings rate that was not opted in, so there is no hidden row to leak; a row carries
a handle and a percentage and nothing else (`lib/gamification/leaderboard.js`).

- **`milestone-modal.jsx` establishes a baseline on first load instead of celebrating.** An
  account that already satisfies eight badges must not be met with eight modals — "the
  moment a condition is met" means during this session, not retroactively.
- The Launchpad quest disappears from the dashboard once complete rather than sitting there
  ticked forever; the Trophy Room keeps the Founding Member badge, which is the part worth
  keeping.
- The Trophy Room leads with unlocked badges, and locked ones say plainly what unlocks them.
  **Locked medals keep the badge's own icon** rather than swapping to a padlock — seeing
  what you are working towards is the point — and go flat grey so the unlocked ones still
  read at a glance.
- **The streak flame goes cold and grey at zero rather than disappearing**, so the streak
  has a visible place to come back to. On the dashboard it sits fifth in the metric row once
  there is room: beside the headline figures, never in place of one.
- The token balance renders nothing until the profile has loaded. A balance that flashes zero
  and then corrects itself reads as tokens being taken away.
- Marketplace affordability is re-checked by the store on purchase; the disabled button is a
  courtesy, not the rule.

**Accent themes are one CSS variable.** Buying one writes `data-accent` onto `<html>`
(`components/elements/accent-theme.jsx`) and `app/globals.css` repoints `--primary` from
there, which recolours every button, chart and progress bar at once and works in light and
dark without a second palette to keep in step. A new theme is one `[data-accent="…"]` block.

**`components/elements/confetti.jsx` is deliberately not a dependency.** Two dozen
absolutely-positioned squares on a CSS keyframe cost nothing and cannot break the bundle. It
honours `prefers-reduced-motion` by not rendering at all — a celebration is decorative, and
the badge or the completed bar already says the same thing. Positions are fixed per mount so
a re-render does not reshuffle mid-flight; re-firing needs a new `runKey`. Goals fire it as
the bar lands on 100%, and `runKey` keeps that to one burst.

**`streak-reminder.jsx` is a stand-in, and says so.** The spec asks for a push notification
or an email three hours before midnight. Neither exists in this app — there is no
notification service, no mail transport and no server-side scheduler — and neither can be
faked from the client, since both have to reach a user who has closed the tab. The component
fires on the same three-hour trigger but only for someone looking at the page;
`useGamification` ticks its clock every minute, so a session left open crosses into the
window on its own. Logging a transaction clears the risk and re-arms the warning for
tomorrow, so the toast cannot repeat within one evening. Delivering it while the user is away
needs a scheduled job on the backend.

## CSV import

**`file-drop.jsx` checks the extension itself, on top of the `accept` attribute.** `accept`
is a filter, not a guarantee, and drag-and-drop bypasses it entirely. The input value is
cleared after a reset so the same file can be picked again, and rejections are reported as
dictionary keys rather than sentences.

A column can only feed one field, so picking it elsewhere clears the previous mapping.

**The run is logged as `processing` up front**, so an import interrupted half way through
still leaves a trace in the history. `app/api/imports/types.ts` names the outcomes:

| Status | Meaning |
| --- | --- |
| `processing` | rows are still being sent |
| `completed` | every row landed |
| `partial` | some rows landed, some failed |
| `failed` | nothing landed |

**Rows are written sequentially on purpose**: the simulated backend — and most real ones —
would rather answer 90 small writes in order than all at once.

**History writes never block the import.** Both the opening and the closing history calls
swallow their own errors; the log is a nice-to-have, and a missing row must not fail an
import that otherwise worked.

## Search

`components/elements/search-dialog.jsx` opens on ⌘K / Ctrl+K, which is what people reach for
before they reach for the mouse. **The header shows a button, not a field**: typing happens
in the dialog, and a real input in the header would take focus only to hand it straight over.

The feature list reuses each page's own headings through `labelKey` / `descriptionKey`, so
results read exactly like the destination. `keywords` is a translated comma-separated list —
it is what lets "bitcoin" or "gastos" land somewhere sensible even though neither word
appears in a page title.

**Filtering is `searchFeatures`, not cmdk's own matcher**, which is neither
accent-insensitive nor label-first. The query is cleared when the dialog reopens, because a
stale one would hide the intro state, and the words offered by the empty state are each
chosen to return results. No `sr-only` description is added: the panel describes itself, and
one would only repeat the intro text already read out.

## Placeholders — what is not real yet

Several panels ship static data because the endpoint behind them does not exist. Each is a
deliberate stand-in, not an oversight:

| Where | Standing in for |
| --- | --- |
| `components/section/profile/profile.jsx`, `components/section/settings/account.jsx` | the signed-in identity, until authentication lands |
| `components/section/settings/add-bank.jsx` | a banking endpoint (payment methods) |
| `components/section/settings/api.jsx` | the API-key endpoint |
| `components/section/settings/security.jsx` | the verification endpoints (contact points) |
| `components/section/settings/session.jsx` | a sessions endpoint |
| `components/section/settings/currencies.jsx` | a rates endpoint (reference rates against BRL) |
| `components/elements/user-notification.jsx` | a notifications endpoint; copy resolves under `notifications.samples.<key>.title` / `.description` |
| `components/section/auth/EmailVerification.jsx` | polling the backend for the verification result |
| `components/elements/streak-reminder.jsx` | a scheduled push/email job (see above) |

`app/api/categories/example.tsx` is imported by nothing. It is a worked example of the
categories hooks and actions, kept beside them for reference — the same role
`docs/API_USAGE.md` plays for transactions.

## Odds and ends

- `components/elements/filter-panel.jsx` renders uncontrolled by default; pass `open` +
  `onOpenChange` to control it. `FilterField` is the label + control pair sized for its grid.
- `components/elements/data-table-pagination.jsx` takes a `usePagination()` result spread
  straight in: `<DataTablePagination {...pagination} />`.
- Any filter change sends a table back to page 1 (`components/section/transactions/index.jsx`).
- **Expanded table rows are collapsed whenever the visible slice changes** — filter or page —
  so a row that left the viewport does not come back expanded. The chevron expands in place
  while the rest of the row opens the detail panel, and the row-menu trigger stops the click
  from reaching it.
- `components/section/settings/tags.jsx` excludes the tag being edited from its duplicate
  check; the colour picker offers swatches before falling back to the native input.
- `components/section/settings/account.jsx` resets its wizard once the closing animation has
  finished, not on close.
- `components/section/auth/PasswordStrengthMeter.jsx` is a cheap heuristic: length first,
  then character variety.
- `mode-toggle.jsx` and `logo.jsx` read the resolved theme only after mount, to avoid a
  hydration mismatch; `Logo` otherwise leans on Tailwind's `dark:` classes so the server and
  the client render the same markup.

`components/ui/` is shadcn/ui. Local deviations worth knowing about before diffing against
upstream: `dialog.tsx` (the side-panel treatment above), `button.tsx` (a compact scale where
`default` is the old `sm` and `xs` covers dense toolbars) and `progress.tsx` (the filled part
can be recoloured — green once a goal is met).

## Comments that stay in the code

`app/` and `components/` hold 31 comments, all of them machine-read directives rather than
documentation. Removing them turns a green lint run red:

- **`biome-ignore lint/suspicious/noArrayIndexKey` — 30 of them**, on fixed-length
  placeholder lists (the skeletons, and a few `Array.from` loops) where a row has no
  identity to key by.
- **`eslint-disable-next-line react-hooks/exhaustive-deps`** in
  `components/elements/i18n-provider.jsx`: the layout effect that adopts the stored locale
  must run on mount only, because later changes go through `setLocale`.

Anything else explanatory belongs in this file.
