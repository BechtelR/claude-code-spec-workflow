# Spec Execute Parallel Command

Execute multiple tasks simultaneously using multiple agents.

## Usage
```
/spec-execute-parallel <task-id-1> <task-id-2> [task-id-3...] [feature-name]
```

## Overview
**Your Role**: Coordinate parallel execution of independent tasks

This command allows you to execute multiple tasks simultaneously, dramatically reducing implementation time for features with independent components.

## Prerequisites
- Tasks must have `_Parallel: yes_` metadata
- Tasks must not have blocking dependencies
- Tasks must not modify the same files

## Instructions

**Execution Steps**:

**Step 0: Validate Parallel Execution**
For each task, check:

```bash
# Check dependencies for each task
claude-code-spec-workflow get-tasks {feature-name} {task-id-1} --mode check-dependencies
claude-code-spec-workflow get-tasks {feature-name} {task-id-2} --mode check-dependencies
# ... repeat for all tasks
```

**Validation Rules**:
1. **No blocking dependencies**: All tasks must have dependencies satisfied
2. **No file conflicts**: Extract file paths from each task and ensure no overlaps
3. **Parallel capability**: All tasks must have `_Parallel: yes_` in their metadata

**If validation fails:**
- Identify the issue (dependency conflict, file conflict, not parallel-capable)
- Inform user which tasks cannot run together
- Suggest alternative grouping or sequential execution

**If validation passes:**
- Proceed to Step 1

**Step 1: Load Shared Context** (once for all tasks)
```bash
# Load steering documents (if available)
claude-code-spec-workflow get-steering-context

# Load specification context
claude-code-spec-workflow get-spec-context {feature-name}
```

**Step 2: Launch Multiple Agents**
Use the Task tool to launch multiple `spec-task-executor` agents in parallel. **IMPORTANT**: All agents must be launched in a SINGLE message with multiple Task tool calls.

```
I'm launching {N} agents in parallel to execute tasks {task-id-1}, {task-id-2}, ...

[Use Task tool N times in ONE message]
```

For each agent, provide:
```
Use the spec-task-executor agent to implement task {task-id} for the {feature-name} specification.

## Steering Context
[PASTE COMPLETE get-steering-context OUTPUT]

## Specification Context
[PASTE REQUIREMENTS AND DESIGN FROM get-spec-context]

## Task Details
[For this specific task only - load with: claude-code-spec-workflow get-tasks {feature-name} {task-id} --mode single]

## Instructions
- Implement ONLY task {task-id}
- DO NOT start other tasks
- Follow all project conventions and leverage existing code
- Mark task complete using: claude-code-spec-workflow get-tasks {feature-name} {task-id} --mode complete
- Provide completion summary
```

**Step 3: Monitor Completion**
- Track which tasks complete successfully
- Track which tasks encounter errors
- Wait for ALL agents to finish before proceeding

**Step 4: Verify Results**
After all agents complete:
- Check that all tasks were marked complete
- Review any error messages from agents
- Verify no file conflicts occurred
- Confirm all changes integrate properly

## Important Rules
- **MUST launch all agents in single message** - Use multiple Task tool calls in one response
- **ONE task per agent** - Each agent focuses on single task
- **NO cross-task dependencies** - Tasks must be truly independent
- **File isolation** - Tasks must modify different files
- **Context sharing** - Load steering/spec context once, share with all agents
- **Error handling** - If any agent fails, document which task failed and why

## Example Usage

```
/spec-execute-parallel 1 2 3 user-authentication
```

This would execute tasks 1, 2, and 3 from the user-authentication spec in parallel, assuming they:
1. Have no unmet dependencies
2. Modify different files
3. Are marked as `_Parallel: yes_`

## When NOT to Use Parallel Execution
- Tasks have dependencies on each other
- Tasks modify the same files
- Tasks require coordination or sequential ordering
- Tasks are marked `_Parallel: no_`
- You want to review output after each task

In these cases, use `/spec-execute {task-id}` instead.

## Benefits of Parallel Execution
- **Speed**: Multiple tasks complete simultaneously
- **Efficiency**: Better resource utilization
- **Independence**: Proves tasks are truly atomic and independent

## Risks of Parallel Execution
- **Integration issues**: Multiple changes at once can conflict
- **Debugging difficulty**: Harder to identify which agent caused issues
- **Resource intensive**: Multiple Claude instances running