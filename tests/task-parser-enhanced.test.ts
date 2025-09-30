import { parseAllTasksFromMarkdown, checkTaskDependencies, TaskInfo } from '../src/get-tasks';

describe('Enhanced Task Parser', () => {
  describe('parseAllTasksFromMarkdown with metadata', () => {
    test('should parse dependencies and parallel flags', () => {
      const content = `
- [ ] 1. Task one
  - _Requirements: 1.1_
  - _Depends: none_
  - _Parallel: yes_

- [ ] 2. Task two
  - _Requirements: 2.1_
  - _Depends: 1_
  - _Parallel: no_

- [x] 3. Task three (completed)
  - _Requirements: 3.1_
  - _Depends: 1, 2_
  - _Parallel: yes_
      `;

      const tasks = parseAllTasksFromMarkdown(content);

      expect(tasks).toHaveLength(3);

      // Task 1
      expect(tasks[0].dependsOn).toEqual([]);
      expect(tasks[0].canRunParallel).toBe(true);
      expect(tasks[0].completed).toBe(false);
      expect(tasks[0].level).toBe(0);

      // Task 2
      expect(tasks[1].dependsOn).toEqual(['1']);
      expect(tasks[1].canRunParallel).toBe(false);
      expect(tasks[1].completed).toBe(false);

      // Task 3 - even though task 3 is marked complete, blockedBy is calculated
      // based on current state: task 1 and 2 are incomplete so task 3 is blocked
      expect(tasks[2].dependsOn).toEqual(['1', '2']);
      expect(tasks[2].canRunParallel).toBe(true);
      expect(tasks[2].completed).toBe(true);
      expect(tasks[2].blockedBy).toEqual(['1', '2']); // Both deps incomplete
    });

    test('should calculate hierarchical structure', () => {
      const content = `
- [ ] 1. Top level
  - _Requirements: 1.1_
  - _Depends: none_
  - _Parallel: yes_

- [ ] 1.1 Second level
  - _Requirements: 1.2_
  - _Depends: 1_
  - _Parallel: no_

- [ ] 1.1.1 Third level
  - _Requirements: 1.3_
  - _Depends: 1.1_
  - _Parallel: no_
      `;

      const tasks = parseAllTasksFromMarkdown(content);

      expect(tasks).toHaveLength(3);

      // Top level
      expect(tasks[0].level).toBe(0);
      expect(tasks[0].parentId).toBeUndefined();

      // Second level
      expect(tasks[1].level).toBe(1);
      expect(tasks[1].parentId).toBe('1');

      // Third level
      expect(tasks[2].level).toBe(2);
      expect(tasks[2].parentId).toBe('1.1');
    });

    test('should calculate blockedBy for incomplete dependencies', () => {
      const content = `
- [ ] 1. Task one
  - _Requirements: 1.1_
  - _Depends: none_
  - _Parallel: yes_

- [ ] 2. Task two
  - _Requirements: 2.1_
  - _Depends: 1_
  - _Parallel: no_

- [ ] 3. Task three
  - _Requirements: 3.1_
  - _Depends: 1, 2_
  - _Parallel: no_
      `;

      const tasks = parseAllTasksFromMarkdown(content);

      // All tasks pending, so 2 and 3 are blocked
      expect(tasks[0].blockedBy).toBeUndefined();
      expect(tasks[1].blockedBy).toEqual(['1']);
      expect(tasks[2].blockedBy).toEqual(['1', '2']);
    });

    test('should handle completed tasks not blocking', () => {
      const content = `
- [x] 1. Task one (done)
  - _Requirements: 1.1_
  - _Depends: none_
  - _Parallel: yes_

- [ ] 2. Task two
  - _Requirements: 2.1_
  - _Depends: 1_
  - _Parallel: no_
      `;

      const tasks = parseAllTasksFromMarkdown(content);

      // Task 1 complete, so task 2 not blocked
      expect(tasks[1].blockedBy).toBeUndefined();
    });
  });

  describe('checkTaskDependencies', () => {
    test('should allow execution when no dependencies', () => {
      const task: TaskInfo = {
        id: '1',
        description: 'Test',
        completed: false,
        dependsOn: [],
        canRunParallel: true,
        level: 0,
        details: []
      };

      const result = checkTaskDependencies(task, [task]);

      expect(result.canExecute).toBe(true);
      expect(result.blockedBy).toEqual([]);
    });

    test('should block when dependencies incomplete', () => {
      const task1: TaskInfo = {
        id: '1',
        description: 'First',
        completed: false,
        dependsOn: [],
        canRunParallel: true,
        level: 0,
        details: []
      };

      const task2: TaskInfo = {
        id: '2',
        description: 'Second',
        completed: false,
        dependsOn: ['1'],
        canRunParallel: false,
        level: 0,
        details: []
      };

      const result = checkTaskDependencies(task2, [task1, task2]);

      expect(result.canExecute).toBe(false);
      expect(result.blockedBy).toEqual(['1']);
      expect(result.message).toContain('Waiting for tasks 1');
    });

    test('should allow execution when dependencies complete', () => {
      const task1: TaskInfo = {
        id: '1',
        description: 'First',
        completed: true,
        dependsOn: [],
        canRunParallel: true,
        level: 0,
        details: []
      };

      const task2: TaskInfo = {
        id: '2',
        description: 'Second',
        completed: false,
        dependsOn: ['1'],
        canRunParallel: false,
        level: 0,
        details: []
      };

      const result = checkTaskDependencies(task2, [task1, task2]);

      expect(result.canExecute).toBe(true);
      expect(result.blockedBy).toEqual([]);
    });

    test('should detect missing dependency tasks', () => {
      const task: TaskInfo = {
        id: '2',
        description: 'Second',
        completed: false,
        dependsOn: ['99'], // Non-existent task
        canRunParallel: false,
        level: 0,
        details: []
      };

      const result = checkTaskDependencies(task, [task]);

      expect(result.canExecute).toBe(false);
      expect(result.blockedBy).toEqual(['99']);
      expect(result.message).toContain('Referenced tasks not found');
    });
  });
});