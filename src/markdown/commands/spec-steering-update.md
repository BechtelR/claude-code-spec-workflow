# Spec Steering Update Command

Update steering documents with fresh codebase analysis while preserving accurate content.

## Usage
```
/spec-steering-update
```

<role>
You are updating project steering documents through comprehensive codebase analysis. Intelligently merge findings with existing documents to preserve valuable accurate content while updating outdated information and adding new insights.
</role>

<critical_rules>
CRITICAL: These rules must be followed without exception:

1. **NEVER modify documents without explicit user approval** - Always present comparison first
2. **NEVER lose accurate existing content** - Preservation is the top priority
3. **ALWAYS archive before changes** - Create `.archive/YYMMDD/` with DEPRECATED markers
4. **NEVER skip comprehensive analysis** - Full codebase review required (same depth as setup)
5. **NEVER include sensitive data** - No passwords, API keys, credentials, or PHI

IMPORTANT: These significantly impact quality:

1. **Present clear comparisons** - Show ✅ ACCURATE, 🔄 OUTDATED, ➕ NEW, 📝 ENHANCED
2. **Update confidently** - Replace outdated info with current codebase state
3. **Preserve valuable context** - Keep decisions, rationale, historical information
4. **Keep standards.md concise** - Essential rules only, zero redundancy
</critical_rules>

## Key Difference from Setup
- **Setup**: Creates steering documents from scratch
- **Update**: Performs full codebase analysis BUT preserves accurate existing content while updating/adding new findings

<process>
## Step-by-Step Workflow

### Step 1: Load Existing Steering Documents
**Command:**
```bash
claude-code-spec-workflow get-steering-context
```

**Validate and parse:**
```
IF any steering documents missing:
  → Note which documents need creation (product.md, tech.md, structure.md, standards.md)
  → Mark for creation in Step 6
ELSE:
  → Parse all 4 documents completely
  → Store existing content in memory
  → Display summary of current state
```

**Display format:**
```
Loaded existing steering documents:
✅ product.md - [Brief summary of content]
✅ tech.md - [Brief summary of content]
✅ structure.md - [Brief summary of content]
✅ standards.md - [Brief summary of content]
```

### Step 2: Search Project Standards Documents
**CRITICAL: Identical to setup - comprehensive search required**

**Search these locations:**
1. Root directory files:
   - `CONTRIBUTING.md`, `CONTRIBUTING.txt`
   - `STANDARDS.md`, `CODING_STANDARDS.md`, `CODE_STANDARDS.md`
   - `CONVENTIONS.md`, `CODING_CONVENTIONS.md`
   - `STYLE_GUIDE.md`, `STYLE.md`
   - `DEVELOPMENT.md`, `DEV_GUIDE.md`

2. Configuration files:
   - `.editorconfig`, `.prettierrc*`, `.eslintrc*`

3. Documentation directories:
   - Files in `docs/` or `documentation/` containing: "standard", "convention", "rule", "guideline"

**Extract elements:**
- Coding style (naming, formatting, structure)
- UX preferences (patterns, components, accessibility)
- Architecture (patterns to follow, anti-patterns to avoid)
- Testing (requirements, coverage, frameworks)
- Code review (approval process, quality gates)

### Step 3: Analyze Codebase Thoroughly
**CRITICAL: Comprehensive analysis required (same depth as setup)**

**Search for:**
```
Package managers: package.json, requirements.txt, go.mod, Cargo.toml, composer.json
Documentation: README.md, README.txt, docs/**/*
Config files: .config/*, *.config.js, .env.example
Source structure: src/, app/, lib/, packages/
Recent changes: git log, recent commits
```

**Identify:**
- Project type and purpose
- Technology stack (frameworks, libraries, versions)
- Directory patterns and organization
- Coding conventions
- Existing features and capabilities
- Recent additions or changes since last update

### Step 4: Compare Findings Against Existing Documents
**CRITICAL STEP: Categorize all findings**

**For each document, classify content:**

**✅ ACCURATE** - Existing content matches codebase
```
Example: tech.md says "PostgreSQL database" AND codebase uses PostgreSQL
Action: Preserve unchanged
```

**🔄 OUTDATED** - Existing content contradicts codebase
```
Example: tech.md says "React 17" BUT package.json shows React 18
Action: Update with current information (show old → new)
```

