# Spec Update Command

Update an existing specification with fresh codebase analysis while preserving valuable accurate content.

## Usage
```
/spec-update <feature-name>
```

<role>
You are updating an existing specification through comprehensive codebase analysis. Intelligently merge findings with existing spec documents to preserve valuable accurate content while updating outdated information and adding new insights.
</role>

<critical_rules>
CRITICAL: These rules must be followed without exception:

1. **NEVER modify documents without explicit user approval** - Always present comparison first
2. **NEVER lose accurate existing content** - Preservation is the top priority
3. **ALWAYS archive before changes** - Create `.claude/specs/<feature-name>/.archive/YYMMDD/` with DEPRECATED markers
4. **NEVER skip comprehensive analysis** - Full codebase review required (same depth as spec-create)
5. **NEVER include sensitive data** - No passwords, API keys, credentials, or PHI
6. **NEVER change completed task status** - Preserve [x] checkboxes for implemented tasks

IMPORTANT: These significantly impact quality:

1. **Present clear comparisons** - Show ✅ ACCURATE, 🔄 OUTDATED, ➕ NEW, 📝 ENHANCED for each document
2. **Update confidently** - Replace outdated info with current codebase state
3. **Preserve valuable context** - Keep user stories, design decisions, completed tasks
4. **Validate before presenting** - Run validation agents, improve until quality passes
5. **Add approval marker to tasks.md** - Include "✅ APPROVED" after version when user approves
</critical_rules>

## Key Difference from spec-create
- **spec-create**: Creates complete new spec from scratch
- **spec-update**: Performs full codebase analysis BUT preserves accurate existing content while updating/adding new findings

## When to Use This Command
- **Major codebase changes**: Significant updates since spec was created
- **Updated steering documents**: Need spec aligned with new project standards
- **Partial accuracy**: Spec has valuable content but needs updates
- **Fresh perspective needed**: Want thorough analysis while preserving good existing work

<process>
## Step-by-Step Workflow

### Step 1: Validate Specification Exists
**Decision Point:**
```
IF `.claude/specs/<feature-name>/` directory does NOT exist:
  → Display error:
    "Error: Specification '<feature-name>' does not exist.
     Please run `/spec-create <feature-name>` to create a new specification first."
  → STOP execution

IF at least requirements.md does NOT exist:
  → Display error:
    "Error: Specification '<feature-name>' is incomplete (missing requirements.md).
     Please run `/spec-create <feature-name>` to create a complete specification."
  → STOP execution

ELSE:
  → Note which documents exist: requirements.md, design.md, tasks.md
  → Proceed to Step 2
```

### Step 2: Load Existing Spec Documents
**Command:**
```bash
claude-code-spec-workflow get-spec-context <feature-name>
```

**Parse and store:**
```
Load and store existing content from:
- requirements.md (always exists per Step 1)
- design.md (if exists)
- tasks.md (if exists)
```

**Display format:**
```
Loaded existing specification:
✅ requirements.md - [Brief summary: X user stories, Y features]
✅ design.md - [Brief summary: Architecture pattern, X components]
✅ tasks.md - [Brief summary: X tasks (Y completed, Z pending)]
```

### Step 3: Load Steering Documents
**Command:**
```bash
claude-code-spec-workflow get-steering-context
```

**Parse for alignment:**
- Load product.md, tech.md, structure.md, standards.md
- Store for comparing spec alignment with current standards

### Step 4: Thorough Codebase Analysis
**CRITICAL: Comprehensive analysis required (same depth as spec-create)**

**Search for:**
```
Package managers: package.json, requirements.txt, go.mod, Cargo.toml, composer.json
Documentation: README.md, README.txt, docs/**/*
Config files: .config/*, *.config.js, .env.example
Source structure: src/, app/, lib/, packages/
Feature-specific: Existing implementations related to <feature-name>
Recent changes: git log for recent modifications
```

