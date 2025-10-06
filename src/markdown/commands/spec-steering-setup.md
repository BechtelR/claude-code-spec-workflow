# Spec Steering Setup Command

Create steering documents providing persistent project context for all future spec development.

## Usage
```
/spec-steering-setup
```

<role>
You are setting up steering documents that guide all future spec development. These documents provide persistent context about product vision, technology stack, and project structure.
</role>

<critical_rules>
CRITICAL: These rules must be followed without exception:

1. **NEVER save documents without explicit user approval** - Always present for review first
2. **NEVER include sensitive data** - No passwords, API keys, credentials, or PHI
3. **NEVER skip the analysis phase** - Thorough codebase review is mandatory
4. **ALWAYS create exactly 4 documents** - product.md, tech.md, structure.md, standards.md

IMPORTANT: These significantly impact quality:

1. **Preserve user feedback** - Keep all confirmed details, discard rejected ones
2. **Keep standards.md concise** - Essential rules only, zero redundancy with other docs
3. **Ask targeted questions** - Only for genuine gaps, not covered information
4. **Present structured comparisons** - Use clear categorization (✅ ❌ ➕)
</critical_rules>

<process>
## Step-by-Step Workflow

### Step 1: Check Existing Steering Documents
**Decision Point:**
```
IF `.claude/steering/` directory exists:
  → Load all existing documents (product.md, tech.md, structure.md, standards.md)
  → Display current content summary
  → Ask: "Existing steering documents found. Replace them or cancel?"
  → IF user cancels: Stop and suggest `/spec-steering-update` instead
ELSE:
  → Proceed to Step 2 (no existing documents)
```

### Step 2: Search Project Standards Documents
**Search these locations in order:**
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

**Extract these elements:**
- Coding style (naming, formatting, structure)
- UX preferences (patterns, components, accessibility)
- Architecture (patterns to follow, anti-patterns to avoid)
- Testing (requirements, coverage, frameworks)
- Code review (approval process, quality gates)

**Output format:**
```
Standards found in: [file paths]
- [Key point 1]
- [Key point 2]
```

### Step 3: Analyze Codebase Thoroughly
**CRITICAL: Comprehensive analysis required**

Search for these indicators:
```
Package managers: package.json, requirements.txt, go.mod, Cargo.toml, composer.json
Documentation: README.md, README.txt, BLUEPRINT*.md, docs/**/*
Config files: .config/*, *.config.js, .env.example
Source structure: src/, app/, lib/, packages/
```

**Identify:**
- Project type (web app, API, CLI, library, etc.)
- Purpose and main functionality
- Technology stack (frameworks, libraries, runtime versions)
- Directory patterns (monorepo, feature folders, layered architecture)
- Coding conventions (naming, file organization)
- Existing features and capabilities

### Step 4: Present Inferred Details
**Format:**
```
Based on codebase analysis, here's what I've inferred:

## Product Details
- Purpose: [What problem does this solve?]
- Type: [Web app / API / CLI / Library / etc.]
- Features: [List 3-5 key features found]
- Users: [Inferred target audience]

## Technology Stack
- Language: [Primary language + version]
- Framework: [Main framework + version]
- Libraries: [Key dependencies]
- Tools: [Build, test, lint tools]

## Project Structure
- Pattern: [Monorepo / Layered / Feature-based / etc.]
- Organization: [How code is organized]
- Naming: [File/folder conventions observed]

## Engineering Standards
[ONLY if found in project files:]
- [Standard 1 from CONTRIBUTING.md]
- [Standard 2 from STYLE_GUIDE.md]
- [Inferred convention]
```

**Then ask:**
1. "Do these inferred details look correct? Which ones should I keep or discard?"
2. "Are there coding rules, standards, or conventions I missed?"

**CRITICAL: Wait for user response before proceeding**

### Step 5: Gather Missing Information
**Decision tree for questions:**
```
IF user confirmed all product details:
  → Skip product questions
ELSE IF user identified product gaps:
  → Ask ONLY about missing product information

IF user confirmed all tech details:
  → Skip technology questions
ELSE IF user identified tech gaps:
  → Ask ONLY about missing technology information

[Same pattern for structure and standards]
```

**Targeted Questions by Category:**

**Product (ask ONLY if gaps exist):**
- What problem does this product solve?
- What are the unique strategic advantages (USAs)?
- Who are the primary users?
- What are the key business objectives?
- What metrics define success?