**➕ NEW** - Found in codebase but not documented
```
Example: TypeScript added to project but missing from tech.md
Action: Add new sections/items
```

**📝 ENHANCED** - Existing content accurate but can expand
```
Example: "React: UI framework" → "React 18: UI framework with concurrent features"
Action: Expand with additional context from analysis
```

### Step 5: Present Comparison and Findings
**Format:**
```
Based on thorough codebase analysis:

## COMPARISON WITH EXISTING DOCS

### product.md
✅ ACCURATE (preserving):
- Purpose: [existing purpose statement]
- Key features: [list of accurate features]

🔄 NEEDS UPDATE:
- Features section missing 2 new capabilities
  OLD: [old feature list]
  NEW: [add: Dashboard feature, Tunnel feature]

➕ NEW CONTENT:
- Success metrics not documented
  Evidence: Found analytics in src/analytics/

### tech.md
✅ ACCURATE (preserving):
- Node.js runtime
- PostgreSQL database

🔄 NEEDS UPDATE:
- React: 17 → 18 (package.json)
- Missing TypeScript (now in use)

➕ NEW CONTENT:
- WebSocket integration (found in src/websocket/)
- Redis caching (found in package.json, src/cache/)

### structure.md
✅ ACCURATE (preserving):
- Feature-based architecture
- Component patterns

🔄 NEEDS UPDATE:
- Directory structure expanded with new /tunnel directory

➕ NEW CONTENT:
- Testing conventions (found in *.test.ts files)

### standards.md
✅ ACCURATE (preserving):
- Code review: 2 approvals required
- Test coverage: 80% minimum

➕ NEW CONTENT:
- TypeScript strict mode requirement (found in tsconfig.json)
- No `any` types (found in .eslintrc.json)
```

**Then ask:**
1. "Do these findings look correct?"
2. "Should I preserve ACCURATE sections and update OUTDATED ones?"
3. "Are there coding rules, standards, or conventions I missed?"

**CRITICAL: Wait for user response before proceeding**

### Step 6: Archive Existing Documents
**CRITICAL: Archive BEFORE making any changes**

**Create archive structure:**
```bash
# Use current date in YYMMDD format (e.g., 251006 for Oct 6, 2025)
.claude/steering/.archive/251006/
```

**Copy all documents:**
```bash
.claude/steering/product.md → .archive/251006/product.md
.claude/steering/tech.md → .archive/251006/tech.md
.claude/steering/structure.md → .archive/251006/structure.md
.claude/steering/standards.md → .archive/251006/standards.md
```

**Mark as deprecated:**
Add `(DEPRECATED)` as first line of each archived document:
```markdown
(DEPRECATED)
# Product Context

[Old content...]
```

**Confirm to user:**
```
✅ Existing documents archived to `.claude/steering/.archive/251006/`
✅ All archived documents marked as DEPRECATED
```

**Note:** If user specifies version (e.g., "v2.1"), use: `.archive/v2.1/`

### Step 7: Generate Merged Documents
**Add version header to each updated document:**
```markdown
# Product Context
*Version: 1.2510.1.0*

[Document content...]
```

**Version format:** `MAJOR.YYMM.BUILD.PATCH`
- Ask user for version or use default: `1.YYMM.1.0`

**For each document (product.md, tech.md, structure.md, standards.md):**

**a. Preserve Accurate Sections**
```
Keep sections marked ✅ ACCURATE unchanged
→ Maintain original wording
→ Preserve context and decisions
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
Insert sections marked ➕ NEW in appropriate locations
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

**Quality validation:**
```
standards.md specific:
[ ] ONLY essential engineering rules
[ ] ZERO tech stack details (belongs in tech.md)
[ ] ZERO structure details (belongs in structure.md)
[ ] Concise and actionable

All documents:
[ ] No sensitive data
[ ] Version headers added
[ ] Clear structure
[ ] Aligned with codebase
```

### Step 8: Review and Confirm
**Present merged documents:**
```
Generated merged documents:

## product.md Changes
✅ Preserved: [sections kept unchanged]
🔄 Updated: [what changed]
➕ Added: [new sections]

## tech.md Changes
✅ Preserved: [sections kept unchanged]
🔄 Updated: [what changed]
➕ Added: [new sections]

## structure.md Changes
✅ Preserved: [sections kept unchanged]
🔄 Updated: [what changed]
➕ Added: [new sections]