**Identify:**
- Existing features related to this specification
- Similar patterns and reusable components
- Recent changes relevant to the feature
- Integration points and dependencies
- Component implementations
- API endpoints or interfaces
- Database schemas or models

### Step 5: Compare Findings Against Existing Spec
**CRITICAL STEP: Categorize all findings**

**For each document, classify content:**

**✅ ACCURATE** - Existing content matches codebase and analysis
```
Example: User story AC says "REST API" AND codebase shows REST endpoints
Action: Preserve unchanged
```

**🔄 OUTDATED** - Existing content contradicts codebase findings
```
Example: Design says "REST API" BUT codebase shows GraphQL implementation
Action: Update with current information (show old → new)
```

**➕ NEW** - Found in codebase but not documented in spec
```
Example: WebSocket feature implemented but missing from requirements
Action: Add new sections/items
```

**📝 ENHANCED** - Existing content accurate but can expand with context
```
Example: Design mentions component but can add Mermaid diagram
Action: Expand with additional details from analysis
```

**❌ OBSOLETE** - (tasks.md only) Tasks no longer needed
```
Example: Task for feature that was removed from requirements
Action: Remove from task list
```

**Categorization by Document:**

**For requirements.md:**
- ✅ ACCURATE: User stories still valid and current
- 🔄 OUTDATED: Acceptance criteria changed or no longer applicable
- ➕ NEW: Additional requirements discovered from codebase
- 📝 ENHANCED: Stories accurate but can add clarifying context

**For design.md:**
- ✅ ACCURATE: Architecture patterns still sound
- 🔄 OUTDATED: Components need updating to match current codebase
- ➕ NEW: New integration points or components found
- 📝 ENHANCED: Design correct but can add diagrams or details

**For tasks.md:**
- ✅ COMPLETED: Tasks already implemented (preserve [x] status)
- ✅ ACCURATE: Uncompleted tasks still relevant
- 🔄 OUTDATED: Tasks don't match updated requirements/design
- ➕ NEW: Additional tasks needed for new requirements
- ❌ OBSOLETE: Tasks no longer needed

### Step 6: Present Comparison and Findings
**Format:**
```
Based on thorough codebase analysis:

## COMPARISON WITH EXISTING SPEC

### requirements.md
✅ ACCURATE (preserving):
- User Story 1.1: [description]
- User Story 2.1: [description]

🔄 NEEDS UPDATE:
- User Story 1.2: Acceptance criteria changed
  OLD: [old criteria]
  NEW: [new criteria based on codebase]

➕ NEW CONTENT:
- User Story 3.1: [new requirement found in codebase]
  Evidence: [file path or feature implementation]

### design.md
✅ ACCURATE (preserving):
- Core architecture section
- Component structure

🔄 NEEDS UPDATE:
- API endpoints: Changed from REST to GraphQL
  Evidence: [file paths showing GraphQL implementation]

➕ NEW CONTENT:
- WebSocket integration for real-time features
  Evidence: [file paths]

### tasks.md
✅ COMPLETED (preserving):
- Task 1: [description] (already implemented)
- Task 2: [description] (already implemented)

✅ ACCURATE PENDING (preserving):
- Task 6: [description] (still relevant)

🔄 NEEDS UPDATE:
- Task 4-5: Don't match updated design.md
  OLD: REST endpoint tasks
  NEW: GraphQL resolver tasks

➕ NEW CONTENT:
- Tasks for WebSocket integration
- Tasks for new requirements

❌ OBSOLETE (removing):
- Task 8: [description] (feature removed)

## FRESH ANALYSIS DETAILS

**Codebase Findings:**
- [Finding 1 with file paths]
- [Finding 2 with file paths]

**Integration Points:**
- [Integration 1]
- [Integration 2]

**Reusable Components:**
- [Component 1]
- [Component 2]
```

**Then ask:**
1. "Do these findings look correct?"
2. "Should I preserve ACCURATE sections and update OUTDATED ones?"
3. "Are there any other requirements, design decisions, or constraints I should know about?"

