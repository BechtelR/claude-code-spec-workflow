# Spec Tasks Rebuild Command

Completely rebuild the tasks.md document for an existing specification using the latest spec and steering documents.

## Usage
```
/spec-tasks-rebuild <feature-name>
```

## Instructions
You are rebuilding the tasks.md document for an existing specification. This command completely regenerates the task breakdown using the current requirements.md, design.md, and steering documents.

## When to Use This Command
- **Updated steering documents**: Need tasks aligned with new project conventions
- **Manually edited spec docs**: Requirements or design were updated and tasks need realignment
- **Change execution mode**: Want to switch between sequential and parallel task execution
- **Tasks outdated**: Current tasks don't reflect latest requirements or design decisions

## Key Difference from spec-create
- **spec-create**: Creates complete new spec (requirements → design → tasks)
- **spec-tasks-rebuild**: Only regenerates tasks.md using existing requirements.md and design.md

## Process

1. **Validate Specification Exists**
   - Check that `.claude/specs/<feature-name>/` directory exists
   - Verify `requirements.md` exists
   - Verify `design.md` exists
   - If any are missing, display error:
     ```
     Error: Specification '<feature-name>' is incomplete or does not exist.

     Missing documents:
     - requirements.md [if missing]
     - design.md [if missing]

     Please run `/spec-create <feature-name>` to create a complete specification first.
     ```

2. **Load All Context**
   - Load steering documents (if available):
     ```bash
     claude-code-spec-workflow get-steering-context
     ```
   - Load specification context (requirements + design):
     ```bash
     claude-code-spec-workflow get-spec-context <feature-name>
     ```
   - Load tasks template for structure:
     ```bash
     claude-code-spec-workflow get-template-context spec
     ```
   - **Store this context** - you will reference it throughout the rebuild process

3. **Archive Existing tasks.md**
   - **CRITICAL**: Before making ANY changes, archive current tasks.md
   - Archive path format:
     ```
     .claude/specs/<feature-name>/.archive/tasks_YYMMDD.md
     ```
   - Example: `.claude/specs/user-auth/.archive/tasks_251002.md`
   - **Mark archived document as deprecated**:
     - Add `(DEPRECATED)` to the very top of the archived file (first line, before heading)
     - Example:
       ```markdown
       (DEPRECATED)
       # Implementation Plan
       ```
   - Confirm to user: "Existing tasks.md backed up to `.claude/specs/<feature-name>/.archive/tasks_251002.md` and marked as DEPRECATED"
   - **Note**: If tasks.md doesn't exist yet, skip archival and proceed

4. **Determine Execution Mode**
   - **FIRST STEP**: Ask the user: "Will you execute tasks sequentially (one at a time) or in parallel (multiple agents simultaneously)?"
   - **Sequential Mode**: Best for complex features requiring careful coordination
     - Larger task scope (60-90 minutes per task)
     - Dependencies implicit through ordering
     - Execute via `/spec-execute {task-id}`
   - **Parallel Mode**: Best for independent components built concurrently
     - Smaller task scope (30-60 minutes for context window)
     - Explicit dependencies required
     - Execute via `/spec-execute-parallel {task-id-1} {task-id-2} ...`
   - **Wait for user decision before proceeding** - this affects task granularity

5. **Generate New tasks.md**
   - **Use the pre-loaded context** from step 2 (do not reload)
   - Generate atomic task list based on chosen execution mode:

   **For Sequential Mode:**
   - **File Scope**: Each task touches 2-4 related files (cohesive unit of work)
   - **Time Boxing**: Completable in 60-90 minutes by experienced developer
   - **Single Purpose**: One architectural component or feature layer
   - **Example**: "Create API framework and setup middleware in src/api/" (3-4 files, ~75 min)

   **For Parallel Mode:**
   - **File Scope**: Each task touches 2-3 files maximum (avoid conflicts)
   - **Time Boxing**: Completable in 30-60 minutes (context window constraint)
   - **Single Purpose**: One independent component or module
   - **Example**: "Create User model in src/models/User.ts with validation" (1-2 files, ~45 min)

   **REQUIRED Metadata for ALL Tasks**:
   - `_Requirements: X.Y, Z.A_` - Maps to specific requirements
   - `_Depends: none_` or `_Depends: 1, 2_` - Task dependencies (use "none" if no dependencies)
   - `_Parallel: yes_` or `_Parallel: no_` - Can this task run in parallel mode?
   - `_Leverage: path/to/file.ts_` - Existing code to reuse (optional but recommended)

   **Implementation Guidelines**:
   - **Follow structure.md**: Ensure tasks respect project file organization
   - **Follow standards.md**: Ensure tasks comply with engineering standards and coding rules
   - **Prioritize extending/adapting existing code** over building from scratch
   - Use checkbox format with numbered hierarchy
   - Each task MUST include all required metadata
   - Focus ONLY on coding tasks (no deployment, user testing, etc.)
   - For parallel mode: ensure no file path conflicts between tasks that can run together

   **Use tasks template structure**: Follow the exact format from the pre-loaded tasks template

