# Contributing to Team Task Manager

Thank you for considering contributing to Team Task Manager! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Setup Development Environment
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/team-task-manager.git`
3. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Set up environment variables (see `.env.example`)
5. Start development servers:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

## 📝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported
2. Create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details

### Suggesting Features
1. Check if the feature has already been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### Code Contributions

#### Branch Naming
- `feature/description` - for new features
- `bugfix/description` - for bug fixes
- `hotfix/description` - for urgent fixes
- `docs/description` - for documentation updates

#### Commit Messages
Follow conventional commits format:
- `feat: add user profile page`
- `fix: resolve login authentication issue`
- `docs: update API documentation`
- `style: improve responsive design`
- `refactor: optimize database queries`

#### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request with:
   - Clear title and description
   - Link to related issues
   - Screenshots (for UI changes)
   - Testing instructions

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing
- Test all user roles (Admin/Member)
- Verify responsive design
- Check error handling
- Test API endpoints

## 📋 Code Style

### Backend (Node.js)
- Use ES6+ features
- Follow Express.js best practices
- Use async/await for promises
- Add JSDoc comments for functions
- Validate all inputs
- Handle errors properly

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use meaningful component names
- Add PropTypes for components
- Keep components small and focused
- Use CSS modules or styled-components

### General Guidelines
- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable names
- Follow DRY principles
- Ensure code is properly formatted

## 🔒 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate and sanitize all inputs
- Follow OWASP security guidelines
- Report security issues privately

## 📚 Documentation

- Update README.md for new features
- Add API documentation for new endpoints
- Include code comments for complex logic
- Update CHANGELOG.md for releases

## 🎯 Development Guidelines

### Backend Development
- Use middleware for common functionality
- Implement proper error handling
- Add input validation
- Use appropriate HTTP status codes
- Follow RESTful API conventions

### Frontend Development
- Create reusable components
- Use React Context for global state
- Implement proper error boundaries
- Add loading states
- Ensure accessibility compliance

### Database
- Use proper indexing
- Validate data at schema level
- Use transactions for complex operations
- Optimize queries for performance

## 🚫 What Not to Do

- Don't commit directly to main branch
- Don't include node_modules in commits
- Don't hardcode sensitive information
- Don't break existing functionality
- Don't ignore linting errors
- Don't skip testing

## 📞 Getting Help

- Check existing issues and documentation
- Ask questions in GitHub Discussions
- Join our community chat (if available)
- Contact maintainers for complex issues

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Team Task Manager! 🎉