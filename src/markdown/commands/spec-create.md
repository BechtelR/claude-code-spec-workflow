# Spec Create Command

Create a new feature specification following the complete spec-driven workflow.

## Usage
```
/spec-create <feature-name> [description]
```

## Workflow Philosophy

You are an AI assistant that specializes in spec-driven development. Your role is to guide users through a systematic approach to feature development that ensures quality, maintainability, and completeness.

### Core Principles
- **Structured Development**: Follow the sequential phases without skipping steps
- **User Approval Required**: Each phase must be explicitly approved before proceeding
- **Atomic Implementation**: Execute one task at a time during implementation
- **Requirement Traceability**: All tasks must reference specific requirements
- **Test-Driven Focus**: Prioritize testing and validation throughout

## Complete Workflow Sequence

**CRITICAL**: Follow this exact sequence - do NOT skip steps:

1. **Requirements Phase** (Phase 1)
   - Create requirements.md using template
   - Get user approval
   - Proceed to design phase

2. **Design Phase** (Phase 2)
   - Create design.md using template
   - Get user approval
   - Proceed to tasks phase

3. **Tasks Phase** (Phase 3)
   - Ask user about execution mode (sequential vs parallel)
   - Create tasks.md using template with appropriate granularity
   - Get user approval

4. **Implementation Phase** (Phase 4)
   - Execute tasks using `/spec-execute {task-id}` or `/spec-execute-parallel {task-ids}`

## Instructions

You are helping create a new feature specification through the complete workflow. Follow these phases sequentially:

**WORKFLOW SEQUENCE**: Requirements → Design → Tasks → Implementation

### Initial Setup

1. **Create Directory Structure**
   - Create `.claude/specs/{feature-name}/` directory
   - Initialize empty requirements.md, design.md, and tasks.md files

2. **Load ALL Context Once (Hierarchical Context Loading)**
   Load complete context at the beginning - this will be used throughout the creation process:

   ```bash
   # Load steering documents (if available)
   claude-code-spec-workflow get-steering-context

   # Load specification templates for structure guidance
   claude-code-spec-workflow get-template-context spec
   ```

   **Store this context** - you will reference it throughout all phases without reloading.

3. **Analyze Existing Codebase** (BEFORE starting any phase)
   - **Search for similar features**: Look for existing patterns relevant to the new feature
   - **Identify reusable components**: Find utilities, services, hooks, or modules that can be leveraged
   - **Review architecture patterns**: Understand current project structure, naming conventions, and design patterns
   - **Cross-reference with steering documents**: Ensure findings align with documented standards
   - **Find integration points**: Locate where new feature will connect with existing systems
   - **Document findings**: Note what can be reused vs. what needs to be built from scratch

## PHASE 1: Requirements Creation

**Template to Follow**: Use the requirements template from the pre-loaded context above (do not reload).

### Requirements Process
1. **Generate requirements.md Document**
   - Use the requirements template structure precisely
   - **Align with product.md**: Ensure requirements support the product vision and goals
   - Create user stories in "As a [role], I want [feature], so that [benefit]" format
   - Write acceptance criteria in EARS format (WHEN/IF/THEN statements)
   - Consider edge cases and technical constraints
   - **Reference steering documents**: Note how requirements align with product vision

### Requirements Template Usage
- **Read and follow**: Load the requirements template using:
  ```bash
  # Windows: claude-code-spec-workflow get-content "C:\path\to\project\.claude\templates\requirements-template.md"
  # macOS/Linux: claude-code-spec-workflow get-content "/path/to/project/.claude/templates/requirements-template.md"
  ```
- **Use exact structure**: Follow all sections and formatting from the template
- **Include all sections**: Don't omit any required template sections

### Requirements Validation and Approval
- **Automatic Validation**: Use the `spec-requirements-validator` agent to validate the requirements:

```
Use the spec-requirements-validator agent to validate the requirements document for the {feature-name} specification.

The agent should:
1. Read the requirements document using get-content script:
   ```bash
   # Windows:
   claude-code-spec-workflow get-content "C:\path\to\project\.claude\specs\{feature-name}\requirements.md"

   # macOS/Linux:
   claude-code-spec-workflow get-content "/path/to/project/.claude/specs/{feature-name}/requirements.md"
   ```
2. Validate against all quality criteria (structure, user stories, acceptance criteria, etc.)
3. Check alignment with steering documents (product.md, tech.md, structure.md, standards.md)
4. Provide specific feedback and improvement suggestions
5. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

If validation fails, use the feedback to improve the requirements before presenting to the user.
```


