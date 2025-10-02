# Spec Update Command

Update an existing specification with fresh codebase analysis while preserving valuable accurate content.

## Usage
```
/spec-update <feature-name>
```

## Instructions
You are updating an existing specification through thorough codebase analysis. This command performs a **comprehensive codebase review** (same depth as spec-create) but **intelligently merges** findings with existing spec documents to preserve valuable accurate content while updating outdated information and adding new insights.

## Key Difference from spec-create
- **spec-create**: Creates complete new spec from scratch
- **spec-update**: Performs full codebase analysis BUT preserves accurate existing content while updating/adding new findings

## When to Use This Command
- **Major codebase changes**: Significant updates since spec was created
- **Updated steering documents**: Need spec aligned with new project standards
- **Partial accuracy**: Spec has valuable content but needs updates
- **Fresh perspective needed**: Want thorough analysis while preserving good existing work

## Process

1. **Validate Specification Exists**
   - Check that `.claude/specs/<feature-name>/` directory exists
   - Verify at least `requirements.md` exists
   - If spec completely missing, display error:
     ```
     Error: Specification '<feature-name>' does not exist.

     Please run `/spec-create <feature-name>` to create a new specification first.
     ```
   - Note which documents exist (requirements.md, design.md, tasks.md)

2. **Load Existing Spec Documents**
   - Load current specification context:
     ```bash
     claude-code-spec-workflow get-spec-context <feature-name>
     ```
   - Parse and store existing content from:
     - requirements.md
     - design.md (if exists)
     - tasks.md (if exists)
   - Display summary of what currently exists

3. **Load Steering Documents**
   - Load current steering context:
     ```bash
     claude-code-spec-workflow get-steering-context
     ```
   - Parse existing steering content for alignment

4. **Thorough Codebase Analysis**
   - **CRITICAL**: Perform comprehensive codebase review (same depth as spec-create)
   - Analyze existing features related to this specification
   - Search for similar patterns and reusable components
   - Review recent changes relevant to the feature
   - Identify integration points and dependencies
   - Look for:
     - package.json, requirements.txt, go.mod, etc.
     - README files
     - Configuration files
     - Source code structure
     - Existing implementations related to feature

5. **Compare Findings Against Existing Spec**
   - **CRITICAL STEP**: Compare fresh analysis with existing spec documents
   - For each document, categorize findings:

     **For requirements.md:**
     - ✅ **ACCURATE**: User stories still valid and current
     - 🔄 **OUTDATED**: Acceptance criteria changed or no longer applicable
     - ➕ **NEW**: Additional requirements discovered from codebase
     - 📝 **ENHANCED**: Stories accurate but can add clarifying context

     **For design.md:**
     - ✅ **ACCURATE**: Architecture patterns still sound
     - 🔄 **OUTDATED**: Components need updating to match current codebase
     - ➕ **NEW**: New integration points or components found
     - 📝 **ENHANCED**: Design correct but can add diagrams or details

     **For tasks.md:**
     - ✅ **COMPLETED**: Tasks already implemented (preserve [x] status)
     - ✅ **ACCURATE**: Uncompleted tasks still relevant
     - 🔄 **OUTDATED**: Tasks don't match updated requirements/design
     - ➕ **NEW**: Additional tasks needed for new requirements
     - ❌ **OBSOLETE**: Tasks no longer needed

6. **Present Comparison and Findings**
   - Show comparison results in structured format:
     ```
     Based on my thorough codebase analysis, here's what I found:

     ## COMPARISON WITH EXISTING SPEC

     ### requirements.md Status
     ✅ ACCURATE (will preserve):
     - User Story 1.1: [description]
     - User Story 2.1: [description]

     🔄 NEEDS UPDATE:
     - User Story 1.2: Acceptance criteria changed
       OLD: [old criteria]
       NEW: [new criteria based on codebase]

     ➕ NEW CONTENT TO ADD:
     - User Story 3.1: [new requirement found in codebase]
     - Evidence: [file path or feature implementation]

     ### design.md Status
     ✅ ACCURATE (will preserve):
     - Core architecture section
     - Component structure

     🔄 NEEDS UPDATE:
     - API endpoints: Changed from REST to GraphQL
       Evidence: [file paths showing GraphQL implementation]

     ➕ NEW CONTENT TO ADD:
     - WebSocket integration for real-time features
     - Evidence: [file paths]

     ### tasks.md Status
     ✅ COMPLETED (will preserve):
     - Task 1: [description] (already implemented)
     - Task 2: [description] (already implemented)

     ✅ ACCURATE PENDING (will preserve):
     - Task 6: [description] (still relevant)

     🔄 NEEDS UPDATE:
     - Task 4-5: Don't match updated design.md
       OLD: REST endpoint tasks
       NEW: GraphQL resolver tasks

     ➕ NEW CONTENT TO ADD:
     - Tasks for WebSocket integration
     - Tasks for new requirements

     ## FRESH ANALYSIS DETAILS

     **Codebase Findings:**
     - [Finding 1]
     - [Finding 2]

     **Integration Points:**
     - [Integration 1]
     - [Integration 2]

     **Reusable Components:**
     - [Component 1]
     - [Component 2]
     ```
   - Ask: "Do these findings look correct? Should I preserve the ACCURATE sections and update the OUTDATED ones?"
   - Gather any additional context from user
   - Ask: "Are there any other requirements, design decisions, or constraints I should know about?"