**Technology (ask ONLY if gaps exist):**
- Technical constraints or requirements?
- Third-party services integrated?
- Performance requirements?

**Structure (ask ONLY if gaps exist):**
- How should new features be organized?
- Testing requirements and coverage expectations?

**Standards (ask ONLY if gaps exist):**
- Mandatory code patterns or anti-patterns?
- Code review requirements?
- Security, privacy, or compliance standards?

### Step 6: Generate Steering Documents
**CRITICAL: Create exactly 4 documents**

**Directory structure:**
```
.claude/steering/
├── product.md    - Product vision, users, features, objectives
├── tech.md       - Technology stack, tools, constraints
├── structure.md  - File organization, patterns, conventions
└── standards.md  - Engineering standards, rules, patterns
```

**Quality requirements:**
- standards.md: Concise, essential rules only, NO redundancy with tech.md/structure.md
- All docs: Focused on their specific domain
- All docs: Use consistent formatting
- All docs: Include version metadata if user wants it

### Step 7: Review and Confirm
**Validation checklist:**
```
standards.md validation:
[ ] Contains ONLY essential engineering rules
[ ] ZERO overlap with tech.md (no tech stack details)
[ ] ZERO overlap with structure.md (no file organization)
[ ] Concise and actionable (not verbose)
[ ] Covers: code quality, patterns, anti-patterns, review requirements

All documents validation:
[ ] No sensitive data (passwords, keys, credentials)
[ ] Clear, structured, easy to parse
[ ] Aligned with gathered information
[ ] Follows consistent format
```

**Present to user:**
```
Generated steering documents:

## product.md
[Preview key sections]

## tech.md
[Preview key sections]

## structure.md
[Preview key sections]

## standards.md
[Preview key sections]

Review these documents. Approve to save or request changes.
```

**CRITICAL: Do NOT save until user explicitly approves**

</process>

<examples>
### Example 1: Standard Setup Flow

**Scenario:** React/TypeScript app with CONTRIBUTING.md

**User:** `/spec-steering-setup`

**Correct Response:**
```
Checking for existing steering documents...
No existing documents found.

Searching for project standards...
Found: CONTRIBUTING.md, .eslintrc.json, .prettierrc

Analyzing codebase...
[Reads package.json, src structure, README, BLUEPRINT]

Based on codebase analysis, here's what I've inferred:

## Product Details
- Purpose: Task management web application
- Type: Full-stack web app
- Features: User auth, task CRUD, team collaboration, real-time updates
- Users: Teams managing projects

## Technology Stack
- Language: TypeScript
- Framework: React 18, Next.js 14
- Libraries: React Query, Zustand, TailwindCSS
- Tools: ESLint, Prettier, Vitest

## Project Structure
- Pattern: Feature-based architecture
- Organization: `src/features/[feature]/components|hooks|api`
- Naming: PascalCase components, camelCase utilities

## Engineering Standards
From CONTRIBUTING.md:
- All PRs require 2 approvals
- 80% test coverage minimum
- ESLint errors must be fixed before merge
From .eslintrc.json:
- No `any` types allowed
- Prefer function components over class components

Do these inferred details look correct? Which ones should I keep or discard?
```

**Reasoning:** Structured presentation, clear categorization, asks for confirmation before proceeding.

---

**Incorrect Response:**
```
I'll set up steering documents. Let me analyze your codebase.

[Creates documents immediately without user input]

Steering documents created successfully!
```

**Why Wrong:**
- Skips presenting inferred details
- No user confirmation
- Doesn't gather missing information
- Saves without approval

### Example 2: Handling Existing Documents

**Scenario:** User runs command when steering docs already exist

**User:** `/spec-steering-setup`

**Correct Response:**
```
Checking for existing steering documents...

✅ Found existing documents:
- product.md (last modified: 2025-09-15)
- tech.md (last modified: 2025-09-15)
- structure.md (last modified: 2025-09-15)
- standards.md (last modified: 2025-09-15)

⚠️ WARNING: Running setup will REPLACE these documents.

Options:
1. **Cancel** - Keep existing documents (recommended)
2. **Continue** - Replace with fresh setup
3. **Update** - Use `/spec-steering-update` to preserve valuable content

Which option do you prefer?
```

**Reasoning:**
- Warns about destructive action
- Offers safer alternative
- Requires explicit user choice

---

**Incorrect Response:**
```
Found existing steering documents. Analyzing codebase...
[Proceeds to replace without warning]
```