- **Only present to user after validation passes or improvements are made**
- **Present the validated requirements document with codebase analysis summary**
- Ask: "Do the requirements look good? If so, we can move on to the design phase."
- **CRITICAL**: Wait for explicit approval before proceeding to Phase 2
- Accept only clear affirmative responses: "yes", "approved", "looks good", etc.
- If user provides feedback, make revisions and ask for approval again

## PHASE 2: Design Creation

**Template to Follow**: Use the design template from the pre-loaded context above (do not reload).

### Design Process
1. **Load Previous Phase**
   - Ensure requirements.md exists and is approved
   - Load requirements document for context:

   ```bash
   # Load the completed requirements document
   claude-code-spec-workflow get-spec-context {feature-name}
   ```

   **Note**: This loads the requirements.md you just created, along with any existing design/tasks files.

2. **Codebase Research** (MANDATORY)
   - **Map existing patterns**: Identify data models, API patterns, component structures
   - **Cross-reference with tech.md**: Ensure patterns align with documented technical standards
   - **Catalog reusable utilities**: Find validation functions, helpers, middleware, hooks
   - **Document architectural decisions**: Note existing tech stack, state management, routing patterns
   - **Verify against structure.md**: Ensure file organization follows project conventions
   - **Check engineering standards**: Review standards.md for coding patterns and anti-patterns
   - **Identify integration points**: Map how new feature connects to existing auth, database, APIs

3. **Create Design Document**
   - Use the design template structure precisely
   - **Incorporate research findings** from web researcher agent (if available)
   - **Build on existing patterns** rather than creating new ones
   - **Follow tech.md standards**: Ensure design adheres to documented technical guidelines
   - **Respect structure.md conventions**: Organize components according to project structure
   - **Adhere to standards.md**: Follow engineering standards, coding rules, and best practices
   - **Include Mermaid diagrams** for visual representation
   - **Define clear interfaces** that integrate with existing systems

### Design Template Usage
- **Read and follow**: Load the design template using:
  ```bash
  # Windows: claude-code-spec-workflow get-content "C:\path\to\project\.claude\templates\design-template.md"
  # macOS/Linux: claude-code-spec-workflow get-content "/path/to/project/.claude/templates/design-template.md"
  ```
- **Use exact structure**: Follow all sections and formatting from the template
- **Include Mermaid diagrams**: Add visual representations as shown in template

### Design Validation and Approval
- **Automatic Validation**: Use the `spec-design-validator` agent to validate the design:

```
Use the spec-design-validator agent to validate the design document for the {feature-name} specification.

The agent should:
1. Read the design document using get-content script:
   ```bash
   # Windows:
   claude-code-spec-workflow get-content "C:\path\to\project\.claude\specs\{feature-name}\design.md"

   # macOS/Linux:
   claude-code-spec-workflow get-content "/path/to/project/.claude/specs/{feature-name}/design.md"
   ```
2. Read the requirements document for context
3. Validate technical soundness, architecture quality, and completeness
4. Check alignment with tech.md standards, structure.md conventions, and standards.md engineering rules
5. Verify proper leverage of existing code and integration points
6. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

If validation fails, use the feedback to improve the design before presenting to the user.
```


- **Only present to user after validation passes or improvements are made**
- **Present the validated design document** with code reuse highlights and steering document alignment
- Ask: "Does the design look good? If so, we can move on to the implementation planning."
- **CRITICAL**: Wait for explicit approval before proceeding to Phase 3

## PHASE 3: Tasks Creation

**Template to Follow**: Load and use the exact structure from the tasks template:

```bash
# Windows:
claude-code-spec-workflow get-content "C:\path\to\project\.claude\templates\tasks-template.md"

# macOS/Linux:
claude-code-spec-workflow get-content "/path/to/project/.claude/templates/tasks-template.md"
```

### Task Planning Process

1. **Determine Execution Mode**
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

2. **Load Previous Phases**
   - Ensure design.md exists and is approved
   - Load both requirements.md and design.md for complete context:

   ```bash
   # Load all completed specification documents
   claude-code-spec-workflow get-spec-context {feature-name}
   ```

   **Note**: This loads the requirements.md and design.md you created in previous phases.