7. **Archive Existing Spec Documents**
   - **CRITICAL**: Before making ANY changes, archive current spec documents
   - Create archive directory structure:
     ```bash
     # Use current date in YYMMDD format (e.g., 251002 for Oct 2, 2025)
     .claude/specs/<feature-name>/.archive/251002/
     ```
   - Copy all existing spec documents to archive:
     - `.claude/specs/<feature-name>/requirements.md` → `.archive/251002/requirements.md`
     - `.claude/specs/<feature-name>/design.md` → `.archive/251002/design.md`
     - `.claude/specs/<feature-name>/tasks.md` → `.archive/251002/tasks.md`
   - **Mark archived documents as deprecated**:
     - Add `(DEPRECATED)` to the very top of each archived document (first line, before heading)
     - Example:
       ```markdown
       (DEPRECATED)
       # Requirements

       [Old content...]
       ```
   - Confirm to user: "Existing spec documents backed up to `.claude/specs/<feature-name>/.archive/251002/` and marked as DEPRECATED"
   - **Note**: If user specifies a version (e.g., "v2.1"), use that instead: `.archive/v2.1/`

8. **Determine Task Execution Mode** (if updating tasks.md)
   - If tasks.md needs updating or creating, ask:
   - "Will you execute tasks sequentially (one at a time) or in parallel (multiple agents simultaneously)?"
   - **Sequential Mode**: Larger task scope (60-90 minutes per task)
   - **Parallel Mode**: Smaller task scope (30-60 minutes per task)
   - **Wait for user decision** - this affects task granularity

9. **Generate Merged Spec Documents**
   - Create `.claude/specs/<feature-name>/` directory if needed
   - **Add version header** to each updated document:
     - Format: `*Version: MAJOR.YYMM.BUILD.PATCH*`
     - Place directly under the main heading (second line)
     - Example:
       ```markdown
       # Requirements
       *Version: 1.2510.1.0*

       [Document content...]
       ```
     - Ask user for version if they want to specify, otherwise use: `1.YYMM.1.0` (e.g., `1.2510.1.0` for October 2025)

   **For requirements.md:**

   a. **Preserve Accurate Sections**
      - Keep user stories marked as ✅ ACCURATE unchanged
      - Maintain original wording and structure
      - Preserve valuable context and rationale

   b. **Update Outdated Sections**
      - Replace sections marked as 🔄 OUTDATED with current information
      - Show what changed in comments if helpful
      - Maintain section structure where possible

   c. **Add New Sections**
      - Insert requirements marked as ➕ NEW in appropriate locations
      - Follow existing document structure and formatting
      - Integrate smoothly with preserved content

   d. **Enhance Accurate Sections** (when beneficial)
      - Expand sections marked as 📝 ENHANCED with new insights
      - Add clarifying details from fresh analysis
      - Keep enhancements relevant and concise

   **For design.md:**

   a. **Preserve Accurate Architecture**
      - Keep architecture sections marked as ✅ ACCURATE unchanged
      - Maintain existing diagrams and patterns that are still valid
      - Preserve design decisions and rationale

   b. **Update Outdated Components**
      - Replace components marked as 🔄 OUTDATED
      - Update component diagrams to match current implementation
      - Maintain overall design structure

   c. **Add New Integration Points**
      - Insert new components/integrations marked as ➕ NEW
      - Add Mermaid diagrams for new sections
      - Follow tech.md and structure.md conventions

   d. **Enhance Existing Design**
      - Expand sections marked as 📝 ENHANCED
      - Add missing diagrams or technical details
      - Clarify existing patterns with codebase examples

   **For tasks.md:**

   a. **Preserve Completed Tasks**
      - Keep tasks marked as ✅ COMPLETED with [x] checkbox status
      - Do NOT change their completion status
      - Preserve task descriptions and metadata

   b. **Preserve Accurate Pending Tasks**
      - Keep uncompleted tasks marked as ✅ ACCURATE unchanged
      - Maintain [ ] checkbox status
      - Keep original task metadata

   c. **Update Outdated Tasks**
      - Replace tasks marked as 🔄 OUTDATED with updated versions
      - Align with current requirements.md and design.md
      - Update metadata (_Requirements:_, _Depends:_, _Parallel:_, _Leverage:_)

   d. **Add New Tasks**
      - Insert tasks marked as ➕ NEW
      - Follow chosen execution mode (sequential/parallel)
      - Include all required metadata
      - Renumber as needed to maintain logical flow

   e. **Remove Obsolete Tasks**
      - Remove tasks marked as ❌ OBSOLETE
      - Only if truly no longer needed

