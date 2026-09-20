# Dolancer Redesign Plan

## Executive direction

Dolancer should present itself as an **open-entry, worker-facing opportunity platform**: anyone can join, create a profile, find suitable work opportunities, complete legitimate work, and earn according to the terms shown for that opportunity. The public experience must make that promise understandable before signup.

The product is **not an unrestricted public marketplace**. It remains supervisor-routed. Dolancer supervisors define, screen, route, and monitor opportunities. Workers see anonymized, eligible work briefs rather than public client identities. There is no bidding, proposal competition, direct client selection, or worker-client negotiation. The public site must not imply guaranteed hiring, guaranteed earnings, instant payment, employment status, or universal availability.

The redesign should combine the strongest observed patterns from worker opportunity platforms—plain-language search, broad but scannable disciplines, concrete opportunity cards, progressive detail, and a short worker workflow—while translating away the mechanics that conflict with the product requirements. The recommended page order is:

> **Promise and entry point → work disciplines → concrete offer examples → worker workflow → trust and safety → final join CTA.**

This ordering is deliberate. Research shows that marketplace and gig platforms become easier to understand when they make the work concrete before asking users to absorb a process. Dolancer should therefore show what a worker may do before explaining how the platform routes and reviews that work. [1] [2] [3] [4]

### Product position to preserve

| Decision | Direction for Dolancer | Explicitly excluded |
|---|---|---|
| Audience | Anyone may join as a worker; the first public journey is worker-first. | A public client directory or client acquisition funnel |
| Opportunity model | Supervisor-routed, anonymized, bounded opportunities with visible requirements and terms. | Open marketplace browsing by named client |
| Worker action | Find an eligible opportunity, review it, complete it, submit evidence, and track status/payment. | Bidding, proposal competition, direct negotiation, or client selection |
| Work language | Tasks, opportunities, deliverables, requirements, review, status, and payout terms. | Guaranteed jobs, guaranteed income, “instant money,” or unsupported earning potential |
| Scope safety | Legitimate, reviewable work with clear acceptance criteria. | Academic cheating, exam completion, impersonation, credential fraud, deceptive outreach, or unsafe/regulated work without dedicated governance |
| Trust | Process evidence: anonymized briefs, clear scope, platform review, privacy controls, support, and payment/status transparency. | Fabricated testimonials, borrowed logos, public client names, invented activity, or unverified scale claims |
| Visual direction | White-dominant system with intentional dark sections and blue-only gradients or blue spotlights. | Purple, green, yellow, multicolor gradients, or decorative color unrelated to the brand direction |

## Reference comparison and design translation

The table below captures what should be retained from the research and what must be rejected or translated.

| Reference | Useful pattern | Dolancer translation | Do not copy |
|---|---|---|---|
| Dolancers | Worker-first language such as “Start Earning,” profile creation, opportunity discovery, delivery, and secure payment; compact cards with type, duration, rate/budget, skills, and status. [1] | Use “Join free,” “Find suitable opportunities,” “Complete the work,” and “Track review and payout status.” Keep cards focused on discipline, deliverable, effort, requirements, and task terms. | “Submit a Proposal,” proposal counts, client review/selection, public client identity, named users, fabricated scale, or escrow claims unless operationally true. |
| Apna | Immediate search, structured filters, progressive detail, and clear metadata such as work mode, experience, language, and compensation. [2] | Make discovery fast, but translate jobs into bounded task opportunities. Use filters for discipline, format, remote/field mode, availability, skills, and eligibility. | Employer logos, direct HR contact, employment guarantees, institutional marks, public company identity, and unsupported “verified” or scale claims. |
| Awign | Role taxonomy, visible requirements and earning terms, worker sequence from discovery through screening/training and work, plus explicit “notify me” states when supply is unavailable. [3] | Use discipline and offer cards with requirements, effort, task mode, and transparent payment rules. Provide “Notify me” or “No suitable opportunities yet” states rather than inventing demand. | “Earn up to” promises, enterprise logos, named clients, implied employment offers, and availability claims that cannot be maintained. |
| Taskmo | Audience-specific worker acquisition, recognizable role cards, and a clear distinction between flexible work and conventional careers. [4] | Keep the public route worker-first. Use role/outcome cards and state whether the opportunity is task-based, short-term, recurring, remote, or field-based. | Instant earnings, job security, zero-fee guarantees, client case studies, public lead forms that collect unnecessary data, and promotional popups that interrupt discovery. |
| PickMyWork | Compact opportunity cards, short numbered flow, FAQs, and visible caveats about income not being guaranteed. [5] | Use small, scannable cards and a concise “Join → find → complete → review/payment status” explanation. Put caveats next to earning and payout language, not only in the footer. | Top-earner anchoring, public partner identities, referral/financial-product tasks, activity tickers, or claims of guaranteed weekly payment. |
| SquadStack / related operational patterns | Anonymized work examples, skill-based qualification, guided execution, review, escalation, and compliance content. [6] | Show safe anonymized examples and explain the route from eligibility to guided completion and review. Make support and escalation visible. | Client logos, real call recordings, regulated sales/collections/KYC workflows, and claims imported from historical or unavailable products. |

