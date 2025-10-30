#!/bin/bash

# Script to configure Git hooks for this repository
# Run this after cloning the repository to enable pre-push hooks

echo "Setting up Git hooks..."

# Configure Git to use the .githooks directory
git config core.hooksPath .githooks

echo "✅ Git hooks configured successfully!"
echo ""
echo "The following hooks are now active:"
echo "  - pre-push: Runs frontend build before pushing"
echo ""
echo "To bypass hooks temporarily, use: git push --no-verify"

