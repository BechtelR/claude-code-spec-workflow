# Project Structure
*Version: 1.2510.1.0*

## Directory Organization

### Source Code (`src/`)
```
src/
├── index.ts                  # Main barrel export
├── cli.ts                    # CLI entry point
├── setup.ts                  # Core setup orchestration
├── update.ts                 # Update existing installations
├── auto-update.ts            # Auto-detection and migration
├── commands.ts               # Slash command definitions
├── steering.ts               # Steering document management
├── task-generator.ts         # Task command generation (deprecated)
├── task-verification.ts      # Task execution validation
├── utils.ts                  # Shared utilities
├── git.ts                    # Git integration
├── file-cache.ts             # Session-based file caching
├── get-steering-context.ts   # Optimized steering doc loading
├── get-spec-context.ts       # Optimized spec doc loading
├── get-template-context.ts   # Optimized template loading
├── get-content.ts            # Individual file loading
├── get-tasks.ts              # Task extraction utilities
└── dashboard/                # Unified dashboard subsystem
    ├── cli.ts                # Dashboard CLI entry
    ├── multi-server.ts       # Main server (handles all projects)
    ├── watcher.ts            # File system monitoring
    ├── parser.ts             # Spec file parsing
    ├── logger.ts             # Logging utilities
    ├── project-discovery.ts  # Auto-discovers projects
    ├── index.html            # Main dashboard interface
    ├── client/               # TypeScript frontend
    │   ├── multi-app.ts      # Main application logic
    │   ├── websocket.ts      # WebSocket communication
    │   ├── shared-components.ts  # Reusable UI components
    │   ├── tsconfig.json     # Frontend TypeScript config
    │   └── types/            # Frontend type definitions
    │       ├── index.ts      # Core dashboard types
    │       ├── validation.ts # Runtime validation
    │       └── petite-vue.d.ts  # Petite-vue types
    ├── shared/               # Shared types (backend + frontend)
    │   └── dashboard.types.ts
    └── tunnel/               # Dashboard tunnel subsystem
        ├── index.ts          # Tunnel exports
        ├── manager.ts        # Tunnel lifecycle management
        ├── types.ts          # Tunnel type definitions
        ├── access-controller.ts    # Password protection
        ├── usage-tracker.ts        # Analytics tracking
        ├── error-handler.ts        # Error management
        ├── cloudflare-provider.ts  # Cloudflare implementation
        ├── cloudflare-provider-native.ts
        ├── ngrok-provider.ts       # ngrok implementation
        └── ngrok-provider-native.ts
```

### Generated Structure (`.claude/`)
```
.claude/
├── steering/               # Persistent project context
│   ├── .archive/          # Archived versions (YYMMDD or version)
│   │   └── 251002/        # Example: Oct 2, 2025 archive
│   │       ├── product.md (DEPRECATED)
│   │       ├── tech.md (DEPRECATED)
│   │       ├── structure.md (DEPRECATED)
│   │       └── standards.md (DEPRECATED)
│   ├── product.md         # Product vision and strategy
│   ├── tech.md            # Technical standards and stack
│   ├── structure.md       # Project conventions
│   └── standards.md       # Engineering standards
├── specs/                 # Feature specifications
│   └── {feature}/         # Per-feature directory
│       ├── requirements.md
│       ├── design.md
│       └── tasks.md
├── bugs/                  # Bug fix workflows
│   └── {bug}/             # Per-bug directory
│       ├── report.md
│       ├── analysis.md
│       ├── solution.md
│       └── verification.md
├── commands/              # Slash commands
│   ├── spec-create.md
│   ├── spec-update.md
│   ├── spec-steering-setup.md
│   ├── spec-steering-update.md
│   ├── spec-tasks-rebuild.md
│   ├── spec-execute.md
│   ├── spec-execute-parallel.md
│   ├── spec-status.md
│   ├── spec-list.md
│   ├── bug-create.md
│   ├── bug-analyze.md
│   ├── bug-fix.md
│   ├── bug-verify.md
│   └── bug-status.md
├── agents/                # AI agent definitions
│   ├── spec-task-executor.md
│   ├── spec-requirements-validator.md
│   ├── spec-design-validator.md
│   ├── spec-task-validator.md
│   ├── spec-type-checker.md
│   └── spec-validation-gates.md
├── templates/             # Document templates
│   ├── requirements-template.md
│   ├── design-template.md
│   ├── tasks-template.md
│   ├── product-template.md
│   ├── tech-template.md
│   ├── structure-template.md
│   ├── standards-template.md
│   ├── bug-report-template.md
│   ├── bug-analysis-template.md
│   └── bug-verification-template.md
├── spec-config.json       # Workflow configuration
└── settings.local.json    # Local user settings
```