**CRITICAL: Wait for user response before proceeding**

### Step 7: Archive Existing Spec Documents
**CRITICAL: Archive BEFORE making any changes**

**Create archive structure:**
```bash
# Use current date in YYMMDD format (e.g., 251006 for Oct 6, 2025)
.claude/specs/<feature-name>/.archive/251006/
```

**Copy all documents:**
```bash
.claude/specs/<feature-name>/requirements.md → .archive/251006/requirements.md
.claude/specs/<feature-name>/design.md → .archive/251006/design.md (if exists)
.claude/specs/<feature-name>/tasks.md → .archive/251006/tasks.md (if exists)
```

**Mark as deprecated:**
Add `(DEPRECATED)` as first line of each archived document:
```markdown
(DEPRECATED)
# Requirements

[Old content...]
```

**Confirm to user:**
```
✅ Existing documents archived to `.claude/specs/<feature-name>/.archive/251006/`
✅ All archived documents marked as DEPRECATED
```

**Note:** If user specifies version (e.g., "v2.1"), use: `.archive/v2.1/`

### Step 8: Determine Task Execution Mode (if updating tasks.md)
**Decision Point:**
```
IF tasks.md needs updating OR creating:
  → Ask: "Will you execute tasks sequentially (one at a time) or in parallel (multiple agents simultaneously)?"
  → Explain impact:
    - Sequential Mode: Larger task scope (60-90 minutes per task)
    - Parallel Mode: Smaller task scope (30-60 minutes per task)
  → WAIT for user decision - this affects task granularity

ELSE:
  → Skip to Step 9
```

### Step 9: Generate Merged Spec Documents
**Add version header to each updated document:**
```markdown
# Requirements
*Version: 1.2510.1.0*

[Document content...]
```

**Version format:** `MAJOR.YYMM.BUILD.PATCH`
- Ask user for version or use default: `1.YYMM.1.0` (e.g., `1.2510.1.0` for October 2025)

**For requirements.md:**

**a. Preserve Accurate Sections**
```
Keep sections marked ✅ ACCURATE unchanged
→ Maintain original wording
→ Preserve context and rationale
→ Keep structure intact
```

**b. Update Outdated Sections**
```
Replace sections marked 🔄 OUTDATED with current information
→ Show what changed in version history if valuable
→ Maintain section structure where possible
→ Update confidently based on codebase evidence
```

**c. Add New Sections**
```
Insert requirements marked ➕ NEW in appropriate locations
→ Follow existing document structure
→ Integrate smoothly with preserved content
→ Maintain consistent formatting
```

**d. Enhance Accurate Sections** (when beneficial)
```
Expand sections marked 📝 ENHANCED with insights
→ Add clarifying details from analysis
→ Keep enhancements relevant and concise
→ Don't over-explain
```

**For design.md:**

**a. Preserve Accurate Architecture**
```
Keep sections marked ✅ ACCURATE unchanged
→ Maintain diagrams and patterns
→ Preserve design decisions
→ Keep rationale intact
```

**b. Update Outdated Components**
```
Replace sections marked 🔄 OUTDATED
→ Update component diagrams
→ Maintain overall structure
→ Show evidence for changes
```

**c. Add New Integration Points**
```
Insert components marked ➕ NEW
→ Add Mermaid diagrams
→ Follow tech.md/structure.md conventions
→ Integrate with existing design
```

**d. Enhance Existing Design**
```
Expand sections marked 📝 ENHANCED
→ Add missing diagrams
→ Clarify with codebase examples
→ Keep additions concise
```

**For tasks.md:**

**a. Preserve Completed Tasks**
```
CRITICAL: Keep tasks marked ✅ COMPLETED with [x] checkbox
→ Do NOT change completion status
→ Preserve descriptions and metadata
→ Maintain task IDs if possible
```

**b. Preserve Accurate Pending Tasks**
```
Keep tasks marked ✅ ACCURATE unchanged
→ Maintain [ ] checkbox status
→ Keep original metadata
→ Preserve task structure
```