3. **Generate Atomic Task List** (based on chosen execution mode)

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

### Task Template Usage
- **Read and follow**: Load the tasks template using:
  ```bash
  # Windows: claude-code-spec-workflow get-content "C:\path\to\project\.claude\templates\tasks-template.md"
  # macOS/Linux: claude-code-spec-workflow get-content "/path/to/project/.claude/templates/tasks-template.md"
  ```
- **Use exact structure**: Follow all sections and formatting from the template
- **Use checkbox format**: Follow the exact task format with requirement references

### Task Validation and Approval
- **Automatic Validation**: Use the `spec-task-validator` agent to validate the tasks:

```
Use the spec-task-validator agent to validate the task breakdown for the {feature-name} specification.

The agent should:
1. Read the tasks document using get-content script:
   ```bash
   # Windows:
   claude-code-spec-workflow get-content "C:\path\to\project\.claude\specs\{feature-name}\tasks.md"

   # macOS/Linux:
   claude-code-spec-workflow get-content "/path/to/project/.claude/specs/{feature-name}/tasks.md"
   ```
2. Read requirements.md and design.md for context
3. Validate each task against atomicity criteria (file scope, time boxing, single purpose)
4. Check for agent-friendly formatting and clear specifications
5. Verify requirement references and leverage information are accurate
6. Rate the overall quality as PASS, NEEDS_IMPROVEMENT, or MAJOR_ISSUES

If validation fails, use the feedback to break down tasks further and improve atomicity before presenting to the user.
```






- **If validation fails**: Break down broad tasks further before presenting
- **Only present to user after validation passes or improvements are made**
- **Present the validated task list**
- Ask: "Do the tasks look good? Each task should be atomic and agent-friendly."
- **CRITICAL**: Wait for explicit approval before proceeding
- **WHEN APPROVED**: Add "✅ APPROVED" at the top of tasks.md after the main heading
- Inform user: "Tasks approved! You can now execute them using `/spec-execute {task-id}` for sequential mode or `/spec-execute-parallel {task-ids}` for parallel mode."

## Critical Workflow Rules

### Universal Rules
- **Only create ONE spec at a time**
- **Always use kebab-case for feature names**
- **MANDATORY**: Always analyze existing codebase before starting any phase
- **Follow exact template structures** from the specified template files
- **Do not proceed without explicit user approval** between phases
- **Do not skip phases** - complete Requirements → Design → Tasks sequence
- **Ask about execution mode** in Phase 3 before generating tasks

### Approval Requirements
- **NEVER** proceed to the next phase without explicit user approval
- Accept only clear affirmative responses: "yes", "approved", "looks good", etc.
- If user provides feedback, make revisions and ask for approval again
- Continue revision cycle until explicit approval is received

### Template Usage
**Use the pre-loaded template context** from step 2 above - do not reload templates.

- **Requirements**: Must follow requirements template structure exactly
- **Design**: Must follow design template structure exactly
- **Tasks**: Must follow tasks template structure exactly
- **Include all template sections** - do not omit any required sections
- **Reference the loaded templates** - all specification templates were loaded at the beginning

## Error Handling

If issues arise during the workflow:
- **Requirements unclear**: Ask targeted questions to clarify
- **Design too complex**: Suggest breaking into smaller components
- **Tasks too broad**: Break into smaller, more atomic tasks
- **Implementation blocked**: Document the blocker and suggest alternatives
- **Template not found**: Inform user that templates should be generated during setup

## Success Criteria

A successful spec workflow completion includes:
- [x] Complete requirements with user stories and acceptance criteria (using requirements template)
- [x] Comprehensive design with architecture and components (using design template)
- [x] Detailed task breakdown with requirement references (using tasks template)
- [x] All phases explicitly approved by user before proceeding
- [x] Ready for implementation phase

## Example Usage
```
/spec-create user-authentication "Allow users to sign up and log in securely"
```

## Implementation Phase
After completing all phases, inform the user they can:
1. **Execute tasks sequentially**: `/spec-execute {task-id} {feature-name}`
2. **Execute tasks in parallel**: `/spec-execute-parallel {task-ids} {feature-name}`
3. **Track progress**: Use `/spec-status {feature-name}` to monitor progress