## Homepage information architecture

The homepage should be a single worker comprehension funnel, not a directory of public clients. It should support two entry decisions: **explore suitable work** and **join the worker network**. The primary CTA should be opportunity discovery; signup should remain visible but should not block basic understanding.

### 1. Header and navigation

Use a compact header with the Dolancer wordmark, “How it works,” “Work disciplines,” “Safety and standards,” “Support,” “Sign in,” and a primary “Join free” button. Do not expose “Hire,” “Post a job,” “Browse clients,” or equivalent public client routes in the worker-facing navigation.

On mobile, preserve the primary “Explore opportunities” and “Join free” actions in the first menu layer. Do not hide safety or support under a secondary overflow menu if the navigation is the user’s first trust checkpoint.

### 2. Hero: explain the worker promise and provide a first action

The hero should state all four required ideas in plain language: **anyone can join, suitable work can be found, work can be completed, and earnings follow the disclosed terms**. It should not imply guaranteed supply or income.

The first action should be “Explore opportunities” or “Find suitable work.” The secondary action should be “How it works.” A small supporting line can say that opportunities are reviewed and routed by Dolancer supervisors, with task requirements and payment terms shown before commitment.

Recommended hero information:

- Eyebrow: **Open to anyone who meets the opportunity requirements**.
- Headline: A worker-centered promise without a superlative.
- Support: Work mode, requirements, effort, and payment terms are shown per opportunity.
- Primary CTA: **Explore opportunities**.
- Secondary CTA: **See how Dolancer works**.
- Optional search/filter entry: discipline, “remote / field / hybrid,” and skill or task type.
- Trust microcopy: **No bidding. No public client identity. Clear task standards.** Use only if these are confirmed product rules.

### 3. Work disciplines

Introduce the eight canonical categories before the workflow. The section should answer: “What kind of work might I do here?” Each category card should include a short descriptor and one safe example, not a generic label alone.

Use an eight-card grid on desktop, a two-column grid on tablet, and a single-column or snap-scroll list on mobile. Each card should have a text label, a simple original illustration or icon, a one-line scope statement, and a “View examples” action.

### 4. Concrete offer examples

After disciplines, show a curated row or grid of anonymized offer cards. These are not public client jobs. They are representative, currently available, or explicitly labeled examples. Each card should show the work itself before platform explanation.

The card system is specified below. Use no public client name, company logo, personal identity, review count, proposal count, or fabricated live activity. If an offer is not currently available, label it “Example task format” rather than presenting it as live.

### 5. Worker workflow

Place the workflow **after the cards**, so the user first understands what the work is. The recommended sequence is:

1. **Join and create a profile.** Add relevant skills, availability, preferred work mode, and any required verification. Explain why each field is collected.
2. **Find a suitable opportunity.** Browse or receive supervisor-routed opportunities that match the worker’s profile. The worker does not browse named clients.
3. **Review requirements and terms.** Read the scope, expected output, tools, effort estimate, deadline, eligibility, review criteria, prohibited uses, and payment conditions before accepting or applying.
4. **Complete the work safely.** Follow the brief, guidance, privacy rules, and any required training. The platform can provide checkpoints or supervisor support.
5. **Submit work and track status.** Upload the defined artifact or completion evidence. The worker sees received, under review, needs changes, accepted, or payment-processing status as applicable.
6. **Receive payment according to the disclosed terms.** Phrase this as a process condition, not a promise. Show the applicable timing, deductions, eligibility, and exception path for each opportunity.