**c. Update Outdated Tasks**
```
Replace tasks marked 🔄 OUTDATED
→ Align with current requirements/design
→ Update metadata (_Requirements:_, _Depends:_, _Parallel:_, _Leverage:_)
→ Maintain logical task flow
```

**d. Add New Tasks**
```
Insert tasks marked ➕ NEW
→ Follow execution mode (sequential/parallel)
→ Include all required metadata
→ Renumber to maintain flow
```

**e. Remove Obsolete Tasks**
```
Remove tasks marked ❌ OBSOLETE
→ Only if truly no longer needed
→ Preserve dependencies by updating other tasks
```

### Step 10: Validate and Approve
**CRITICAL: Automatic validation before presenting to user**

**requirements.md validation:**
```
Use the spec-requirements-validator agent to validate the updated requirements document for the <feature-name> specification.

The agent should:
1. Read the updated requirements document (in memory, not yet saved)
2. Validate against all quality criteria (structure, user stories, acceptance criteria)
3. Check alignment with steering documents (product.md, tech.md, structure.md, standards.md)
4. Verify preserved content remains accurate
5. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

If validation fails, use the feedback to improve before presenting to the user.
```

**design.md validation:**
```
Use the spec-design-validator agent to validate the updated design document for the <feature-name> specification.

The agent should:
1. Read the updated design document (in memory, not yet saved)
2. Read the updated requirements document for context
3. Validate technical soundness, architecture quality, and completeness
4. Check alignment with tech.md, structure.md, and standards.md
5. Verify preserved content remains accurate
6. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

If validation fails, use the feedback to improve before presenting to the user.
```

**tasks.md validation:**
```
Use the spec-task-validator agent to validate the updated task breakdown for the <feature-name> specification.

The agent should:
1. Read the updated tasks document (in memory, not yet saved)
2. Read updated requirements.md and design.md for context
3. Validate each task against atomicity criteria
4. Check for agent-friendly formatting and clear specifications
5. Verify requirement references and leverage information are accurate
6. CRITICAL: Verify completed tasks were preserved correctly with [x] status
7. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

If validation fails, use the feedback to improve before presenting to the user.
```

**Present merged documents:**
```
Generated merged documents:

## requirements.md Changes
✅ Preserved: [sections kept unchanged]
🔄 Updated: [what changed]
➕ Added: [new sections]

## design.md Changes
✅ Preserved: [sections kept unchanged]
🔄 Updated: [what changed]
➕ Added: [new sections]

## tasks.md Changes
✅ Preserved: [completed and accurate tasks]
🔄 Updated: [outdated tasks replaced]
➕ Added: [new tasks]
❌ Removed: [obsolete tasks]

Review merged documents. Do the updated documents look good?
```

**CRITICAL: Do NOT save until user explicitly approves**

**When approved:**
1. Add "✅ APPROVED" marker to tasks.md after version:
```markdown
# Implementation Plan
*Version: 1.2510.1.0*

✅ APPROVED

[Task content...]
```

2. Save all documents to `.claude/specs/<feature-name>/`

3. Confirm to user:
```
Spec updated successfully! Completed tasks preserved.
Execute pending tasks with `/spec-execute {task-id}` or `/spec-execute-parallel {task-ids}`.
```

</process>

<examples>
### Example 1: Standard Update Flow

**Scenario:** User authentication spec needs update after migrating from REST to GraphQL

**User:** `/spec-update user-authentication`

