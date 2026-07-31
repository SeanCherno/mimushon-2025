#!/usr/bin/env bash
#
# One-command deploy for the mimushon Next.js app. Run it ON THE SERVER from the
# app directory:  bash deploy.sh
#
# It pulls the latest main, installs deps only if the lockfile changed, rebuilds,
# reloads pm2, then health-checks the running app. If the health check fails it
# automatically rolls back to the previous commit and rebuilds — so a bad deploy
# never leaves the site down.
#
# Override defaults with env vars, e.g.:  PM2_APP=mimushon PORT=3000 bash deploy.sh
set -euo pipefail

cd "$(dirname "$0")"                 # the app dir = pm2's cwd
APP="${PM2_APP:-mimushon}"
PORT="${PORT:-3000}"
BRANCH="${DEPLOY_BRANCH:-main}"

log() { printf '\n\033[1;36m==> %s\033[0m\n' "$1"; }
fail() { printf '\n\033[1;31m!! %s\033[0m\n' "$1"; }

build_and_reload() {
  rm -rf .next
  npm run build
  pm2 reload "$APP" --update-env || pm2 start npm --name "$APP" -- start
}

health_ok() {
  for _ in $(seq 1 15); do
    if curl -fsS "http://localhost:${PORT}/api/health" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  return 1
}

log "Deploy started $(date)"

# Guard: filesystem must be writable (we hit a read-only-root incident before).
if ! touch .deploy-write-test 2>/dev/null; then
  fail "Filesystem is not writable (read-only?). Fix that first — aborting."
  exit 1
fi
rm -f .deploy-write-test

PREV="$(git rev-parse HEAD)"

log "Pulling origin/${BRANCH}..."
git pull --ff-only origin "$BRANCH"
NEW="$(git rev-parse HEAD)"
if [ "$PREV" = "$NEW" ]; then
  log "No new commits ($NEW) — rebuilding anyway to be safe."
fi

if ! git diff --quiet "$PREV" "$NEW" -- package-lock.json 2>/dev/null; then
  log "Lockfile changed — running npm ci"
  npm ci
fi

log "Building & reloading..."
build_and_reload

log "Health check (http://localhost:${PORT}/api/health)..."
if health_ok; then
  log "Deploy OK — now serving ${NEW}"
  exit 0
fi

fail "Health check FAILED — rolling back to ${PREV}"
git reset --hard "$PREV"
build_and_reload
if health_ok; then
  fail "Rolled back to ${PREV}. The new commit was NOT deployed — check the build/logs."
else
  fail "Rollback also failing health check — investigate immediately (pm2 logs ${APP})."
fi
exit 1
