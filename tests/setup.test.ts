import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { SpecWorkflowSetup } from '../src/setup';

describe('SpecWorkflowSetup', () => {
  let tempDir: string;
  let setup: SpecWorkflowSetup;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(join(tmpdir(), 'claude-spec-test-'));
    setup = new SpecWorkflowSetup(tempDir); // Agents are now mandatory by default
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('should create directory structure', async () => {
    await setup.setupDirectories();

    const claudeDir = join(tempDir, '.claude');
    const commandsDir = join(claudeDir, 'commands');
    const specsDir = join(claudeDir, 'specs');
    const templatesDir = join(claudeDir, 'templates');
    const steeringDir = join(claudeDir, 'steering');

    await expect(fs.access(claudeDir)).resolves.not.toThrow();
    await expect(fs.access(commandsDir)).resolves.not.toThrow();
    await expect(fs.access(specsDir)).resolves.not.toThrow();
    await expect(fs.access(templatesDir)).resolves.not.toThrow();
    await expect(fs.access(steeringDir)).resolves.not.toThrow();
  });

  test('should detect existing claude directory', async () => {
    expect(await setup.claudeDirectoryExists()).toBe(false);

    await setup.setupDirectories();

    expect(await setup.claudeDirectoryExists()).toBe(true);
  });

  test('should create slash commands', async () => {
    await setup.setupDirectories();
    await setup.createSlashCommands();

    const commandsDir = join(tempDir, '.claude', 'commands');
    const expectedCommands = [
      'spec-create.md',
      'spec-execute.md',
      'spec-execute-parallel.md',
      'spec-status.md',
      'spec-list.md',
      'spec-steering-setup.md',
      'bug-create.md',
      'bug-analyze.md',
      'bug-fix.md',
      'bug-verify.md',
      'bug-status.md'
    ];

    for (const command of expectedCommands) {
      const commandPath = join(commandsDir, command);
      await expect(fs.access(commandPath)).resolves.not.toThrow();

      const content = await fs.readFile(commandPath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);
      // Each command should have a header (either "# Spec" or "# Bug")
      const hasHeader = content.includes('# Spec') || content.includes('# Bug');
      expect(hasHeader).toBe(true);
    }
  });

  test('should create templates', async () => {
    await setup.setupDirectories();
    await setup.createTemplates();

    const templatesDir = join(tempDir, '.claude', 'templates');
    const expectedTemplates = [
      'requirements-template.md',
      'design-template.md',
      'tasks-template.md'
    ];

    for (const template of expectedTemplates) {
      const templatePath = join(templatesDir, template);
      await expect(fs.access(templatePath)).resolves.not.toThrow();

      const content = await fs.readFile(templatePath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);
    }
  });

  // NOTE: Scripts test removed in v1.2.5 - task command generation now uses NPX command

  // Config file creation removed - no longer part of setup process
  test.skip('should create config file', async () => {
    // This functionality has been removed from the setup process
  });

  // CLAUDE.md creation removed in newer versions - all workflow instructions now in individual commands
  test.skip('should create CLAUDE.md', async () => {
    // This test is skipped as CLAUDE.md is no longer created
    // All workflow instructions are now in individual command files
  });

  test('should run complete setup', async () => {
    await setup.runSetup();

    // Check that all components were created
    const claudeDir = join(tempDir, '.claude');
    const commandsDir = join(claudeDir, 'commands');
    const templatesDir = join(claudeDir, 'templates');
    const agentsDir = join(claudeDir, 'agents');

    await expect(fs.access(claudeDir)).resolves.not.toThrow();
    await expect(fs.access(commandsDir)).resolves.not.toThrow();
    await expect(fs.access(templatesDir)).resolves.not.toThrow();
    await expect(fs.access(agentsDir)).resolves.not.toThrow();

    // Check that at least one command file exists
    const specCreatePath = join(commandsDir, 'spec-create.md');
    await expect(fs.access(specCreatePath)).resolves.not.toThrow();

    // Check that at least one template exists
    const reqTemplatePath = join(templatesDir, 'requirements-template.md');
    await expect(fs.access(reqTemplatePath)).resolves.not.toThrow();

    // Check that at least one agent exists
    const taskExecutorPath = join(agentsDir, 'spec-task-executor.md');
    await expect(fs.access(taskExecutorPath)).resolves.not.toThrow();
  });

  // CLAUDE.md handling removed - no longer part of setup
  test.skip('should handle existing CLAUDE.md', async () => {
    // This functionality has been removed - CLAUDE.md is no longer created or modified
  });
});