### Build Outputs (`dist/`)
```
dist/
├── index.js               # Compiled barrel export
├── cli.js                 # CLI entry point (executable)
├── setup.js
├── update.js
├── commands.js
├── steering.js
├── utils.js
├── git.js
├── *.d.ts                 # Type declarations
├── *.js.map               # Source maps
└── dashboard/             # Dashboard files
    ├── cli.js             # Dashboard CLI (executable)
    ├── multi-server.js
    ├── watcher.js
    ├── parser.js
    ├── index.html
    ├── app.js             # Frontend bundle
    ├── app.js.map
    └── tunnel/
```

## Naming Conventions

### Files
- **TypeScript**: Kebab-case (e.g., `get-steering-context.ts`, `multi-server.ts`)
- **Markdown**: Kebab-case with clear purpose (e.g., `requirements-template.md`, `spec-create.md`)
- **Configuration**: Standard names (e.g., `package.json`, `tsconfig.json`, `spec-config.json`)
- **Generated**: Feature-based naming (e.g., `user-auth/requirements.md`)

### Code
- **Classes**: PascalCase (e.g., `SpecWorkflowSetup`, `SteeringLoader`)
- **Interfaces**: PascalCase, `I` prefix optional (e.g., `SteeringDocuments`, `TunnelProvider`)
- **Types**: PascalCase (e.g., `WebSocketMessage`, `TaskStatus`)
- **Functions**: camelCase (e.g., `parseTasksFromMarkdown`, `loadSteeringDocuments`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `DEFAULT_PORT`, `MAX_RETRIES`)
- **Variables**: camelCase (e.g., `projectPath`, `steeringDocs`)

### Exports
- Named exports preferred over default exports
- Barrel exports from index.ts
- Re-export related items together
- Public API clearly defined in main index.ts

## Import Patterns

### Standard Order
1. Node.js built-ins (e.g., `fs`, `path`)
2. External dependencies (e.g., `chalk`, `fastify`)
3. Internal modules (e.g., `./parser`, `./utils`)
4. Types/interfaces (e.g., `import type { Task }`)
5. Constants (if separate from modules)

### Example
```typescript
import { promises as fs } from 'fs';
import { join } from 'path';

import chalk from 'chalk';
import { FastifyInstance } from 'fastify';

import { SpecParser } from './parser';
import { SteeringLoader } from './steering';

import type { Task, SteeringDocuments } from './types';
```

### Import Rules (ESLint)
- Newlines between import groups
- Alphabetized within groups (case-insensitive)
- No duplicate imports
- Newline after import block

## Module Boundaries

### Core Modules
- **setup.ts**: Orchestrates entire setup process (installation, migration)
- **update.ts**: Updates existing installations (preserves customizations)
- **auto-update.ts**: Auto-detection and migration logic
- **commands.ts**: Defines all slash commands (metadata only, content in markdown)
- **steering.ts**: Manages steering documents (loading, validation)
- **task-verification.ts**: Task execution validation and completion tracking

### Context Optimization System
- **get-steering-context.ts**: Bulk load all steering documents
- **get-spec-context.ts**: Bulk load specification documents
- **get-template-context.ts**: Bulk load templates by category
- **file-cache.ts**: Session-based caching with change detection
- **get-content.ts**: Fallback individual file loading
- **Pattern**: Main agents load bulk context, sub-agents receive selectively

### Dashboard Subsystem (Unified)
- Self-contained in `dashboard/` directory
- Single unified dashboard handles all scenarios
- Multi-project dashboard (`multi-server.ts`) is the ONLY active implementation
- Automatically discovers and monitors all projects with `.claude` directories
- WebSocket support for real-time updates across all projects
- TypeScript frontend with strict type safety

### Tunnel Subsystem
- Self-contained in `dashboard/tunnel/` directory
- Provider pattern with automatic fallback
- Cloudflare and ngrok implementations
- Access control and usage tracking
- Error handling and recovery

### Shared Utilities
- **utils.ts**: Generic helper functions (no business logic)
- **git.ts**: Git-specific operations (branch, commit, status)
- Pure functions preferred
- No side effects in utilities

### Template System
- **Deprecated**: `templates.ts` (function-based generation)
- **Active**: `.claude/templates/*.md` files (single source of truth)
- **Migration**: All templates converted to Markdown
- **Usage**: Direct file reading, no code generation

### Deprecated Modules
- **task-generator.ts**: Auto-generated task commands (removed for simplification)
- **scripts.ts**: Script generation (deprecated)
- **claude-md.ts**: CLAUDE.md content (workflow instructions now in commands)

## Testing Structure