6. **Validate and Approve**
   - **Automatic Validation**: Use the `spec-task-validator` agent to validate the tasks:

   ```
   Use the spec-task-validator agent to validate the task breakdown for the <feature-name> specification.

   The agent should:
   1. Read the NEW tasks document (in memory, not yet saved)
   2. Read requirements.md and design.md from the pre-loaded spec context
   3. Validate each task against atomicity criteria (file scope, time boxing, single purpose)
   4. Check for agent-friendly formatting and clear specifications
   5. Verify requirement references and leverage information are accurate
   6. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

   If validation fails, use the feedback to break down tasks further and improve atomicity before presenting to the user.
   ```

   - **If validation fails**: Break down broad tasks further before presenting
   - **Only present to user after validation passes or improvements are made**
   - **Add version header** to the new document:
     - Format: `*Version: MAJOR.YYMM.BUILD.PATCH*`
     - Place directly under the main heading (second line)
     - Example:
       ```markdown
       # Implementation Plan
       *Version: 1.2510.1.0*

       [Document content...]
       ```
     - Ask user for version if they want to specify, otherwise use: `1.YYMM.1.0` (e.g., `1.2510.1.0` for October 2025)
   - **Present the validated task list**
   - Ask: "Do the tasks look good? Each task should be atomic and agent-friendly."
   - **CRITICAL**: Wait for explicit approval before saving
   - **WHEN APPROVED**: Add "✅ APPROVED" at the top of tasks.md after the version line:
     ```markdown
     # Implementation Plan
     *Version: 1.2510.1.0*

     ✅ APPROVED

     [Task content...]
     ```
   - Save to `.claude/specs/<feature-name>/tasks.md`
   - Inform user: "Tasks rebuilt! You can now execute them using `/spec-execute {task-id}` for sequential mode or `/spec-execute-parallel {task-ids}` for parallel mode."

## Important Notes

- **Complete rebuild** - All tasks are regenerated from scratch
- **Task completion status reset** - All tasks marked as pending (not completed)
- **Requirements and design untouched** - Only tasks.md is replaced
- **Archive preserves history** - Old tasks.md saved with DEPRECATED marker
- **Version tracking** - New tasks.md includes version header
- **Steering alignment** - Tasks follow current structure.md and standards.md
- **Never include sensitive data** - No passwords, API keys, or credentials

## What Changes vs. What Stays

### Changes
- ✅ **tasks.md** - Completely regenerated with new task breakdown
- ✅ **Task numbering** - May change based on new breakdown
- ✅ **Task completion status** - Reset to pending (all unchecked)
- ✅ **Task metadata** - Updated to match current requirements/design

### Stays Unchanged
- ❌ **requirements.md** - Not modified
- ❌ **design.md** - Not modified
- ❌ **Spec directory structure** - Only tasks.md and .archive/ affected

## Archive Structure After Rebuild

```
.claude/specs/<feature-name>/
├── .archive/
│   ├── tasks_251002.md    (DEPRECATED - first rebuild)
│   └── tasks_251015.md    (DEPRECATED - second rebuild)
├── requirements.md         (unchanged)
├── design.md              (unchanged)
└── tasks.md               *Version: 1.2510.2.0* ✅ APPROVED
```

## Example Flow

1. User runs `/spec-tasks-rebuild user-authentication`
2. Validate spec exists (requirements.md ✓, design.md ✓)
3. Load steering context and spec context
4. Archive existing tasks.md to `.archive/tasks_251002.md` (with DEPRECATED marker)
5. Ask user: "Sequential or parallel execution?" → User chooses sequential
6. Generate new tasks with sequential mode (60-90 min scope)
7. Validate with spec-task-validator agent
8. Add version header: *Version: 1.2510.1.0*
9. Present tasks to user
10. User approves
11. Add "✅ APPROVED" marker
12. Save to `.claude/specs/user-authentication/tasks.md`
13. Inform user: "Tasks rebuilt! Execute with `/spec-execute {task-id}`"

## Next Steps
After tasks are rebuilt, you can:
- Execute tasks using `/spec-execute {task-id}` (sequential mode)
- Execute tasks using `/spec-execute-parallel {task-ids}` (parallel mode)
- Check progress with `/spec-status <feature-name>`
- List all specs with `/spec-list`

## Related Commands
- `/spec-create` - Create a complete new specification from scratch
- `/spec-update` - Update entire spec (requirements, design, tasks) with intelligent preservation
- `/spec-execute` - Execute individual tasks sequentially
- `/spec-execute-parallel` - Execute multiple tasks in parallel
