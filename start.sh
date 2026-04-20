#!/usr/bin/env bash
set -e

# Greenhouse sync is handled by a dedicated Coolify scheduled task
# (every 6h). Running it here on container boot was redundant and
# re-ran the scrape on every redeploy.

exec npm start
