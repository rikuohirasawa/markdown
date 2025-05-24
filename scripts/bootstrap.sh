#! /usr/bin/env bash
set -euo pipefail

readonly PROGDIR=$(dirname ${BASH_SOURCE[0]})
readonly ARGS="$@"

main() {
    echo "running bootstrap with args: $ARGS"
    local pkg_manager=$1

    if [ -z "$pkg_manager" ]; then
        echo "no package manager provided, installing dependencies using pnpm"
        pkg_manager="pnpm"
    else
        echo "installing dependencies using package manager: $pkg_manager"
    fi

    cd $PROGDIR/../
    $pkg_manager install
    $pkg_manager clean:db
    
    # Wait for PostgreSQL to be ready
    echo "waiting for postgres to be ready..."
    until docker exec markdown-postgres pg_isready -U user -d postgres; do
        echo "postgres unavailable - sleeping"
        sleep 2
    done
    
    echo "postgres ready - running migrations"
    $pkg_manager run migrate:up
}

main $ARGS