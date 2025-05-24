#! /usr/bin/env bash

set -eo pipefail

readonly PROGNAME=$(basename $0)
readonly PROGDIR=$(readlink -fn $(dirname $0))
readonly ARGS="$@"

warn() {
    local message="$@"

    printf "$message" > /dev/stderr
}

main() {
    local migration_name=$1

    if [[ -z "$migration_name" || "$#" -ne 1 ]]; then
        warn "Usage: ${PROGNAME} [migration-name-kebab-case]\n"
        exit 1
    fi

    # If the migration name isn't kebab-case, exit with an error
    if [[ ! "$migration_name" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
        warn "Migration name must be lower kebab-case\n"
        exit 1
    fi

    local migration_file="$(readlink -fn $PROGDIR/migrations)/$(date +%Y%m%d%H%M%S)-$migration_name.ts"

    if [[ -f "$migration_file" ]]; then
        warn "Migration file $migration_file already exists\n"
        exit 1
    fi

    touch $migration_file

    cat > $migration_file << EOF
import { Kysely } from 'kysely'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function up(db: Kysely<any>): Promise<void> {}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function down(db: Kysely<any>): Promise<void> {}
EOF

    warn "Created migration file $migration_file\n"
}

main $ARGS
