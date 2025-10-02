# Engineering Standards
*Version: 2.2508.2.0*

## Philosophy
**"Start simple, stay simple"** - Complexity is only added to solve proven problems, not potential ones.

## ⚠️ STOP OVER-ENGINEERING

**You're over-engineering if:**
1. Creating abstractions/patterns for <3 real implementations that exist TODAY
2. Optimizing for edge cases (5%) over common cases (95%)
3. Adding ANY indirection "just in case"

**DEFAULT: Use simple functions and objects. Period.**

Edge cases should NOT drive architecture. Build for the common case, adapt for edge cases.

## A. Core Principles

### 1. SIMPLICITY IS ELEGANT
   a. **Ask the question**: "What is the simplest solution that solves TODAY'S problem?"
   b. **Occam's Razor**: The simplest solution is usually correct
   c. **Start simple, optimize only when measured**: No premature optimization
   d. **Edge cases**: Don't let 5% cases complicate 95% of code

### 2. DRY (Don't Repeat Yourself) - SINGLE SOURCE OF TRUTH
   a. Define once, reference everywhere
   b. **CRITICAL**: Single source of truth for all data/logic/types
   c. No copy-paste programming
   d. **Rule of three**: Abstract only after third occurrence
   e. **ZERO TOLERANCE**: Type duplicates are VIOLATIONS
   f. **Configuration NEVER in code**: All config from single source files yaml/json/etc.
      - Hardcoded URLs, ports, routes, config variables = VIOLATIONS
      - Use: .env, config files, or config service
      - Exception only for true constants (like mathematical values)

### 3. MODEL-FIRST PROGRAMMING (MFP)
   a. Data models define behavior
   b. Functions transform models
   c. **Use the simplest approach**: stateful objects when they simplify, pure functions when they clarify
   d. **State location**: Choose based on cohesion - tightly coupled state can live with its logic

### 4. MOP (Model-Oriented Programming)
   a. Models are the source of truth
   b. Operations are functions on models OR methods as appropriate
   c. **1-level inheritance can be useful** for shared interfaces/base classes WHEN it supports the design
   d. **Composition for complex behaviors**, inheritance for type categories

### 5. SOLID Principles (Applied Pragmatically)
   a. Single Responsibility - one reason to change
   b. Open/Closed - but don't over-abstract for imaginary futures
   c. Liskov Substitution - when inheritance is actually used
   d. Interface Segregation - small, focused interfaces
   e. Dependency Inversion - but simple direct calls are fine for single implementations

### 6. COMPOSITION
   a. Favor composition over **deep** inheritance
   b. Combine simple parts for complex behavior
   c. **1-level inheritance is fine**, avoid chains deeper than 2

### 7. PRIVACY FIRST (Healthcare Critical)
   a. PHI never touches external systems without transformation
   b. Audit trails for all data access
   c. No exceptions for convenience

### 8. ASYNC BY DEFAULT
   a. All I/O operations must be asynchronous
   b. Use queues for heavy processing
   c. Synchronous only with documented performance reason
   d. Event-driven > Request-response for scale

## B. Implementation Rules

### 1. Avoid These Patterns (CRITICAL VIOLATIONS)
   a. AVOID abstraction for single use cases
   b. AVOID factories with <3 implementations
   c. AVOID inheritance chains deeper than 2 levels
   d. AVOID registries unless discovery is dynamic
   e. AVOID optimizing for edge cases in core architecture
   f. **NEVER use 'any' type** - use explicit typing, generics, or 'unknown' as last resort
   g. **NEVER use scattered configuration** - single source only
   h. **NEVER use hardcoded configuration values** - use env/config files
   
   **SHARED vs LOCAL TYPE RULES:**
   g. **NEVER duplicate cross-service types** (auth context, user models, API contracts) - MUST use @lumana/shared
   h. **NEVER duplicate cross-app utilities** (date helpers, validation, formatters) - MUST use shared packages
   i. **OK to create service-specific types** (internal business logic, service-only models)
   j. **OK to create app-specific utilities** (component helpers, UI-only logic)
   
   **DECISION CRITERIA:** If >1 service/app needs it OR it's part of API contracts → SHARED. If service/app internal only → LOCAL OK.

### 2. Prefer These Patterns (When Complexity Justifies)
   a. Direct function calls over unnecessary indirection
   b. Simple objects/functions over complex abstractions
   c. Data + Functions over deep OOP hierarchies
   d. Explicit code over clever abstractions
   e. Inline logic over premature extraction
   f. 1-level inheritance for shared types/behavior