If the product does not yet implement every step, the homepage must not present it as live functionality. Mark future steps as planned internally and keep public copy limited to current capabilities.

### 6. Safety, standards, and support

Use an intentional dark section to explain what makes an opportunity legitimate and what the platform will not support. Keep the language direct:

- No academic cheating, exam completion, impersonation, or credential fraud.
- Do not share passwords, sensitive credentials, or unnecessary personal data.
- Do not accept work that requests deceptive outreach, illegal activity, or unsafe conduct.
- Task scope, review criteria, and payment terms must be visible before commitment.
- Report unclear, unsafe, or prohibited requests through support.

This is also the right location for links to privacy, worker terms, prohibited-work policy, reporting, and payout rules.

### 7. Final CTA and footer

End with a clear invitation: **Join free and see what work may fit your skills.** Add a secondary “Read safety standards” link. The footer should repeat Support, Safety, Privacy, Terms, Accessibility, and payout information. Do not use a large statistic wall unless each metric has an owner, definition, timestamp, and current data source.

## Hero copy options

These are options for product review. They should be tested against legal, operational, and tone requirements before selection.

### Option A — clearest and most direct

**Find work that fits your skills.**

Anyone can join Dolancer, explore suitable work opportunities, complete clear tasks, and earn according to the terms shown for each opportunity.

Primary CTA: **Explore opportunities**  
Secondary CTA: **How it works**

### Option B — emphasizes clarity and control

**See the work before you commit.**

Discover supervisor-routed opportunities with clear requirements, expected output, effort, and payment terms. Join free, complete legitimate work, and track your status in one place.

Primary CTA: **Find suitable work**  
Secondary CTA: **See task standards**

### Option C — emphasizes accessibility without guaranteeing supply

**A place to start doing meaningful work.**

Create a profile, find opportunities that match your skills and availability, complete the work safely, and follow the platform’s review and payment process.

Primary CTA: **Join free**  
Secondary CTA: **Explore disciplines**

### Option D — emphasizes the constrained model

**Work opportunities, routed with clarity.**

Dolancer connects eligible workers to anonymized, supervisor-routed tasks. Review the brief, do the work, submit your result, and see what happens next.

Primary CTA: **Browse work formats**  
Secondary CTA: **Understand the process**

### Copy guardrails

Avoid “guaranteed work,” “guaranteed income,” “instant payout,” “unlimited earning,” “clients are waiting,” “choose your client,” “bid,” “win projects,” “hire,” and “get approved” unless the term has a narrowly defined, documented meaning. If a number is ever used, label whether it is a range, historical median, maximum under conditions, or current operational target.

## Discipline and offer-card system

The eight canonical categories should remain recognizable, but each must be translated from a broad service marketplace label into bounded, safe work formats. The category is the entry point; the offer card is the decision unit.

### Canonical discipline cards

| Category | Category promise | Safe offer examples | Key requirements to expose |
|---|---|---|---|
| **Web Development** | Build, test, or improve defined digital interfaces and workflows. | Fix a documented UI issue; convert an approved design into a responsive page; test a small feature against acceptance criteria; clean structured content in a CMS. | Framework/tool requirements, test environment, expected artifact, access boundaries, estimated effort, review criteria. |
| **Graphic Design** | Produce defined visual assets from an approved brief. | Create a set of social graphics; adapt a supplied brand system to a banner set; prepare a presentation illustration; format a digital asset pack. | Dimensions, source assets, file formats, brand rules, revision boundary, accessibility requirements, delivery checklist. |
| **Digital Marketing** | Support measurable, policy-compliant marketing operations. | Tag and classify campaign content; format a content calendar; prepare keyword or competitor research; QA landing-page metadata; create a report from supplied data. | Approved channels, claims policy, data sources, prohibited outreach, tools, output format, review standard. |
| **Video & Animation** | Edit or assemble media to a clear brief. | Cut a short captioned clip; add subtitles and basic motion titles; create a simple product demonstration sequence; QA timing and accessibility. | Licensed source media, duration, aspect ratios, caption standard, audio requirements, export format, review notes. |
| **Writing & Translation** | Produce or transform text without misrepresentation. | Proofread supplied copy; translate approved product text; format a knowledge-base article; summarize provided material with citations; localize UI strings. | Source ownership, language pair, style guide, length, citation rules, prohibited academic work, originality and attribution requirements. |
| **AI Services** | Perform supervised, transparent AI-assisted production or evaluation. | Label or evaluate model outputs; compare responses against a rubric; clean and classify data; draft a structured prompt test report; QA generated content for policy issues. | Data sensitivity, human-review requirement, rubric, model/tool boundaries, disclosure requirement, secure handling, escalation path. |
| **Music & Audio** | Create or edit audio deliverables within explicit rights and technical limits. | Clean a supplied recording; create a short licensed sound bed; edit a podcast segment; label or quality-check audio; prepare an accessibility transcript. | Rights/consent, source files, loudness standard, duration, stems or export format, prohibited impersonation/voice cloning. |
| **Business** | Complete structured operations, research, and administrative support. | Clean a provided spreadsheet; reconcile a defined data set; format an internal process document; perform non-sensitive web research; classify support tickets. | Data access level, privacy limits, schema, validation rules, output format, escalation conditions, no regulated advice or deceptive contact. |

