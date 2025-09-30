/**
 * Task verification utilities
 * Verifies that tasks were actually completed by checking file modifications
 */

import { existsSync, statSync } from 'fs';
import { TaskInfo } from './get-tasks';

export interface VerificationResult {
  autoVerified: boolean;
  issues: string[];
  warnings: string[];
  needsManualConfirm: boolean;
  filesChecked: string[];
  filesModified: string[];
  filesMissing: string[];
}

/**
 * Extract file paths from task description and details
 * Looks for patterns like:
 * - File: path/to/file.ts
 * - Files: path/to/file1.ts, path/to/file2.ts
 * - src/path/to/file.ts (inline mentions)
 */
export function extractFilePaths(text: string): string[] {
  const paths: string[] = [];

  // Pattern 1: "File:" or "Files:" prefix
  const filePrefix = /(?:Files?|Modify|Create|Update):\s*([^\n]+)/gi;
  let match;
  while ((match = filePrefix.exec(text)) !== null) {
    const pathsText = match[1];
    // Split by commas and clean up
    const extracted = pathsText
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0 && !p.startsWith('-'));
    paths.push(...extracted);
  }

  // Pattern 2: Inline file paths (src/..., tests/..., etc.)
  const inlinePaths = /(?:^|\s)((?:src|tests?|lib|dist|components?|utils?|services?|models?|api|routes?)\/[a-zA-Z0-9_\-/.]+\.(?:ts|js|tsx|jsx|py|java|go|rs|cpp|c|h))/gi;
  while ((match = inlinePaths.exec(text)) !== null) {
    if (match[1]) {
      paths.push(match[1].trim());
    }
  }

  // Deduplicate and return
  return Array.from(new Set(paths));
}

/**
 * Verify that a task was completed
 * Checks:
 * 1. Mentioned files exist
 * 2. Files were modified recently (within specified time window)
 * 3. At least some files show recent activity
 */
export function verifyTaskCompletion(
  task: TaskInfo,
  maxAgeMs: number = 3600000 // Default: 1 hour
): VerificationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const filesChecked: string[] = [];
  const filesModified: string[] = [];
  const filesMissing: string[] = [];

  // Extract file paths from task description and details
  const taskText = [
    task.description,
    ...(task.details || [])
  ].join('\n');

  const filePaths = extractFilePaths(taskText);

  if (filePaths.length === 0) {
    warnings.push('No file paths found in task description - cannot auto-verify');
    return {
      autoVerified: false,
      issues,
      warnings,
      needsManualConfirm: true,
      filesChecked,
      filesModified,
      filesMissing
    };
  }

  const now = Date.now();

  // Check each file
  for (const filePath of filePaths) {
    filesChecked.push(filePath);

    // Check if file exists
    if (!existsSync(filePath)) {
      filesMissing.push(filePath);
      issues.push(`File not found: ${filePath}`);
      continue;
    }

    // Check modification time
    try {
      const stats = statSync(filePath);
      const ageMs = now - stats.mtimeMs;

      if (ageMs < maxAgeMs) {
        filesModified.push(filePath);
      }
    } catch (error) {
      warnings.push(`Could not check modification time for: ${filePath}`);
    }
  }

  // Determine verification status
  const autoVerified = filesMissing.length === 0 && filesModified.length > 0;

  if (filesMissing.length > 0) {
    issues.push(`${filesMissing.length} file(s) not found - task may not be complete`);
  }

  if (filesModified.length === 0 && filesMissing.length === 0) {
    warnings.push(`No files modified recently (within ${Math.floor(maxAgeMs / 60000)} minutes) - task may have been completed earlier or files not changed`);
  }

  return {
    autoVerified,
    issues,
    warnings,
    needsManualConfirm: !autoVerified || warnings.length > 0,
    filesChecked,
    filesModified,
    filesMissing
  };
}

/**
 * Format verification result for display
 */
export function formatVerificationResult(result: VerificationResult): string {
  const lines: string[] = [];

  lines.push('## Task Verification Result\n');

  if (result.autoVerified) {
    lines.push('✓ Auto-verification: PASSED\n');
  } else {
    lines.push('✗ Auto-verification: FAILED\n');
  }

  lines.push(`Files checked: ${result.filesChecked.length}`);
  lines.push(`Files modified recently: ${result.filesModified.length}`);
  lines.push(`Files missing: ${result.filesMissing.length}\n`);

  if (result.issues.length > 0) {
    lines.push('### Issues:');
    result.issues.forEach(issue => lines.push(`- ${issue}`));
    lines.push('');
  }

  if (result.warnings.length > 0) {
    lines.push('### Warnings:');
    result.warnings.forEach(warning => lines.push(`- ${warning}`));
    lines.push('');
  }

  if (result.filesModified.length > 0) {
    lines.push('### Recently Modified Files:');
    result.filesModified.forEach(file => lines.push(`- ${file}`));
    lines.push('');
  }

  if (result.filesMissing.length > 0) {
    lines.push('### Missing Files:');
    result.filesMissing.forEach(file => lines.push(`- ${file}`));
    lines.push('');
  }

  if (result.needsManualConfirm) {
    lines.push('⚠️  Manual confirmation required');
    lines.push('Please review the task implementation and confirm completion.');
  }

  return lines.join('\n');
}