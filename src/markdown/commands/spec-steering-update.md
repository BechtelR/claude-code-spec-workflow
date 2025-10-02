# Spec Steering Update Command

Update existing steering documents with fresh codebase analysis while preserving valuable accurate content.

## Usage
```
/spec-steering-update
```

## Instructions
You are updating the project steering documents that guide all future spec development. This command performs a **thorough, comprehensive codebase review** (same as setup) but **intelligently merges** findings with existing documents to preserve valuable accurate content while updating outdated information and adding new insights.

## Key Difference from Setup
- **Setup**: Creates steering documents from scratch
- **Update**: Performs full codebase analysis BUT preserves accurate existing content while updating/adding new findings

## Process

1. **Load Existing Steering Documents**
   - Load current steering context:
     ```bash
     claude-code-spec-workflow get-steering-context
     ```
   - Parse and store existing content from:
     - product.md
     - tech.md
     - structure.md
     - standards.md
   - If any documents are missing, note which ones need to be created
   - Display summary of what currently exists

2. **Search for Project Standards Documents**
   - Look for common standards files in the project:
     - `CONTRIBUTING.md`, `CONTRIBUTING.txt`
     - `STANDARDS.md`, `CODING_STANDARDS.md`, `CODE_STANDARDS.md`
     - `CONVENTIONS.md`, `CODING_CONVENTIONS.md`
     - `STYLE_GUIDE.md`, `STYLE.md`
     - `DEVELOPMENT.md`, `DEV_GUIDE.md`
     - `.editorconfig`, `.prettierrc`, `.eslintrc*`
     - Files in `docs/` or `documentation/` directories containing "standard", "convention", "rule", or "guideline"
   - If found, extract key points:
     - Coding style preferences
     - UX preferences
     - Architecture patterns and anti-patterns
     - Testing requirements
     - Code review rules
   - Keep notes concise - will be used to update standards.md

3. **Analyze the Project Thoroughly**
   - **CRITICAL**: Perform comprehensive codebase review (same depth as setup)
   - Review the codebase to understand:
     - Project type and purpose
     - Technology stack in use
     - Directory structure and patterns
     - Coding conventions
     - Existing features and functionality
   - Look for:
     - package.json, requirements.txt, go.mod, etc.
     - README files
     - Configuration files
     - Source code structure
     - Recent changes and new additions

4. **Compare Findings Against Existing Documents**
   - **CRITICAL STEP**: Compare fresh analysis with existing steering docs
   - For each document, categorize findings:

     **✅ ACCURATE**: Existing content matches codebase findings
     - Example: "React UI framework" in tech.md matches package.json
     - Action: Preserve these sections unchanged

     **🔄 OUTDATED**: Existing content contradicts current codebase
     - Example: tech.md says "React 17.0.2" but package.json shows "18.2.0"
     - Action: Update with current information (show old → new)

     **➕ NEW**: Found in codebase but not documented
     - Example: TypeScript added to project but not in tech.md
     - Action: Add new sections/items

     **📝 ENHANCED**: Existing content accurate but can be expanded
     - Example: "React: UI framework" → "React 18.2.0: UI framework with hooks and concurrent features"
     - Action: Expand with additional context from analysis

5. **Present Comparison and Inferred Details**
   - Show comparison results in structured format:
     ```
     Based on my thorough codebase analysis, here's what I found:

     ## COMPARISON WITH EXISTING DOCS

     ### Product Document (product.md)
     ✅ ACCURATE (will preserve):
     - [List accurate sections]

     🔄 NEEDS UPDATE:
     - Features: Old doc lists 3 features, codebase shows 5 features
     - [Other outdated items]

     ➕ NEW CONTENT TO ADD:
     - Dashboard tunnel feature (found in src/tunnel/)
     - [Other new items]

     ### Technology Document (tech.md)
     ✅ ACCURATE (will preserve):
     - [List accurate sections]

     🔄 NEEDS UPDATE:
     - React: 17.0.2 → 18.2.0 (package.json)
     - [Other outdated items]

     ➕ NEW CONTENT TO ADD:
     - TypeScript 5.3.3 (package.json)
     - WebSocket integration (package.json, src/dashboard/)
     - [Other new items]

     ### Structure Document (structure.md)
     [Same format...]

     ### Standards Document (standards.md)
     [Same format...]

     ## FRESH ANALYSIS DETAILS

     **Product Details:**
     - [Inferred detail 1]
     - [Inferred detail 2]

     **Technology Stack:**
     - [Inferred tech 1]
     - [Inferred tech 2]

     **Project Structure:**
     - [Inferred pattern 1]
     - [Inferred pattern 2]

     **Engineering Standards:**
     - [Key rule from CONTRIBUTING.md]
     - [Pattern from STYLE_GUIDE.md]
     - [Inferred pattern]
     ```
   - Ask: "Do these findings look correct? Should I preserve the ACCURATE sections and update the OUTDATED ones?"
   - Ask: "Are there any other coding rules, engineering standards, or conventions I should know about?"