### Offer-card anatomy

Every card should use the same hierarchy so users can compare opportunities without learning a new layout:

1. **Work label:** category and task type, such as “Writing & Translation · Proofreading.”
2. **Plain-language title:** describe the artifact or outcome, not an abstract job title.
3. **One-line deliverable:** “Return a marked-up document and a clean final copy.”
4. **Effort and timing:** estimated minutes/hours and deadline window, clearly labeled as an estimate where applicable.
5. **Work mode:** remote, field, or hybrid; include location only when necessary.
6. **Requirements:** skills, tools, language, device, age or legal eligibility only when genuinely necessary and policy-reviewed.
7. **Payment terms:** fixed amount, rate, or range with conditions, deductions, review state, and timing. Never use a bare “earn up to” figure.
8. **Safety/status chips:** “Anonymized brief,” “Human review,” “No sensitive credentials,” “Example format,” or a verified task state only when the system can substantiate it.
9. **Primary action:** “View task details,” “Check eligibility,” or “Notify me.” Do not use “Bid,” “Send proposal,” or “Contact client.”

### Detail-page requirements

Clicking a card should expand the same facts rather than introduce hidden commercial mechanics. The detail view should contain the scope, exclusions, expected artifact, examples of acceptable quality, eligibility, tools/access, time estimate, deadline, payment conditions, review states, privacy treatment, support route, and prohibited-use reminder. Public client identity remains hidden. A worker may be asked to apply or accept only after seeing enough information for informed consent.

## Image and illustration strategy

The visual strategy should make work concrete without borrowing identity from clients, workers, or competitor brands.

### Recommended assets

- Use original, abstracted illustrations for the eight disciplines. Each illustration should show a work artifact or interface state, not a recognizable client environment.
- Use cropped UI mockups for task briefs, requirement checklists, submission evidence, review status, and payout records. Use synthetic data only.
- Use restrained human imagery only where it supports inclusion and comprehension. Prefer diverse, non-identifiable hands, workspaces, or portrait crops with licensed rights. Do not imply that a pictured person completed a specific task or earned a specific amount.
- Use a discipline icon family with consistent stroke weight. Icons should have a text label and never be the sole way to identify a category.
- Use blue spotlights, soft blue radial fields, or a blue line motif to guide attention. Keep them behind content and avoid rainbow or purple gradients.
- Avoid stock imagery of cash, luxury, “hustle,” or exaggerated success. It conflicts with the process-transparent positioning.

### Asset governance

Every asset should have an owner, license or generation record, alt text, and a decision on whether it represents a real product state or an illustration. Do not use competitor logos, client logos, user avatars, public testimonials, or live activity unless permission, consent, and a current data source exist.

## White, dark, and blue visual system

### White as the default

White should dominate the page and carry the main reading surfaces. Use off-white only as a quiet section separator, not as a competing brand color. Cards should be light, spacious, and information-dense without looking like a job-board dump.

### Dark sections with a purpose

Use dark navy or near-black sections intentionally for:

- the safety and standards explanation;
- a compact “how review and payout status work” module;
- a final CTA band when the page needs a strong close;
- optional navigation or footer surfaces.