```
tests/
├── setup.test.ts           # Setup orchestration tests
├── commands.test.ts        # Command generation tests
├── steering.test.ts        # Steering document tests
├── utils.test.ts           # Utility function tests
├── task-verification.test.ts  # Task validation tests
├── pattern-consistency.test.ts  # Pattern enforcement
└── dashboard/              # Dashboard-specific tests
    ├── parser.test.ts
    ├── watcher.test.ts
    └── tunnel/
        ├── manager.test.ts
        └── providers.test.ts
```

### Test Conventions
- Test files match source files (`foo.ts` → `foo.test.ts`)
- `describe` blocks for logical grouping
- Clear test names explaining behavior (not implementation)
- Arrange-Act-Assert pattern
- One assertion per test (when practical)
- Mock external dependencies appropriately

## Configuration Files

### Root Level
- **package.json**: Package metadata, dependencies, scripts
- **tsconfig.json**: TypeScript configuration (backend)
- **jest.config.js**: Test configuration
- **esbuild.config.js**: Frontend bundling configuration
- **.eslintrc.js**: Linting rules
- **.prettierrc**: Formatting rules
- **.gitignore**: Version control exclusions
- **.npmignore**: Package exclusions

### Frontend Configuration
- **src/dashboard/client/tsconfig.json**: Frontend TypeScript config
  - Extends root tsconfig
  - Browser environment
  - Stricter null checks

### Generated Configuration
- **.claude/spec-config.json**: Workflow configuration
  - Version tracking
  - Feature flags
  - No user-specific settings
- **.claude/settings.local.json**: Local user settings
  - Git-ignored
  - User preferences

## Build Outputs

### Distribution (`dist/`)
- Mirrors source structure
- Includes source maps for debugging
- CommonJS format for Node.js
- Dashboard static files copied
- Frontend bundle (app.js) included

### Package Contents (npm)
- Compiled JavaScript only (no source TypeScript)
- Type declarations (.d.ts files)
- README and LICENSE
- CHANGELOG for version history
- Dashboard static files
- Templates and command markdown files

### Excluded from Package
- Source TypeScript files
- Tests
- Development configuration
- node_modules
- Local settings

## Best Practices

### File Size
- Keep files under 300 lines (guideline, not strict rule)
- Extract complex logic to separate modules
- One primary export per file
- Group related functionality

### Dependencies
- Minimize external dependencies (currently 12 production deps)
- Pin versions for stability
- Regular security updates
- Document why each dependency is needed

### Documentation
- **JSDoc** for all public APIs and exported functions
- **Inline comments** for complex logic explaining "why"
- **README** in key directories for subsystems
- **Examples** in documentation and comments

### Error Handling
- Use Result<T> pattern for expected errors
- Throw exceptions for unexpected errors
- Provide helpful error messages
- Log errors with context

### Migration & Updates
- **Backup before changes**: Archive to `.claude/steering/.archive/{YYMMDD}/`
- **Mark deprecated**: Add `(DEPRECATED)` to archived documents
- **Preserve customizations**: Never overwrite user-modified files
- **Migration strategy**: Auto-detect and migrate existing installations

## Feature Organization

### Adding New Features
1. **Commands**: Add markdown file to `.claude/commands/{feature}.md`
2. **Agents**: Add agent definition to `.claude/agents/{agent-name}.md`
3. **Templates**: Add template to `.claude/templates/{template-name}.md`
4. **Source**: Add TypeScript file to `src/{feature}.ts` (kebab-case)
5. **Tests**: Add test file to `tests/{feature}.test.ts`

### Adding Dashboard Features
1. **Backend**: Modify `src/dashboard/multi-server.ts` for API endpoints
2. **Frontend**: Add logic to `src/dashboard/client/multi-app.ts`
3. **Types**: Update `src/dashboard/shared/dashboard.types.ts`
4. **WebSocket**: Add message types for real-time updates

### Adding Tunnel Providers
1. **Provider**: Implement in `src/dashboard/tunnel/{provider}-provider.ts`
2. **Types**: Extend `TunnelProvider` interface
3. **Manager**: Register in `src/dashboard/tunnel/manager.ts`
4. **Fallback**: Add to automatic fallback chain

## Code Organization Principles

### Module Cohesion
- Group related functionality together
- Separate concerns (CLI, business logic, utilities)
- Clear module boundaries
- Minimal coupling between modules

### Type Organization
- Shared types in dedicated files (e.g., `dashboard.types.ts`)
- Local types defined near usage
- Export types from index.ts for public API
- Use discriminated unions for complex states

### State Management
- Minimize mutable state
- Use immutable patterns where possible
- Clear ownership of state (who can modify)
- Reactive state in frontend (Petite-vue)

### Asynchronous Patterns
- Async/await for asynchronous operations
- Promise.all for parallel operations
- Error handling with try-catch
- Timeout handling for external services
