#!/bin/bash
# fix-claude-sessions.sh
# Workaround for Claude Desktop sessions disappearing from sidebar
# See: https://github.com/anthropics/claude-code/issues/26452
#
# Root cause: The Desktop app's LevelDB cache (LSS-cached-sessions) gets
# corrupted/emptied on restart or sleep. Clearing it forces a fresh rebuild.

set -e

CLAUDE_CONFIG="$HOME/.claude"
LEVELDB_DIR="$HOME/Library/Application Support/Claude/Local Storage/leveldb"
BACKUP_DIR="$HOME/.claude/leveldb-backups"

echo "=== Claude Desktop Session Fix ==="
echo ""

# 1. Create missing directories that Claude Code expects
echo "[1/3] Ensuring required directories exist..."
mkdir -p "$CLAUDE_CONFIG/usage-data/session-meta"
mkdir -p "$CLAUDE_CONFIG/usage-data/facets"
mkdir -p "$CLAUDE_CONFIG/projects"
echo "  Done."

# 2. Verify session files exist
echo "[2/3] Checking for session files..."
SESSION_COUNT=$(find "$CLAUDE_CONFIG/projects" -name "*.jsonl" -not -path "*/subagents/*" 2>/dev/null | wc -l | tr -d ' ')
echo "  Found $SESSION_COUNT session file(s) in ~/.claude/projects/"

# 3. Clear corrupted LevelDB cache
if [ -d "$LEVELDB_DIR" ]; then
    echo "[3/3] Clearing corrupted LevelDB cache..."
    mkdir -p "$BACKUP_DIR"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    cp -r "$LEVELDB_DIR" "$BACKUP_DIR/leveldb-$TIMESTAMP" 2>/dev/null || true
    rm -rf "$LEVELDB_DIR"
    echo "  Cache cleared. Backup saved to $BACKUP_DIR/leveldb-$TIMESTAMP"
else
    echo "[3/3] No LevelDB cache found (already clean)."
fi

echo ""
echo "Done! Restart Claude Desktop and your sessions should reappear."
echo "If backups accumulate, you can safely delete: $BACKUP_DIR"