**Correct Response:**
```
Validating specification exists...
✅ Specification found

Loading existing specification:
✅ requirements.md - 8 user stories, authentication features
✅ design.md - REST API architecture, 5 endpoints
✅ tasks.md - 12 tasks (3 completed, 9 pending)

Loading steering context...
✅ Loaded product.md, tech.md, structure.md, standards.md

Analyzing codebase thoroughly...
[Reads package.json, src/auth/, API implementations, git log]

Based on thorough codebase analysis:

## COMPARISON WITH EXISTING SPEC

### requirements.md
✅ ACCURATE (preserving):
- User Story 1.1: User login with email/password
- User Story 1.2: User registration
- User Story 2.1: Password reset flow
- User Story 2.2: Email verification
- User Story 3.1: JWT token management

🔄 NEEDS UPDATE:
- User Story 1.3: API authentication
  OLD: "Accept credentials via REST endpoint"
  NEW: "Accept credentials via GraphQL mutation"
  Evidence: src/graphql/mutations/auth.ts

➕ NEW CONTENT:
- User Story 4.1: Social authentication (Google, GitHub)
  Evidence: src/auth/providers/ (OAuth implementations found)

### design.md
✅ ACCURATE (preserving):
- Authentication flow diagram
- JWT token structure
- Database schema for users table

🔄 NEEDS UPDATE:
- API Layer: Changed from REST to GraphQL
  OLD: 5 REST endpoints (/login, /register, etc.)
  NEW: 3 GraphQL mutations, 2 queries
  Evidence: src/graphql/schema.graphql

➕ NEW CONTENT:
- OAuth integration architecture
- Social provider configuration
  Evidence: src/auth/providers/, config/oauth.ts

### tasks.md
✅ COMPLETED (preserving):
- Task 1: Set up user database schema [x]
- Task 2: Implement password hashing [x]
- Task 3: Create JWT service [x]

✅ ACCURATE PENDING (preserving):
- Task 10: Add rate limiting to auth endpoints
- Task 11: Implement refresh token rotation
- Task 12: Add security headers

🔄 NEEDS UPDATE:
- Task 4-6: REST endpoint tasks no longer match
  OLD: "Implement REST endpoint /api/auth/login"
  NEW: "Implement GraphQL mutation: login"

➕ NEW CONTENT:
- Tasks for OAuth integration
- Tasks for social provider setup

Do these findings look correct?
Should I preserve ACCURATE sections and update OUTDATED ones?
Are there any other requirements, design decisions, or constraints I should know about?
```

**Reasoning:**
- Clear categorization (✅ 🔄 ➕)
- Shows evidence from codebase
- Preserves valuable existing content (5 accurate user stories, 3 completed tasks)
- Asks for confirmation before proceeding

---

**Incorrect Response:**
```
I'll update your spec.

[Analyzes codebase]
[Regenerates all documents from scratch]
[Loses existing user stories and completed task history]

Updated spec documents saved!
```

**Why Wrong:**
- No comparison presented
- Doesn't preserve existing content
- No user approval
- Lost completed task history
- No archiving

### Example 2: Preserving Completed Tasks

**Scenario:** User confirms updates, need to generate merged tasks.md

**User:** "Yes, those updates look correct. Use sequential execution mode."

**Correct Approach:**
```
Great! Archiving existing documents...
✅ Archived to .claude/specs/user-authentication/.archive/251006/
✅ All archived documents marked as DEPRECATED

Generating merged documents...
[Validates with agents]

Generated merged documents:

## tasks.md Changes
✅ Preserved (3 completed tasks):
- [x] Task 1: Set up user database schema
- [x] Task 2: Implement password hashing
- [x] Task 3: Create JWT service

✅ Preserved (3 accurate pending tasks):
- [ ] Task 10: Add rate limiting to auth endpoints
- [ ] Task 11: Implement refresh token rotation
- [ ] Task 12: Add security headers

🔄 Updated (tasks 4-6 rewritten for GraphQL):
- [ ] Task 4: Implement GraphQL mutation: login
- [ ] Task 5: Implement GraphQL mutation: register
- [ ] Task 6: Implement GraphQL query: getCurrentUser

➕ Added (4 new tasks for OAuth):
- [ ] Task 13: Configure OAuth providers (Google, GitHub)
- [ ] Task 14: Implement OAuth callback handler
- [ ] Task 15: Add social login UI components
- [ ] Task 16: Test OAuth flow end-to-end

Review merged documents. Do the updated documents look good?
```