10. **Validate and Approve**
    - **Automatic Validation**: Use validation agents for each document:

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
    6. Verify completed tasks were preserved correctly
    7. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

    If validation fails, use the feedback to improve before presenting to the user.
    ```

    - **Only present to user after validation passes or improvements are made**
    - **Present all merged documents**
    - **Highlight what changed**: Show preserved vs. updated vs. new sections
    - Ask: "Do the updated documents look good?"
    - **CRITICAL**: Wait for explicit approval before saving
    - **WHEN APPROVED for tasks.md**: Add "✅ APPROVED" marker after version:
      ```markdown
      # Implementation Plan
      *Version: 1.2510.1.0*

      ✅ APPROVED

      [Task content...]
      ```
    - Save all documents to `.claude/specs/<feature-name>/`
    - Inform user: "Spec updated successfully! Completed tasks preserved. Execute pending tasks with `/spec-execute {task-id}` or `/spec-execute-parallel {task-ids}`."

## Important Notes

- **Thorough analysis required** - Perform complete codebase review like spec-create
- **Preservation is critical** - Never lose valuable accurate content from existing spec
- **Intelligent merging** - Combine best of existing spec with fresh findings
- **Update confidently** - Replace outdated info with current codebase state
- **Add comprehensively** - Include all new discoveries from analysis
- **Completed tasks preserved** - Keep [x] status for implemented tasks
- **Never include sensitive data** - No passwords, API keys, or credentials

## What Changes vs. What Stays

### Changes
- ✅ **requirements.md** - Intelligently merged (preserve + update + add)
- ✅ **design.md** - Intelligently merged (preserve + update + add)
- ✅ **tasks.md** - Intelligently merged (preserve completed + update pending + add new)
- ✅ **All documents get version headers**
- ✅ **Old versions archived with DEPRECATED marker**

### Preservation Examples
- ✅ **Completed tasks** - Keep [x] checkbox and task details
- ✅ **Accurate user stories** - Keep unchanged if still valid
- ✅ **Sound architecture** - Preserve good design decisions
- ✅ **Valuable context** - Keep rationale and decision history

## Archive Structure After Update

```
.claude/specs/<feature-name>/
├── .archive/
│   ├── 251002/
│   │   ├── requirements.md    (DEPRECATED)
│   │   ├── design.md          (DEPRECATED)
│   │   └── tasks.md           (DEPRECATED)
│   └── 251015/
│       ├── requirements.md    (DEPRECATED)
│       ├── design.md          (DEPRECATED)
│       └── tasks.md           (DEPRECATED)
├── requirements.md            *Version: 1.2510.2.0*
├── design.md                  *Version: 1.2510.2.0*
└── tasks.md                   *Version: 1.2510.2.0* ✅ APPROVED
```

## Example Flow

1. User runs `/spec-update user-authentication`
2. Validate spec exists (requirements.md ✓, design.md ✓, tasks.md ✓)
3. Load existing spec context
4. Load steering context
5. Perform thorough codebase analysis
6. Compare findings:
   - requirements.md: 5 stories accurate, 2 need updates, 1 new story
   - design.md: Architecture sound, API endpoints changed, new WebSocket integration
   - tasks.md: Tasks 1-3 completed (preserve), task 4-5 need updates, 2 new tasks
7. Present comparison to user
8. User confirms findings
9. Archive existing spec to `.archive/251002/` (with DEPRECATED markers)
10. Ask: "Sequential or parallel execution?" → User chooses sequential
11. Generate merged documents:
    - Preserve 5 accurate user stories, update 2, add 1 new
    - Preserve architecture, update API section, add WebSocket section
    - Preserve tasks 1-3 [x], update tasks 4-5, add 2 new tasks
    - Add version headers to all: *Version: 1.2510.1.0*
12. Validate all documents with respective agents
13. Present merged documents
14. User approves
15. Add "✅ APPROVED" to tasks.md
16. Save all three documents
17. Inform user: "Spec updated! Completed tasks preserved."

## Next Steps
After spec is updated, you can:
- Execute pending tasks using `/spec-execute {task-id}` (sequential mode)
- Execute pending tasks using `/spec-execute-parallel {task-ids}` (parallel mode)
- Check progress with `/spec-status <feature-name>`
- List all specs with `/spec-list`

## Related Commands
- `/spec-create` - Create a complete new specification from scratch
- `/spec-tasks-rebuild` - Rebuild only tasks.md (complete regeneration)
- `/spec-steering-update` - Update steering documents with codebase changes
- `/spec-execute` - Execute individual tasks sequentially
- `/spec-execute-parallel` - Execute multiple tasks in parallel