Dark sections should contain substantive reassurance, not decorative contrast alone. Text must meet accessibility contrast requirements, with visible focus states and no information conveyed by color alone.

### Blue-only emphasis

Use a controlled blue family for CTAs, links, focus rings, status emphasis, and spotlights. Gradients may move between two approved blue tones only. Do not introduce purple, green, orange, or yellow gradients to signal energy or earnings.

Recommended semantic roles:

- **Primary blue:** filled CTA and active controls.
- **Deep blue:** dark section accents and hover state.
- **Pale blue:** selected filter background and non-critical callouts.
- **Blue gradient/spotlight:** hero or section-level atmosphere, never body text or essential status.
- **Neutral ink and gray:** all core text, metadata, dividers, and unavailable states.

The design system should define contrast, disabled, hover, pressed, focus, and reduced-motion behavior before visual polish begins.

## Animation plan

Motion should support comprehension and perceived responsiveness, not simulate demand or earnings.

### Allowed motion

- A short, one-time hero reveal for headline, supporting copy, and controls.
- Staggered entrance for discipline cards when they enter the viewport.
- Subtle card lift or border emphasis on hover and keyboard focus.
- A smooth accordion transition for FAQs and policy explanations.
- Status-chip transitions when a real task status changes.
- A slow blue spotlight drift that is decorative and paused under reduced-motion preferences.

### Prohibited or gated motion

Do not use fabricated live-activity tickers, fake task counts, auto-rotating testimonials, rapid counters, urgency pulses, or motion around the payment CTA. Do not make essential task requirements appear only after a carousel action.

All carousels must have visible controls, keyboard support, a static fallback, pause behavior, and an equivalent mobile reading order. Respect `prefers-reduced-motion`. Motion QA is a release gate, not a later enhancement.

## Trust and compliance placement

Trust should be distributed next to the decision it supports rather than isolated in a generic credibility band.

| User question | Placement | Evidence Dolancer must have before publishing |
|---|---|---|
| Is this work real and understandable? | Directly below offer cards and on task detail. | Anonymized brief, scope, deliverable, eligibility, review criteria, and availability state. |
| Is my information protected? | Hero microcopy, detail page, safety section, and footer privacy link. | Data-minimization rationale, privacy policy, access controls, retention rules, and escalation route. |
| What happens after I submit? | Workflow and task detail. | Actual status states, reviewer responsibility, change-request rules, and support process. |
| When and how can I be paid? | Task detail, payout FAQ, and worker account. | Payment method, timing, conditions, deductions, review dependency, exceptions, and legal/tax disclosures as applicable. |
| What work is prohibited? | Discipline area, task detail, submission screen, and safety page. | A reviewed prohibited-work taxonomy covering academic misconduct, credential sharing, impersonation, deception, illegal activity, and unsafe or regulated work. |
| What if a task is unclear or unsafe? | Offer card, detail page, and persistent support/report action. | Moderation ownership, report workflow, response expectations, and non-retaliation policy if applicable. |

Avoid “verified,” “secure,” “escrow-protected,” “insured,” “trusted by,” “top-rated,” or similar labels unless there is a live control or audited process behind each label. The research repeatedly found that platform metrics, logos, ratings, and payment promises are often page claims rather than independently verified facts. [1] [2] [3] [5]

## Phased implementation with gates

### Phase 0 — Product and policy lock

Define the supervisor-routed opportunity lifecycle, worker eligibility model, status names, payment terminology, prohibited-work policy, privacy boundaries, and approved categories. Inventory which workflow steps are live versus planned.

**Gate 0:** No page copy or visual concept proceeds until product, policy, legal, operations, and payments owners sign off on the vocabulary and on every claim the public site may make.

### Phase 1 — Content model and low-fidelity architecture

Create the homepage content model, eight discipline definitions, offer-card schema, task-detail schema, safety module, and FAQ outline. Produce desktop and mobile wireframes that preserve the sequence: promise → disciplines → offers → workflow → trust → CTA.

**Gate 1:** A first-time worker can explain what work is available, what information is visible before commitment, and what happens after submission without seeing a client identity or bidding control.

### Phase 2 — Visual system and representative prototype

Build the white/dark/blue design tokens, typography hierarchy, card states, icon/illustration direction, hero options, motion rules, and representative screens for one discipline. Use synthetic content and no unsupported metrics.