## standards.md Changes
✅ Preserved: [sections kept unchanged]
➕ Added: [new sections]

Review merged documents. Approve to save or request changes.
```

**CRITICAL: Do NOT save until user explicitly approves**

**When approved:**
- Save all documents to `.claude/steering/`
- Confirm: "Steering documents updated successfully!"

</process>

<examples>
### Example 1: Standard Update Flow

**Scenario:** Project added TypeScript, updated React, added WebSocket feature

**User:** `/spec-steering-update`

**Correct Response:**
```
Loading existing steering documents...
✅ product.md - Task management platform
✅ tech.md - React stack documented
✅ structure.md - Feature-based architecture
✅ standards.md - Code quality rules

Searching for project standards...
Found: CONTRIBUTING.md, tsconfig.json, .eslintrc.json

Analyzing codebase thoroughly...
[Reads package.json, src structure, git log]

Based on thorough codebase analysis:

## COMPARISON WITH EXISTING DOCS

### product.md
✅ ACCURATE (preserving):
- Purpose: Task management for teams
- Core features: Auth, CRUD, collaboration

➕ NEW CONTENT:
- Real-time updates feature (found in src/websocket/)
- Evidence: WebSocket server, real-time components

### tech.md
✅ ACCURATE (preserving):
- Next.js 14
- PostgreSQL database

🔄 NEEDS UPDATE:
- React: 17 → 18 (package.json)
- JavaScript → TypeScript (package.json, tsconfig.json)

➕ NEW CONTENT:
- WebSocket (Socket.io) - real-time features
- Redis caching layer

### structure.md
✅ ACCURATE (preserving):
- Feature-based: src/features/[feature]/
- PascalCase components

➕ NEW CONTENT:
- src/websocket/ - WebSocket server
- .test.ts - Testing convention

### standards.md
✅ ACCURATE (preserving):
- 2 PR approvals required
- 80% test coverage

➕ NEW CONTENT:
- TypeScript strict mode (tsconfig.json)
- No `any` types (.eslintrc.json)

Do these findings look correct?
Should I preserve ACCURATE sections and update OUTDATED ones?
```

**Reasoning:**
- Clear categorization (✅ 🔄 ➕)
- Shows evidence for changes
- Preserves valuable existing content
- Asks for confirmation

---

**Incorrect Response:**
```
Let me update your steering documents.

[Analyzes codebase]
[Regenerates all 4 documents from scratch]
[Loses existing content]

Steering documents updated!
```

**Why Wrong:**
- Doesn't preserve existing content
- No comparison shown
- No user approval
- Loses valuable context

### Example 2: Preserving Accurate Content

**Scenario:** User has detailed product vision that's still accurate

**User:** `/spec-steering-update`

**After comparison step, product.md shows:**

**Correct Approach:**
```
### product.md
✅ ACCURATE (preserving):
- Purpose: "Enable distributed teams to coordinate asynchronously..."
  [Full existing purpose statement - 3 paragraphs]
- Strategic advantages:
  1. [Existing USA 1]
  2. [Existing USA 2]
  3. [Existing USA 3]
- Target users: [Existing user profiles]

🔄 NEEDS UPDATE:
- Features: Missing 2 new capabilities

➕ NEW CONTENT:
- Success metrics from analytics implementation

Action: Preserve entire purpose, USAs, and users sections verbatim.
Update only features. Add metrics section.
```

**Reasoning:**
- Valuable strategic content preserved exactly
- Only updates what changed
- Doesn't regenerate accurate sections

---

**Incorrect Approach:**
```
### product.md
Regenerating based on codebase...

Purpose: Task management for teams
Features: [New list]
Users: Teams
```

**Why Wrong:**
- Lost detailed purpose statement
- Lost strategic advantages
- Lost user profiles
- Regenerated when preservation needed

### Example 3: Archiving Before Changes

**Scenario:** User approves updates

**User:** "Yes, those updates look correct. Please proceed."

**Correct Response:**
```
Great! Archiving existing documents before making changes...

Creating archive: .claude/steering/.archive/251006/
✅ Archived product.md
✅ Archived tech.md
✅ Archived structure.md
✅ Archived standards.md
✅ All archived documents marked as DEPRECATED

Generating merged documents...
[Shows merged content]

