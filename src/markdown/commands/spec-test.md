# Spec Test Command

Test and validate a spec feature implementation using specialized validation agents.

## Usage
```
/spec-test <feature-name> [test-type]
```

## Parameters
- `<feature-name>`: The kebab-case name of the feature to test (required)
- `[test-type]`: Optional test type focus: 'unit', 'integration', 'e2e', 'all', or 'extended' (default: 'all')

**Note**: Examples use `pnpm`. Replace with your project's package manager (npm/yarn/pnpm).

## Description

You are executing comprehensive testing and validation for a feature specification using the spec-validation-gates agent. This ensures that implemented code meets all quality standards through automated testing, type-checking, linting, and comprehensive validation gates.

## When to Use This Command
- **On-demand validation**: Run comprehensive testing whenever needed
- **After task execution**: Validate feature after implementing via `/spec-execute`
- **Before merging/deploying**: Ensure all quality gates pass
- **After significant changes**: Re-validate after major code updates
- **Pre-release validation**: Final quality check before release

## Workflow

### 1. Pre-Test Setup
- Verify feature specification exists in `.claude/specs/{feature-name}/`
- Load specification context for validation scope
- Identify implemented files based on tasks.md
- Determine appropriate test suite based on implementation

### 2. Primary Validation (spec-validation-gates agent)
Use the spec-validation-gates agent to perform quality testing and validation for the {feature-name} feature implementation:

The agent will:
1. **Load Feature Context**:
   ```bash
   # Load specification context
   claude-code-spec-workflow get-spec-context {feature-name}
   ```
   
2. **Identify Test Scope**:
   - Read tasks.md to understand what was implemented
   - Identify all files that were created/modified
   - Determine appropriate test coverage needed
   - Check package.json for available test scripts

3. **Execute Validation Gates**:
   - Run type checking: `pnpm run type-check` or `pnpm run typecheck`
   - Execute linting: `pnpm run lint`
   - Validate builds: `pnpm run build` (if build script exists)
   - Run unit tests: `pnpm run test`
   - Run integration tests: `pnpm run test:integration` (if available)
   - Check for security vulnerabilities: `pnpm audit`

4. **Test Coverage Analysis**:
   - Identify missing test coverage for new code
   - Write missing tests for critical uncovered paths
   - Ensure meaningful test scenarios are covered
   - Validate tests actually test the intended behavior

5. **Iterative Fix Process**:
   - For any failures: analyze, fix, re-test until all pass
   - CRITICAL: DO NOT ignore or skip failing tests
   - Continue iterating until 100% validation gate success
   - Document any persistent issues in `.claude/specs/{feature-name}/.test-reports/{yymmdd}_{test-type}.md`

6. **Final Verification**:
   - Run complete validation suite one final time
   - Verify no regressions were introduced
   - Confirm all quality gates pass
   - Report final validation status

Focus Areas:
- Type safety and TypeScript compliance
- Code quality and linting standards  
- Build integrity
- Test coverage and effectiveness
- Security vulnerability scanning
- Performance impact assessment

If validation fails persistently, document specific issues and recommended solutions.

### 3. Test Report Generation
- Create comprehensive test report in `.claude/specs/{feature-name}/.test-reports/{yymmdd}_{test-type}.md`
- Document all validation results
- Include recommendations for improvements
- Note any skipped or deferred tests with reasoning

## Expected Validation Gates

### Core Quality Gates
- [x] Type checking passes (TypeScript)
- [x] Linting produces no errors
- [x] Code formatting is correct
- [x] Build succeeds without warnings
- [x] Unit tests pass (100% success rate)
- [x] Integration tests pass (if applicable)
- [x] No security vulnerabilities detected

### Feature-Specific Gates
- [x] All implemented tasks verified functional
- [x] API endpoints respond correctly
- [x] Database operations work as expected
- [x] Authentication/authorization enforced
- [x] Error handling implemented properly
- [x] Performance within acceptable limits

## Test Types

### Unit Tests (`test-type: unit`)
Focus on individual components and functions:
- Function logic validation
- Component behavior testing
- Mock external dependencies
- Edge case handling

### Integration Tests (`test-type: integration`)
Test component interactions:
- API endpoint functionality
- Database operations
- Service integrations
- Authentication flows

### End-to-End Tests (`test-type: e2e`)
Full workflow validation:
- Complete user journeys
- Cross-component workflows
- Real environment testing
- UI/UX validation

### All Tests (`test-type: all`, default)
Comprehensive validation including all test types (unit, integration, e2e) plus:
- Security scanning
- Performance benchmarking
- Code coverage analysis
- Documentation validation

### Extended Tests (`test-type: extended`)
Maximum validation beyond 'all' tests, including:

**Integration Point Testing**:
- Verify proper integration with existing systems
- Test API endpoints and data flow
- Validate authentication and authorization
- Check database migrations and queries

**End-to-End Scenario Testing**:
- Test complete user workflows
- Validate error handling paths
- Check edge cases and boundary conditions
- Verify proper state management

**Code Quality Assessment**:
- Review code against project standards
- Check for proper error handling
- Validate logging and monitoring
- Ensure security best practices

**Documentation Validation**:
- Verify code is self-documenting
- Check that complex logic has appropriate comments
- Validate API documentation accuracy
- Ensure README updates if needed

**Note**: Uses general-purpose agent for supplementary validation beyond spec-validation-gates

## Success Criteria

A feature passes validation when:
- All automated tests pass (100% success rate)
- Code coverage meets project standards (>90%)
- No linting errors or warnings
- Build completes successfully
- Security vulnerabilities resolved
- Performance benchmarks met
- Integration points verified

## Error Handling

If validation fails:
1. **Analyze Failures**: Review error messages and logs
2. **Iterative Fixes**: Fix issues one at a time
3. **Re-test**: Verify each fix with targeted re-testing
4. **Document Issues**: Log persistent problems in test reports
5. **Escalate if Needed**: Inform user of blocking issues

## Example Usage

```bash
# Test all aspects of user authentication (default: all tests)
/spec-test user-authentication

# Focus only on unit tests
/spec-test user-authentication unit

# Run integration tests specifically
/spec-test user-authentication integration

# Full end-to-end validation
/spec-test payment-processing e2e

# Maximum validation with extended criteria
/spec-test payment-processing extended
```

## Notes

- This command should be run after implementing tasks from a specification
- Requires the feature specification to exist in `.claude/specs/{feature-name}/`
- Uses spec-validation-gates agent as primary validator
- Creates detailed test reports for tracking and debugging
- Follows the spec-validation-gates agent's iterative fix process
- Will continue testing and fixing until all quality gates pass