6. **Gather Missing Information**
   - Based on user feedback, identify gaps
   - Ask targeted questions to fill in missing details:

     **Product Questions:**
     - What is the main problem this product solves?
     - What are the product's unique strategic advantages (USAs)?
     - Who are the primary users?
     - What are the key business objectives?
     - What metrics define success?

     **Technology Questions:**
     - Are there any technical constraints or requirements?
     - What third-party services are integrated?
     - What are the performance requirements?

     **Structure Questions:**
     - How should new features be organized?
     - What are the testing requirements?

     **Engineering Standards Questions:**
     - Any mandatory code patterns or anti-patterns (beyond what was found)?
     - Specific code review requirements?
     - Security, privacy or compliance standards?

7. **Archive Existing Steering Documents**
   - **CRITICAL**: Before making ANY changes, archive current steering documents
   - Create archive directory structure:
     ```bash
     # Use current date in YYMMDD format (e.g., 251002 for Oct 2, 2025)
     .claude/steering/.archive/251002/
     ```
   - Copy all existing steering documents to archive:
     - `.claude/steering/product.md` → `.claude/steering/.archive/251002/product.md`
     - `.claude/steering/tech.md` → `.claude/steering/.archive/251002/tech.md`
     - `.claude/steering/structure.md` → `.claude/steering/.archive/251002/structure.md`
     - `.claude/steering/standards.md` → `.claude/steering/.archive/251002/standards.md`
   - **Mark archived documents as deprecated**:
     - Add `(DEPRECATED)` to the very top of each archived document (first line, before heading)
     - Example:
       ```markdown
       (DEPRECATED)
       # Product Context
       ```
   - Confirm to user: "Existing steering documents backed up to `.claude/steering/.archive/251002/` and marked as DEPRECATED"
   - **Note**: If user specifies a version (e.g., "v2.1"), use that instead: `.claude/steering/.archive/v2.1/`

8. **Generate Merged Steering Documents**
   - Create `.claude/steering/` directory if it doesn't exist
   - Generate **four** merged documents with version header
   - **Add version header** to each new document:
     - Format: `*Version: MAJOR.YYMM.BUILD.PATCH*`
     - Place directly under the main heading (second line)
     - Example:
       ```markdown
       # Product Context
       *Version: 1.2510.1.0*

       [Document content...]
       ```
     - Ask user for version if they want to specify, otherwise use: `1.YYMM.1.0` (e.g., `1.2510.1.0` for October 2025)

     **For each document (product.md, tech.md, structure.md, standards.md):**

     a. **Preserve Accurate Sections**
        - Keep sections marked as ✅ ACCURATE unchanged
        - Maintain original wording and structure
        - Preserve valuable context and historical decisions

     b. **Update Outdated Sections**
        - Replace sections marked as 🔄 OUTDATED with current information
        - Show what changed (e.g., "React 18.2.0 (updated from 17.0.2)")
        - Maintain section structure where possible

     c. **Add New Sections**
        - Insert sections marked as ➕ NEW in appropriate locations
        - Follow existing document structure and formatting
        - Integrate smoothly with preserved content

     d. **Enhance Accurate Sections** (when beneficial)
        - Expand sections marked as 📝 ENHANCED with new insights
        - Add clarifying details from fresh analysis
        - Keep enhancements relevant and concise

9. **Review and Confirm**
   - Ensure standards.md is **focused and concise** (essential rules only, zero redundancy with tech.md/structure.md)
   - Present the merged documents to the user
   - **Highlight what changed**: Show preserved vs. updated vs. new sections
   - Ask for final approval before saving
   - Make any requested adjustments

## Important Notes

- **Thorough analysis required** - perform complete codebase review like setup command
- **Preservation is critical** - never lose valuable accurate content from existing docs
- **Intelligent merging** - combine best of existing docs with fresh findings
- **Update confidently** - replace outdated info with current codebase state
- **Add comprehensively** - include all new discoveries from analysis
- **Steering documents are persistent** - they will be referenced in all future spec commands
- **Keep documents focused** - each should cover its specific domain
- **Never include sensitive data** - no passwords, API keys, or credentials

## Example Flow

1. Load existing steering documents (get-steering-context)
2. Search for and find CONTRIBUTING.md with coding standards
3. Perform thorough codebase analysis (same as setup)
4. Compare findings with existing docs:
   - product.md: 3 sections accurate, 1 outdated (features), 2 new items
   - tech.md: Most accurate, React version outdated, TypeScript not documented
   - structure.md: Mostly accurate, dashboard architecture expanded
   - standards.md: All accurate, found new anti-pattern to add
5. Present comparison showing what will be preserved/updated/added
6. User confirms findings and provides additional context
7. Ask about any gaps (performance requirements, new integrations)
8. Archive existing steering documents to `.claude/steering/.archive/251002/`
9. Generate merged documents:
   - Preserve all accurate sections verbatim
   - Update React version in tech.md
   - Add TypeScript and WebSocket to tech.md
   - Add 2 new features to product.md
   - Expand dashboard section in structure.md
   - Add new anti-pattern to standards.md
10. User reviews merged documents and approves
11. Save updated documents to `.claude/steering/` directory

## Next Steps
After steering documents are updated, they will automatically be referenced during:
- `/spec-create` - Align requirements with updated product vision
- `/spec-update` - Update existing specs with current steering context
- `/spec-tasks-rebuild` - Rebuild tasks following current conventions
- `/spec-execute` - Implement following latest conventions