**Gate 2:** Design review confirms that the page is white-dominant, dark sections are intentional, gradients are blue-only, and no visual treatment implies public client selection or guaranteed income.

### Phase 3 — Content and interaction validation

Test all eight category cards, at least two offer cards per category, task-detail states, eligibility messaging, “notify me”/empty states, support/report actions, mobile layout, keyboard navigation, and reduced motion. Run comprehension tests with people unfamiliar with the product.

**Gate 3:** Users can identify a suitable work format, find the requirements and payment conditions, name the next step, and identify prohibited work. No critical privacy, safety, or misleading-claim issue remains open.

### Phase 4 — Production rollout

Release the homepage and discipline content behind analytics and content governance. Instrument discovery, card-detail opens, eligibility checks, join starts, completion of the first profile step, support/report use, and drop-off at payment-term review. Do not instrument or publish sensitive client information.

**Gate 4:** Operational owners can maintain availability, terms, prohibited-work flags, status language, and support links without engineering changes. Marketing claims have an owner and expiry/review date.

### Phase 5 — Iteration and evidence review

Review performance by device, discipline, availability state, accessibility mode, and worker cohort. Improve clarity before adding visual density or more motion. Add public metrics only when the data definition and refresh process are documented.

**Gate 5:** Any new trust claim, live activity module, earning language, or category must pass the same evidence and policy review as the initial launch.

## Acceptance criteria

### Message and positioning

- The first viewport says or clearly communicates that anyone can join, find suitable work opportunities, complete work, and earn according to disclosed terms.
- The page is worker-first and does not present a public client marketplace.
- The language distinguishes task opportunities from employment, and it contains no unsupported guarantee.
- “Bidding,” “proposal,” direct client selection, public client identity, and client negotiation are absent from the public experience.

### Information architecture

- The eight canonical categories appear before the workflow section.
- Each category has at least one concrete, policy-reviewed offer example.
- Offer cards expose deliverable, effort/timing, work mode, requirements, and payment terms or a clearly labeled unavailable/example state.
- The workflow appears after the cards and explains discover → review → complete → submit/status → payment terms.
- Safety, support, privacy, and prohibited-work information are reachable from the page without requiring signup.

### Visual and interaction

- White is the dominant surface color.
- Dark sections are limited to purposeful trust, safety, workflow-status, or closing modules.
- Gradients and spotlights use blue only.
- Cards remain legible at mobile widths and do not rely on hover.
- Keyboard focus, touch targets, alt text, reduced motion, and contrast meet the product’s accessibility bar.
- Motion is progressive enhancement and never the source of task requirements, availability, or payment information.

### Trust and content governance

- Every metric, badge, “verified” label, payment statement, and availability statement has a source, owner, definition, and review date.
- No client names, logos, user identities, testimonials, or activity events appear without consent and current evidence.
- Every live opportunity has a moderation status and a route for reporting unclear or unsafe work.
- Academic misconduct and prohibited-work rules appear at discovery, detail, and submission points.

## Validation checklist

### Content comprehension

- Can a new visitor state what Dolancer is in one sentence?
- Can a visitor name at least three disciplines and one concrete offer in each?
- Can a visitor tell whether a card is a live opportunity, a representative example, or unavailable?
- Can a visitor find the effort estimate, eligibility, expected output, and payment conditions without opening a client profile?
- Can a visitor explain what happens after work is submitted?
- Can a visitor identify that Dolancer does not use bidding or direct client selection?

### Safety, privacy, and integrity

- Are public briefs anonymized?
- Are sensitive credentials and unnecessary personal data explicitly excluded?
- Are academic cheating, exam completion, impersonation, and credential fraud prohibited in the relevant contexts?
- Are financial, regulated, deceptive, or unsafe tasks excluded or separately governed?
- Is the report/support action visible on mobile and desktop?
- Are terms and payout conditions shown before commitment?

### Accessibility and responsive behavior

- Does the content order remain understandable at 320–375px widths?
- Can users browse cards and open details with keyboard and touch?
- Does every image have appropriate alt text, and does decorative art remain hidden from assistive technology?
- Does the page remain usable when motion is reduced or disabled?
- Do dark sections, blue links, chips, and disabled states meet contrast requirements?
- Are loading, empty, unavailable, and error states understandable without color or animation?