**Reasoning:**
- Archived before making changes
- Preserved completed tasks with [x] status
- Preserved accurate pending tasks
- Updated outdated tasks
- Added new tasks
- Shows what changed clearly

---

**Incorrect Approach:**
```
Generated merged documents:

## tasks.md
All tasks regenerated for GraphQL implementation:
- [ ] Task 1: Set up database schema
- [ ] Task 2: Implement password hashing
- [ ] Task 3: Create JWT service
[All tasks marked as pending]
```

**Why Wrong:**
- Lost completed task status
- Regenerated completed tasks as pending
- User loses track of what's actually done
- No preservation of accurate content

### Example 3: Shallow vs. Thorough Analysis

**Scenario:** User runs update command

**User:** `/spec-update payment-processing`

**Correct Approach:**
```
[Performs thorough analysis:]
- Reads package.json, payment libs (Stripe SDK 12.0)
- Searches src/payment/ directory
- Checks config/stripe.ts
- Reviews git log for payment changes
- Finds webhook handlers in src/webhooks/
- Discovers refund flow in src/payment/refunds.ts

Based on thorough codebase analysis:

### design.md
🔄 NEEDS UPDATE:
- Stripe SDK: 10.0 → 12.0 (package.json)
- Evidence: "stripe": "^12.0.0"

➕ NEW CONTENT:
- Webhook handling architecture
  Evidence: src/webhooks/stripe.ts, webhook signature verification
- Refund processing flow
  Evidence: src/payment/refunds.ts, 3-step refund state machine
```

**Reasoning:**
- Comprehensive codebase search
- Discovered new features (webhooks, refunds)
- Found version updates
- Provides file path evidence

---

**Incorrect Approach:**
```
What's changed since the last update?
Which features have you added?
Has the Stripe integration changed?
```

**Why Wrong:**
- Asks user instead of analyzing
- Lazy approach
- Should discover changes through codebase analysis
- Wasted user time

</examples>

<what_not_to_do>
## Critical Mistakes to Avoid

❌ **NEVER skip archiving**
```
Wrong: [Updates files directly without archiving]
Right: Archive → Mark DEPRECATED → Generate merged → Present → Approve → Save
```

❌ **NEVER regenerate accurate content**
```
Wrong: requirements.md has 5 valid user stories → Regenerates all 8 stories from scratch
Right: requirements.md has 5 valid user stories → Preserve those 5, update 2, add 1 new
```

❌ **NEVER change completed task status**
```
Wrong: Task 1 shows [x] → Changes to [ ] because "regenerating tasks"
Right: Task 1 shows [x] → PRESERVE [x] status, keep task description
Rationale: Completed tasks represent actual work done, must never be reset
```

❌ **NEVER skip comprehensive analysis**
```
Wrong: "What's changed since last update?" [Asks user instead of analyzing]
Right: [Full codebase analysis] "Here's what I found changed..."
```

❌ **NEVER save without approval**
```
Wrong: [Presents comparison] [Immediately saves merged documents]
Right: [Presents comparison] "Review merged documents. Do the updated documents look good?"
```

❌ **NEVER skip validation**
```
Wrong: [Generates merged docs] [Presents to user immediately]
Right: [Generates merged docs] [Validates with agents] [Improves if needed] [Then presents]
```

❌ **NEVER lose valuable context**
```
Wrong: Removes detailed acceptance criteria from preserved user stories
Right: Preserves all acceptance criteria, rationale, and context unchanged
```

</what_not_to_do>

<error_prevention>
## Common Failures and Solutions

### Failure 1: Losing Completed Task History
**Problem:** Regenerating tasks.md and marking completed tasks as pending
**Why It Fails:** User loses track of actual progress, breaks trust
**Solution:**
- Compare FIRST: Identify ✅ COMPLETED tasks
- Preserve those tasks with [x] status
- NEVER change their completion status
- Update ONLY ❌ OUTDATED pending tasks

