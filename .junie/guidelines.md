
# Code Generation Rules

## General Guidelines

- Keep changes minimal
- Focus on task requirements only

## File Modification Rules

- Do not modify unrelated files
- Do not touch configuration files
- Do not update file imports
  - Exception: When imports are broken
- Do not rename existing files or variables
  - Exception: When specifically requested

## Code Refactoring Rules

- Do not refactor existing code
  - Exception: When specifically requested

## Testing Best Practices

### Test Behavior, Not Implementation
- Focus on what users see and interact with
- Use queries that reflect how users find elements (text, role, label)
- Simulate real user interactions rather than changing state programmatically

### Structure and Organization
- Group related tests with descriptive `describe` blocks
- Write clear test names that explain what's being tested and expected outcome
- Keep tests independent and isolated from each other
- Clean up after each test using `afterEach` hooks

### Mocking and Dependencies
- Mock external dependencies (APIs, services) but avoid over-mocking
- Use Vitest's mocking capabilities (`vi.mock()`, `vi.spyOn()`)
- Mock only what's necessary to keep tests realistic

### Assertions and Validation
- Assert outcomes, not implementation details
- Use expressive matchers for DOM testing
- Use snapshot testing sparingly and only for stable components

### Performance and Efficiency
- Keep tests fast by avoiding unnecessary renders
- Mock dependencies strategically to speed up execution
- Use setup functions for common test arrangements

### Accessibility and Edge Cases
- Test for accessibility using ARIA roles and labels
- Test component behavior with different prop values
- Verify events are emitted with correct payloads

### Common Pitfalls to Avoid
- Testing implementation details
- Over-reliance on snapshot tests
- Not cleaning up mocks or DOM between tests
- Ignoring asynchronous behavior
- Writing overly broad tests