### Evidence and operations

- Are live opportunity states sourced from the same system that routes work?
- Are stale or unavailable cards removed or relabeled?
- Do payment terms match the actual payout process?
- Do support and policy links resolve on every breakpoint?
- Is analytics free of client identity and unnecessary personal data?
- Is there an owner for every public claim and a scheduled review date?

## Risks and mitigations

| Risk | Consequence | Mitigation |
|---|---|---|
| The open-entry message is read as guaranteed work or income. | Misleading expectations and support burden. | Use “anyone can join” together with eligibility, availability, and non-guarantee language. Show terms per opportunity. |
| Anonymization makes opportunities too vague. | Workers cannot make informed choices. | Reveal scope, deliverable, requirements, effort, work mode, and payment conditions while withholding client identity. |
| Eight broad disciplines create ambiguous or unsafe work. | Poor quality, policy violations, or worker harm. | Require bounded offer templates, prohibited-use review, and a named category owner. |
| Payment language overpromises. | Legal, financial, and trust exposure. | Use status and conditions; publish timing only when the platform can operate it consistently. |
| Empty inventory makes the platform feel broken. | Drop-off and pressure to fabricate activity. | Provide “no suitable opportunities yet,” notify-me states, example cards clearly labeled as examples, and truthful refresh dates. |
| Dense card grids overwhelm mobile users. | Missed requirements or accidental commitment. | Prioritize one card per viewport, stack metadata, preserve the primary action, and test real devices. |
| Motion implies live demand or urgency. | Deception, distraction, and accessibility failures. | Remove fabricated feeds and counters; use one-time, reduced-motion-safe transitions only. |
| Supervisor routing is not understood. | Users expect client choice or marketplace negotiation. | State “supervisor-routed and anonymized” near the hero, cards, and workflow. |
| Trust modules become unsupported marketing. | Reputational and compliance risk. | Use operational evidence only; assign owners, definitions, timestamps, and review gates to claims. |

## Unresolved choices requiring product decisions

1. **Meaning of “anyone can join.”** Does this mean no invitation is required, or are there legal, geographic, age, device, identity, or skill prerequisites? The public statement must be qualified accurately.
2. **Opportunity visibility.** Will unauthenticated visitors see full anonymized briefs, partial previews, or only category examples? The recommendation is to show enough detail for informed interest before signup.
3. **Acceptance mechanism.** Does a worker apply once, accept a routed task, or express interest for supervisor review? The public site should use the final operational term and avoid “proposal.”
4. **Payment model.** Is payment fixed per task, hourly, milestone-based, rate-based, or conditional on review? The card schema and hero copy depend on this choice.
5. **Review model.** Who reviews work, what are the states, and what is the change-request/dispute path? This must be defined before “submit,” “approved,” or “paid” appears in public copy.
6. **Availability model.** Can the platform display live availability, or should all public cards be representative formats with private routing after signup? The latter is safer until freshness is guaranteed.
7. **Geographic and work-mode scope.** Which categories are remote, field, or hybrid? Are location and language required for eligibility? Avoid generic “work anywhere” language.
8. **Category governance.** Which of the eight canonical categories are launch-ready, and who approves new offer templates and prohibited-use exceptions?
9. **Trust claims.** Which safeguards are live today: identity verification, moderation, training, payout ledger, escalation, or privacy controls? Only live safeguards belong in launch copy.
10. **Visual brand tokens.** What exact white, dark navy, and blue values meet contrast and brand requirements? This should be resolved in the Phase 2 design-token review.

## References

[1]: https://dolancers.com/ "Dolancers public homepage, worker workflow, opportunity listings, and detail pages"

[2]: https://apna.co/ "Apna public homepage, jobs listings, filters, and worker opportunity language"

[3]: https://www.awign.com/ "Awign public homepage, worker gig flow, job categories, and opportunity details"

[4]: https://taskmo.com/job-search-app "Taskmo worker-facing gig discovery page and role-card patterns"

[5]: https://www.pickmywork.com/part-time-work-app/ "PickMyWork worker-facing app page, opportunity cards, workflow, and earning caveats"

[6]: https://squadstack.ai/ "SquadStack public homepage and workforce-operations patterns"
