# Spec Steering Setup Command

Create or update steering documents that provide persistent project context.

## Usage
```
/spec-steering-setup
```

## Instructions
You are helping set up steering documents that will guide all future spec development. These documents provide persistent context about the product vision, technology stack, and project structure.

## Process

1. **Check for Existing Steering Documents**
   - Look for `.claude/steering/` directory
   - Check for existing product.md, tech.md, structure.md, standards.md files
   - If they exist, load and display current content

2. **Search for Project Standards Documents**
   - Look for common standards files in the project:
     - `CONTRIBUTING.md`, `CONTRIBUTING.txt`
     - `STANDARDS.md`, `CODING_STANDARDS.md`, `CODE_STANDARDS.md`
     - `CONVENTIONS.md`, `CODING_CONVENTIONS.md`
     - `STYLE_GUIDE.md`, `STYLE.md`
     - `DEVELOPMENT.md`, `DEV_GUIDE.md`
     - `.editorconfig`, `.prettierrc`, `.eslintrc*`
     - Files in `docs/` or `documentation/` directories containing "standard", "convention", "rule", or "guideline"
   - If found, extract key points:
     - Coding style preferences
     - UX preferences
     - Architecture patterns and anti-patterns
     - Testing requirements
     - Code review rules
   - Keep notes concise - will be used to populate standards.md

3. **Analyze the Project**
   - Review the codebase to understand:
     - Project type and purpose
     - Technology stack in use
     - Directory structure and patterns
     - Coding conventions
     - Existing features and functionality
   - Look for:
     - package.json, requirements.txt, go.mod, etc.
     - README files
     - Configuration files
     - Source code structure

4. **Present Inferred Details**
   - Show the user what you've learned about:
     - **Product**: Purpose, strategic advantage, features, target users
     - **Technology**: Frameworks, libraries, tools
     - **Structure**: File organization, naming conventions
     - **Standards** (if found): Key coding rules, patterns, conventions
   - Format as:
     ```
     Based on my analysis, here's what I've inferred:

     **Product Details:**
     - [Inferred detail 1]
     - [Inferred detail 2]

     **Technology Stack:**
     - [Inferred tech 1]
     - [Inferred tech 2]

     **Project Structure:**
     - [Inferred pattern 1]
     - [Inferred pattern 2]

     **Engineering Standards:**
     - [Key rule from CONTRIBUTING.md]
     - [Pattern from STYLE_GUIDE.md]
     - [Inferred pattern]
     ```
   - Ask: "Do these inferred details look correct? Please let me know which ones to keep or discard."
   - Ask: "Are there any other coding rules, engineering standards, or conventions I should know about?"

5. **Gather Missing Information**
   - Based on user feedback, identify gaps
   - Ask targeted questions to fill in missing details:

     **Product Questions:**
     - What is the main problem this product solves?
     - What are the product's unique strategic advantages (USAs)?
     - Who are the primary users?
     - What are the key business objectives?
     - What metrics define success?

     **Technology Questions:**
     - Are there any technical constraints or requirements?
     - What third-party services are integrated?
     - What are the performance requirements?

     **Structure Questions:**
     - How should new features be organized?
     - What are the testing requirements?

     **Engineering Standards Questions:**
     - Any mandatory code patterns or anti-patterns (beyond what was found)?
     - Specific code review requirements?
     - Security, privacy or compliance standards?

6. **Generate Steering Documents**
   - Create `.claude/steering/` directory if it doesn't exist
   - Generate **four** files based on templates and gathered information:

     **product.md**: Product vision, users, features, objectives
     **tech.md**: Technology stack, tools, constraints, decisions
     **structure.md**: File organization, naming conventions, patterns
     **standards.md**: Engineering standards, coding rules, patterns (keep focused and concise)

7. **Review and Confirm**
   - Ensure standards.md is **focused and concise** (essential rules only, zero redundancy with tech.md/structure.md)
   - Present the generated documents to the user
   - Ask for final approval before saving
   - Make any requested adjustments

## Important Notes

- **Steering documents are persistent** - they will be referenced in all future spec commands
- **Keep documents focused** - each should cover its specific domain
- **Update regularly** - steering docs should evolve with the project
- **Never include sensitive data** - no passwords, API keys, or credentials

## Example Flow

1. Check for existing steering documents
2. Search for and find CONTRIBUTING.md with coding standards
3. Analyze project and find it's a React/TypeScript app
4. Present inferred details about the platform
5. User confirms most details, adds security requirements not in docs
6. Ask about performance requirements and third-party services
7. Generate steering documents with all gathered information
8. User reviews and approves the documents
9. Save to `.claude/steering/` directory

## Next Steps
After steering documents are created, they will automatically be referenced during:
- `/spec-create` - Align requirements with product vision
- `/spec-design` - Follow established tech patterns
- `/spec-tasks` - Use correct file organization
- `/spec-execute` - Implement following all conventions