What version should I use? (default: 1.2510.1.0)
```

**Reasoning:**
- Archives BEFORE any changes
- Confirms archiving completed
- Marks deprecated
- Asks about version

---

**Incorrect Response:**
```
Great! Updating documents...
[Modifies files directly]
[No archive created]

Documents updated!
```

**Why Wrong:**
- No archive created
- Lost previous versions
- Can't rollback if needed

</examples>

<what_not_to_do>
## Critical Mistakes to Avoid

❌ **NEVER skip archiving**
```
Wrong: [Updates files directly without archiving]
Right: Archive → Mark DEPRECATED → Then update
```

❌ **NEVER regenerate accurate content**
```
Wrong: tech.md shows accurate PostgreSQL → Regenerates entire tech stack section
Right: tech.md shows accurate PostgreSQL → Preserve that line unchanged
```

❌ **NEVER lose valuable context**
```
Wrong: Removes detailed strategic advantages from product.md
Right: Preserves all strategic content, only updates features list
```

❌ **NEVER skip comprehensive analysis**
```
Wrong: "What's changed since last update?" [Asks user instead of analyzing]
Right: [Full codebase analysis] "Here's what I found changed..."
```

❌ **NEVER save without approval**
```
Wrong: [Presents comparison] [Immediately saves]
Right: [Presents comparison] "Approve to save or request changes"
```

❌ **NEVER make standards.md redundant**
```
Wrong standards.md: "React, Feature-based architecture, TypeScript"
Right standards.md: "No `any` types, TypeScript strict mode, 80% test coverage"
Rationale: Tech/structure details belong elsewhere, standards.md is for rules
```

</what_not_to_do>

<error_prevention>
## Common Failures and Solutions

### Failure 1: Losing Existing Content
**Problem:** Regenerating sections instead of preserving accurate ones
**Why It Fails:** Loses valuable strategic decisions, context, rationale
**Solution:**
- Compare FIRST
- Mark ✅ ACCURATE sections
- Preserve those sections verbatim
- Only update 🔄 OUTDATED and add ➕ NEW

### Failure 2: No Archive Before Changes
**Problem:** Modifying files without backup
**Why It Fails:** Can't rollback, lost history, risky
**Solution:**
- ALWAYS archive first (`.archive/YYMMDD/`)
- Mark archived files as DEPRECATED
- Confirm archive completed
- THEN make changes

### Failure 3: Incomplete Comparison
**Problem:** Not categorizing findings (✅ 🔄 ➕ 📝)
**Why It Fails:** User can't understand what's preserved vs changed
**Solution:**
- For EACH document
- Categorize EVERY section
- Show clear comparison
- Get user confirmation

### Failure 4: Shallow Analysis
**Problem:** Quick scan instead of comprehensive codebase review
**Why It Fails:** Misses important changes, incomplete updates
**Solution:**
- Same depth as setup command
- Check package files, configs, source code
- Review recent git history
- Search for new features/patterns

</error_prevention>

<meta_instructions>
## About This Command

**Priority Resolution:**
When instructions seem to conflict:
1. CRITICAL rules always win (never lose content, always archive, get approval)
2. Preservation beats regeneration (keep accurate content)
3. Process steps override general guidance
4. Examples demonstrate exact desired behavior

**Categorization Rules:**
- ✅ ACCURATE: Content matches codebase evidence → Preserve unchanged
- 🔄 OUTDATED: Content contradicts codebase evidence → Update with current
- ➕ NEW: Found in codebase but missing from docs → Add
- 📝 ENHANCED: Accurate but can add valuable context → Expand selectively

**Document Separation Rules:**
- product.md: WHAT (vision, features, users, objectives)
- tech.md: WITH WHAT (tools, frameworks, versions, integrations)
- structure.md: WHERE/HOW (organization, naming, patterns)
- standards.md: RULES (quality requirements, review process, anti-patterns)

**Completion Criteria:**
Command is complete when:
1. Comparison presented and approved
2. Existing documents archived with DEPRECATED markers
3. Merged documents approved by user
4. All 4 files saved to `.claude/steering/`
5. User informed of successful update
</meta_instructions>

## Next Steps
After steering documents are updated, they will automatically be referenced during:
- `/spec-create` - Align requirements with updated product vision
- `/spec-update` - Update existing specs with current steering context
- `/spec-tasks-rebuild` - Rebuild tasks following current conventions
- `/spec-execute` - Implement following latest conventions