### Failure 2: No Archive Before Changes
**Problem:** Modifying spec files without backup
**Why It Fails:** Can't rollback, lost history, risky
**Solution:**
- ALWAYS archive first (`.archive/YYMMDD/`)
- Mark archived files as DEPRECATED
- Confirm archive completed
- THEN generate merged documents

### Failure 3: Incomplete Comparison
**Problem:** Not categorizing findings (✅ 🔄 ➕ 📝 ❌)
**Why It Fails:** User can't understand what's preserved vs changed
**Solution:**
- For EACH document (requirements, design, tasks)
- Categorize EVERY section
- Show clear comparison with evidence
- Get user confirmation

### Failure 4: Shallow Analysis
**Problem:** Quick scan instead of comprehensive codebase review
**Why It Fails:** Misses important changes, incomplete updates
**Solution:**
- Same depth as spec-create command
- Check package files, configs, source code
- Review recent git history
- Search for feature-specific implementations
- Find integration points

### Failure 5: Skipping Validation
**Problem:** Presenting documents without running validation agents
**Why It Fails:** Poor quality documents, missing critical issues
**Solution:**
- Run validation agents BEFORE presenting
- Improve based on feedback
- Only present after PASS or improvements made
- Don't waste user time with invalid documents

</error_prevention>

<meta_instructions>
## About This Command

**Priority Resolution:**
When instructions seem to conflict:
1. CRITICAL rules always win (never lose content, always archive, get approval, preserve [x] tasks)
2. Preservation beats regeneration (keep accurate content)
3. Validation before presentation (run agents first)
4. Process steps override general guidance
5. Examples demonstrate exact desired behavior

**Categorization Rules:**
- ✅ ACCURATE: Content matches codebase → Preserve unchanged
- 🔄 OUTDATED: Content contradicts codebase → Update with current
- ➕ NEW: Found in codebase but missing → Add
- 📝 ENHANCED: Accurate but can add context → Expand selectively
- ❌ OBSOLETE: (tasks.md only) No longer needed → Remove

**Preservation Rules:**
- Completed tasks: ALWAYS preserve [x] status
- Accurate user stories: Preserve exact wording
- Sound architecture: Keep design decisions
- Valuable context: Maintain rationale

**Completion Criteria:**
Command is complete when:
1. Spec exists validation passed
2. Comparison presented and approved
3. Existing documents archived with DEPRECATED markers
4. Validation agents run and documents improved
5. Merged documents approved by user
6. "✅ APPROVED" added to tasks.md
7. All files saved to `.claude/specs/<feature-name>/`
8. User informed of successful update
</meta_instructions>

## Archive Structure After Update

```
.claude/specs/<feature-name>/
├── .archive/
│   ├── 251002/
│   │   ├── requirements.md    (DEPRECATED)
│   │   ├── design.md          (DEPRECATED)
│   │   └── tasks.md           (DEPRECATED)
│   └── 251006/
│       ├── requirements.md    (DEPRECATED)
│       ├── design.md          (DEPRECATED)
│       └── tasks.md           (DEPRECATED)
├── requirements.md            *Version: 1.2510.2.0*
├── design.md                  *Version: 1.2510.2.0*
└── tasks.md                   *Version: 1.2510.2.0* ✅ APPROVED
```

## Next Steps
After spec is updated, you can:
- Execute pending tasks: `/spec-execute {task-id}` (sequential mode)
- Execute pending tasks: `/spec-execute-parallel {task-ids}` (parallel mode)
- Check progress: `/spec-status <feature-name>`
- List all specs: `/spec-list`

## Related Commands
- `/spec-create` - Create complete new specification from scratch
- `/spec-tasks-rebuild` - Rebuild only tasks.md (complete regeneration)
- `/spec-steering-update` - Update steering documents with codebase changes
- `/spec-execute` - Execute individual tasks sequentially
- `/spec-execute-parallel` - Execute multiple tasks in parallel