### 3. Type Safety & Data Handling
   a. **Internal data should ALWAYS use native, strongly-typed representations:**
      - Date objects for timestamps, not strings
      - number for numeric values, not strings
      - boolean for flags, not string representations
      - Proper enums/unions for constrained values
   
   b. **Conversion only happens at boundaries:**
      - Input boundary: Parse/validate incoming data (strings from gRPC/JSON) → convert to native types
      - Output boundary: Convert native types → serialize to required format (proto int64, JSON strings, etc.)
      - Storage boundary: Handle database type mapping appropriately
   
   c. **Performance and type safety:**
      - Internal operations work with native types for maximum performance
      - TypeScript compiler catches type errors at build time
      - No runtime type confusion or string/number casting issues
   
   d. **Utility pattern:**
      - Create conversion utilities like `toUnixTimestamp(date: Date): number`
      - Use serialization helpers at API boundaries
      - Keep business logic working with proper types

## C. Design Patterns (Use Only When Needed)

**CRITICAL**: These patterns are for EDGE CASES where complexity genuinely exists (3+ implementations).
Default to simple functions and objects.

### 1. Creational Patterns (3+ types minimum)
   a. Factory - (rare) only with 3+ object types that exist TODAY
   b. Registry - only when runtime discovery is actually needed
   c. Builder - (rare) only for genuinely complex construction

### 2. Structural Patterns (proven need only)
   a. Repository - data access abstraction (when multiple data sources)
   b. Provider - dependency injection (when testing requires it)
   c. Adapter - interface compatibility (when integrating external systems)

