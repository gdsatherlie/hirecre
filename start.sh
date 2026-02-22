#!/usr/bin/env bash
set -e

echo "Running Greenhouse sync..."
node scripts/sync-greenhouse.mjs || echo "Greenhouse sync failed (continuing)"

echo "Starting Next.js..."
npm start