**Why Wrong:**
- No warning about data loss
- Doesn't offer alternatives
- Forces destructive action

### Example 3: Asking Targeted Questions

**Scenario:** User confirmed most details but product metrics missing

**User:** "All looks good except I haven't thought about success metrics"

**Correct Response:**
```
Great! I'll keep all the confirmed details.

For product success metrics, consider:
- User engagement (DAU, retention rate)
- Performance (task completion time)
- Business (conversion rate, revenue)
- Quality (error rate, user satisfaction)

What metrics define success for this product?
```

**Reasoning:**
- Focuses ONLY on the gap identified
- Provides helpful context
- Asks single targeted question

---

**Incorrect Response:**
```
Thanks! Let me ask all my questions:

Product Questions:
1. What problem does this solve?
2. What are the USAs?
3. Who are the users?
4. What are success metrics?

Technology Questions:
1. Any constraints?
[etc...]
```

**Why Wrong:**
- Asks about already-confirmed information
- Wastes user time
- Not targeted to actual gaps

</examples>

<what_not_to_do>
## Critical Mistakes to Avoid

❌ **NEVER save without approval**
```
Wrong: [Generates docs] "Steering documents created!"
Right: [Generates docs] "Review these documents. Approve to save."
```

❌ **NEVER skip codebase analysis**
```
Wrong: "What's your product about?" [Without analyzing first]
Right: [Analyzes codebase] "Here's what I found... correct?"
```

❌ **NEVER make standards.md redundant**
```
Wrong standards.md: "React, TypeScript, Feature-based architecture"
Right standards.md: "No `any` types, 80% test coverage, 2 PR approvals required"
Rationale: Tech details belong in tech.md/structure.md, standards.md is for rules
```

❌ **NEVER ask questions about confirmed information**
```
Wrong: User confirms tech stack → Still asks "What framework?"
Right: User confirms tech stack → Skip tech questions entirely
```

❌ **NEVER create fewer than 4 documents**
```
Wrong: Only creates product.md and tech.md
Right: Creates product.md, tech.md, structure.md, standards.md
```

❌ **NEVER include sensitive data**
```
Wrong: "API Key: sk_live_abc123" in tech.md
Right: "API Keys: Stored in environment variables (see .env.example)"
```

</what_not_to_do>

<error_prevention>
## Common Failures and Solutions

### Failure 1: Skipping User Confirmation
**Problem:** Saving documents before user approves
**Why It Fails:** User may want changes, wasted effort
**Solution:** ALWAYS present → wait for approval → then save

### Failure 2: Redundant standards.md
**Problem:** Including tech stack or structure details in standards.md
**Why It Fails:** Creates confusion, violates single responsibility
**Solution:**
- tech.md: Technologies, versions, tools
- structure.md: File organization, naming, patterns
- standards.md: Code quality rules, review requirements, anti-patterns

### Failure 3: Insufficient Analysis
**Problem:** Asking user for info that's in the codebase
**Why It Fails:** Poor UX, makes agent look lazy
**Solution:** Thorough analysis first → present findings → ask ONLY about gaps

### Failure 4: Not Finding Existing Docs
**Problem:** Missing `.claude/steering/` check
**Why It Fails:** Overwrites existing work without warning
**Solution:** ALWAYS check first, warn user, offer alternatives

</error_prevention>

<meta_instructions>
## About This Command

**Priority Resolution:**
When instructions seem to conflict:
1. CRITICAL rules always win (never save without approval, no sensitive data)
2. Process steps override general guidance
3. Examples demonstrate exact desired behavior

**Handling User Feedback:**
- User says "keep it": Preserve that detail exactly
- User says "wrong": Discard and ask for correct information
- User says "add X": Incorporate X into appropriate document

**Document Separation Rules:**
- product.md: WHAT (vision, features, users, objectives)
- tech.md: WITH WHAT (tools, frameworks, versions, integrations)
- structure.md: WHERE/HOW (organization, naming, patterns)
- standards.md: RULES (quality requirements, review process, anti-patterns)

**Completion Criteria:**
Command is complete when:
1. User explicitly approves all 4 documents
2. All 4 files saved to `.claude/steering/`
3. User informed of next steps
</meta_instructions>

## Next Steps
After steering documents are created, they will automatically be referenced during:
- `/spec-create` - Align requirements with product vision
- `/spec-update` - Update existing specs with current steering context
- `/spec-tasks-rebuild` - Rebuild tasks following current conventions
- `/spec-execute` - Implement following all conventions
