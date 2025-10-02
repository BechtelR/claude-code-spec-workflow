/**
 * Template functions have been removed as they duplicated content from src/markdown/templates/*.md files.
 *
 * The markdown template files in src/markdown/templates/ are now the single source of truth.
 * During setup/update, these files are copied directly to .claude/templates/ without modification.
 *
 * Historical note: This file previously exported template generation functions (getRequirementsTemplate,
 * getDesignTemplate, etc.) but these were never actually used in the codebase - the setup process
 * has always read directly from the markdown files.
 *
 * If you need to modify templates, edit the files in src/markdown/templates/ directly.
 */

/**
 * List of available template files in src/markdown/templates/
 * These files are copied to .claude/templates/ during setup
 */
export const AVAILABLE_TEMPLATES = [
  'requirements-template.md',
  'design-template.md',
  'tasks-template.md',
  'product-template.md',
  'tech-template.md',
  'structure-template.md',
  'standards-template.md',
  'bug-report-template.md',
  'bug-analysis-template.md',
  'bug-verification-template.md',
];
