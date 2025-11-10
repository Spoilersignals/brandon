# Contributing to DAMS

Thank you for your interest in contributing to the Digital Accountability and Management System (DAMS)! We welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. **Check existing feature requests**
2. **Create a new issue** with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## 🎯 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting (Prettier/ESLint)
- Write meaningful variable and function names
- Add comments for complex logic

### Database Changes

```bash
# After modifying schema.prisma
npm run db:generate
npm run db:push
```

### Testing

```bash
# Run tests before submitting PR
npm test

# Check for TypeScript errors
npm run build
```

### Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example:
```
feat: add export functionality to financial reports
fix: resolve task assignment notification bug
docs: update installation instructions
```

## 📝 Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, PR will be merged

## 🔒 Security

For security vulnerabilities:
- **DO NOT** create public issues
- Email security@dams.com
- We'll work with you on a fix

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions

Join our community:
- Discord: [DAMS Community](https://discord.gg/dams)
- GitHub Discussions: [Ask Questions](https://github.com/your-org/dams/discussions)

Thank you for contributing! 🎉
