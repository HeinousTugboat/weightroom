/**
 * DB module!
 *
 * https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
 */

import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp:IMain = pgPromise({
    // 'postgres://cumulus:nineball@localhost:5432/cumulonimbus'
})

const cn: string = process.env.DATABASE_URL as string;
export const db: IDatabase<any> = pgp(cn);