### 3. Behavioral Patterns (edge cases only)
   a. Strategy - interchangeable algorithms (3+ algorithms minimum)
   b. Template - shared algorithm structure (3+ implementations)
   c. Observer - event-driven updates (when polling isn't viable)

## D. Code Examples

### 0. SIMPLICITY FIRST EXAMPLES
   ```typescript
   // 🎯 DEFAULT: Start with the simplest solution
   
   // ✅ PREFER - Direct and simple
   function processResult(result: Result) {
     return result.value > result.max ? 'high' : 
            result.value < result.min ? 'low' : 'normal';
   }
   
   // ❌ AVOID - Premature abstraction for single use
   class ResultProcessorFactory { /* 200 lines for one case */ }
   
   // ✅ PREFER - Simple model + functions
   type CircuitBreaker = {
     failures: number;
     isOpen: boolean;
   }
   
   const trip = (cb: CircuitBreaker) => ({ ...cb, isOpen: true });
   const reset = (cb: CircuitBreaker) => ({ failures: 0, isOpen: false });
   
   // ✅ ALSO GOOD - Stateful object when it simplifies
   class ConnectionPool {
     private connections: Connection[] = [];
     acquire() { /* stateful logic here is clearer */ }
     release(conn: Connection) { /* ... */ }
   }
   
   // ✅ GOOD - 1-level inheritance for shared types
   interface IHealthMetric {
     value: number;
     timestamp: Date;
     validate(): boolean;
   }
   
   class BloodPressure implements IHealthMetric {
     value: number;
     timestamp: Date;
     systolic: number;
     diastolic: number;
     validate() { return this.systolic > 0 && this.diastolic > 0; }
   }
   
   // ❌ AVOID - Deep inheritance chains
   class Metric extends BaseEntity extends Auditable extends Serializable {}
   ```

### 1. Simplicity Examples (existing, with context added)
   ```typescript
   // ❌ BAD (violates A.1 - overcomplicated for single use case)
   // 50 files, 3 packages, inheritance system for icon management
   class IconRegistry {
     registerIcon(name: string, component: ReactComponent)
     getIconWithFallback(name: string): ReactComponent
     buildInheritanceChain(): IconNode[]
   }

   // ✅ GOOD (follows A.1 - simplest solution)
   // One component, direct import
   <LucideIcon name="check" className="h-4 w-4" />
   ```

### 2. API Design Examples (with context for when to use)
   ```typescript
   // ❌ BAD (violates A.3.a - too specific without need)
   async getUserLabResults(userId: string): Promise<LabResult[]>
   async getUserVitals(userId: string): Promise<Vitals[]>
   async getUserMedications(userId: string): Promise<Medication[]>

   // ✅ GOOD (follows A.3 - generic when you have 3+ data types)
   async getUserHealthData<T>(userId: string, dataType: HealthDataType): Promise<T[]>
   ```

### 3. Registry Pattern (only for edge cases)
   ```typescript
   // ❌ BAD (violates B.1.a - hardcoded list)
   const processors = {
     'lab': new LabProcessor(),
     'vitals': new VitalsProcessor(),
     'imaging': new ImagingProcessor()
   };

   // ✅ GOOD (only when types change at runtime)
   const processors = ProcessorRegistry.discover();
   
   // ✅ BETTER (for static cases)
   const processHealthData = (type: string, data: unknown) => {
      switch(type) {
         case 'lab': return processLab(data);
         case 'vitals': return processVitals(data);
         default: throw new Error(`Unknown type: ${type}`);
      }
   };
   ```

### 4. Service Architecture
   ```typescript
   // ❌ BAD (violates A.5.a - multiple responsibilities)
   class PatientService {
     async getPatientData(): Promise<Patient> { /* ... */ }
     async processLabResults(): Promise<void> { /* ... */ }
     async sendNotifications(): Promise<void> { /* ... */ }
     async generateReports(): Promise<Report[]> { /* ... */ }
   }

   // ✅ GOOD (follows SOLID - single responsibility)
   class PatientDataService { /* data access only */ }
   class LabProcessingService { /* lab processing only */ }
   class NotificationService { /* notifications only */ }
   ```

### 5. Interface Pattern (use pragmatically)
   ```typescript
   // ❌ BAD (over-abstraction for single implementation)
   interface IAIProvider {
     analyze<T>(data: T): Promise<Result>;
   }
   class LabAnalyzer {
     constructor(private ai: IAIProvider) {} // Unnecessary if only OpenAI
   }

   // ✅ GOOD (direct dependency when you have one provider)
   class LabAnalyzer {
     constructor(private openAI: OpenAIService) {} // Simple and clear
   }
   
   // ✅ ALSO GOOD (interface when you actually have multiple providers)
   interface IAIProvider { /* ... */ }
   // When you have OpenAI, Claude, and Local LLM
   ```

### 6. Async Pattern
   ```typescript
   // ❌ BAD (violates A.8 - blocking I/O)
   function processLabResults(results: LabResult[]) {
     const analysis = externalAPI.analyzeSync(results); // Blocks!
     const saved = database.saveSync(analysis);         // Blocks!
     return saved;
   }

   // ✅ GOOD (follows A.8 - async by default)
   async function processLabResults(results: LabResult[]): Promise<JobStatus> {
     const analysisJob = await queue.publish('analyze', results);
     // Returns immediately, processing happens async
     return { jobId: analysisJob.id, status: 'processing' };
   }
   ```

### 7. Single Source of Truth
   ```typescript
   // ❌ BAD (violates A.2 - multiple sources)
   // file1.ts
   const API_URL = 'http://localhost:3000';
   // file2.ts
   const API_URL = 'http://localhost:3000';

   // ✅ GOOD (follows A.2 - single source)
   // config.ts
   export const CONFIG = { apiUrl: 'http://localhost:3000' };
   // all files
   import { CONFIG } from './config';

   // ❌ BAD - Configuration in code
   class EmailService {
      private smtp = 'mail.company.com';  // VIOLATION!
      private port = 587;                  // VIOLATION!
   }

   // ✅ GOOD - Configuration from environment/files
   class EmailService {
      private smtp = process.env.SMTP_HOST || config.smtp.host;
      private port = Number(process.env.SMTP_PORT) || config.smtp.port;
   }
   ```

### 8. Privacy Pattern (Healthcare)
   ```typescript
   // ❌ BAD (violates A.7.a - PHI exposure)
   const result = await externalAI.analyze({
     patientName: patient.name,
     ssn: patient.ssn,
     diagnosis: patient.conditions
   });

   // ✅ GOOD (follows A.7 - privacy first)
   const deidentified = privacyService.deidentify(patient);
   const result = await externalAI.analyze(deidentified);
   const personalized = privacyService.reidentify(result, patient.id);
   ```

### 9. TypeScript Typing Pattern
   ```typescript
   // ❌ BAD (violates B.1.f - 'any' type usage)
   function processData(data: any): any {
     return data.someProperty;
   }

   // ✅ GOOD (explicit typing with generics)
   function processData<T extends { someProperty: string }>(data: T): string {
     return data.someProperty;
   }

   // ✅ ACCEPTABLE (using 'unknown' when type truly unknown)
   function parseJSON(json: string): unknown {
     return JSON.parse(json);
   }
   ```

### 10. Type Safety & Data Handling Pattern
   ```typescript
   // ❌ BAD (violates B.3 - string-based internal data)
   class UserService {
     private lastLogin: string; // Should be Date!
     private userId: string;    // Should be proper ID type!
     
     updateActivity(timestamp: string) {
       this.lastLogin = new Date().toISOString(); // String conversion in logic!
       database.save({ last_login: this.lastLogin }); // Mixed types!
     }
   }

   // ✅ GOOD (follows B.3 - native types internally)
   class UserService {
     private lastLogin: Date;
     private userId: UserID;
     
     updateActivity(timestamp: Date) {
       this.lastLogin = timestamp; // Native Date object
       database.save({ last_login: this.lastLogin }); // DB handles conversion
     }
     
     // Conversion only at API boundaries
     toGrpcResponse(): UserResponse {
       return {
         last_login_at: Math.floor(this.lastLogin.getTime() / 1000), // Unix timestamp
         user_id: this.userId.toString() // String for gRPC
       };
     }
   }
   ```

## E. Beautiful UX Design Standards

Per our [Vision](/docs/_core/vision.md), maintain these UX principles:

### 1. Progressive Disclosure
   - Start simple-clean interface, reveal complexity as needed
   - Hide advanced features until requested
   - Gradual learning curve

### 2. Clean Interface
   - Maximize signal-to-noise ratio
   - Generous whitespace
   - Every element must earn its place

### 3. Emotional Intelligence
   - Celebrate progress
   - Contextual assistance
   - Human-centered copy

### 4. One-Click Actions
   - Most common tasks = single click
   - Smart AI-powered defaults
   - Minimal decision fatigue

### 5. Glass Morphism and Gradients
   - Depth through transparency
   - Modern aesthetic, beautiful gradients
   - Semantic color system

### 6. Polished Interactions
   - Smooth animations (150-250ms ease)
   - Seamless transitions between states
   - Instant feedback for all actions
   - No jarring movements or flickers
   - Professional, refined feel

### 7. Automatic Patterns Rule (CRITICAL)
   **STRONGLY PREFER automatic derivation over manual configuration.**

   Examples:
   - Breadcrumbs should derive from URL path
   - Page titles should derive from component/route
   - Navigation state should derive from current location
   - Theme colors should derive from base configuration

   ```typescript
   // ❌ AVOID - Manual configuration everywhere
   function MyPage() {
     setBreadcrumbs([...]);     // Manual
     setTitle('My Page');        // Manual
     setNavActive('my-page');    // Manual
   }

   // ✅ PREFER - Automatic from single source
   function MyPage() {
     // Everything derives from pathname or component
     // No manual configuration needed
   }
   ```

## F. Exceptions

### When to Break Standards
- **Performance critical paths** (document benchmarks)
- **Regulatory requirements** (HIPAA/GDPR compliance)
- **Third-party constraints** (wrap in adapters)
- **Rapid prototyping** (mark with `// PROTOTYPE`)

### Documentation
When breaking standards, add comment:
```typescript
// EXCEPTION: Using sync processing for <50ms ECG response
// Review: Q2 2025
```

## G. Quick Reference

### Keywords
`SIMPLE` | `MODEL-FIRST` | `DRY` | `MOP` | `EDGE-CASE` | `COMPOSITION` | `PRIVACY` | `ASYNC`

### Common Violations
- B.1.a: Creating abstractions for single use cases (need 3+ implementations)
- B.1.b: Creating factories with <3 implementations
- B.1.c: Inheritance chains deeper than 2 levels
- B.1.f: Using 'any' type instead of explicit typing
- B.3.a: String-based internal data instead of native types
- B.3.b: Mixed type conversions in business logic instead of boundary-only
- A.1.b: Multiple truth sources instead of single
- A.1.d: Letting edge cases drive architecture
- A.3.a: Specific implementations instead of generic (when <3 cases)
- A.7.a: PHI exposure to external systems
- A.8.a: Synchronous I/O operations

### Best Practices
- Always ask: "What's the simplest solution that works?"
- Always ask: "Is this an edge case or common case?"
- Always ask: "Do I have 3 real implementations TODAY?"
- Always ask: "Can this derive automatically from existing data?"
- Always ask: "Does this protect user privacy?"
- Build for the 95% case, adapt for the 5%
- Prefer automatic patterns over manual configuration
- Prefer direct code over abstractions (until proven need)
- Simple model classes often better than complex hierarchies
- 1-level inheritance is fine, 2-levels for clear design benefit, deep chains are not