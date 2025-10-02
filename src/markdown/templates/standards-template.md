# Engineering Standards

## Philosophy
**"Start simple, stay simple"** - Complexity is only added to solve proven problems, not potential ones.

## Core Principles

### 1. SIMPLICITY FIRST
- Always ask: "What is the simplest solution that solves TODAY'S problem?"
- Avoid premature optimization
- Edge cases should NOT drive architecture
- Build for the common case (95%), adapt for edge cases (5%)

### 2. DRY (Don't Repeat Yourself)
- Single source of truth for all data/logic/types
- Define once, reference everywhere
- No copy-paste programming
- Abstract only after third occurrence (Rule of Three)

### 3. EXPLICIT OVER CLEVER
- Clear, readable code over clever abstractions
- Direct implementations over unnecessary indirection
- Self-documenting code with meaningful names
- Comments explain "why", code shows "what"

## Implementation Rules

### Avoid These Patterns
❌ Abstraction for single use cases (need 3+ real implementations)
❌ Deep inheritance chains (max 2 levels)
❌ 'any' type usage (use explicit typing or 'unknown')
❌ Hardcoded configuration (use environment/config files)
❌ Premature optimization without metrics

### Prefer These Patterns
✅ Direct function calls over unnecessary indirection
✅ Simple objects/functions over complex abstractions
✅ Explicit code over clever abstractions
✅ Composition over deep inheritance
✅ Native types internally (Date, number, boolean)

## Code Examples

### Simplicity Example
```typescript
// ❌ BAD - Over-engineered for single use
class DataProcessorFactory {
  createProcessor(type: string): IProcessor {
    // 100+ lines for one type
  }
}

// ✅ GOOD - Simple and direct
function processData(data: Data): Result {
  return transform(data);
}
```

### Type Safety Example
```typescript
// ❌ BAD - Using 'any'
function process(data: any): any {
  return data.value;
}

// ✅ GOOD - Explicit typing
function process<T extends { value: string }>(data: T): string {
  return data.value;
}
```

### Configuration Example
```typescript
// ❌ BAD - Hardcoded values
const API_URL = 'http://localhost:3000';
const PORT = 8080;

// ✅ GOOD - Environment/config based
const API_URL = process.env.API_URL || config.apiUrl;
const PORT = Number(process.env.PORT) || config.port;
```

## Testing Standards

### Test Coverage
- Unit tests for business logic
- Integration tests for system interactions
- End-to-end tests for critical user flows
- Aim for >80% coverage on new code

### Test Quality
- Tests should be readable and maintainable
- One assertion per test (when practical)
- Clear test names describing behavior
- Mock external dependencies appropriately

## Code Review Standards

### Required Checks
- [ ] Code follows project standards
- [ ] Tests are included and passing
- [ ] No hardcoded configuration values
- [ ] Type safety maintained (no 'any')
- [ ] Documentation updated if needed

### Review Focus
- Architecture and design decisions
- Error handling and edge cases
- Performance implications
- Security considerations

## Quick Reference

### Common Violations
- Creating abstractions for <3 implementations
- Not using strict TypeScript patterns
- Using 'any' instead of proper typing
- Hardcoded configuration in code
- Deep inheritance (>2 levels)
- Premature optimization

### Best Practices
- Start with the simplest solution
- Prefer composition over inheritance
- Keep functions small and focused
- Use meaningful variable names
- Write self-documenting code
- Test edge cases appropriately

## Project-Specific Rules

[Add any project-specific coding standards, conventions, or requirements here]

### Coding Style
- [Indentation, spacing, line length preferences]
- [Naming conventions for files, classes, functions]
- [Import organization patterns]

### Architecture Patterns
- [Preferred design patterns for this project]
- [File organization standards]
- [Module structure guidelines]

### Technology-Specific
- [Framework-specific best practices]
- [Library usage guidelines]
- [API design standards]
