/**
 * weightroom/wrestler.ts
 */

import { Workout } from './workout';
import { wrestlerJSON, workoutJSON, weightUnit } from './json-interfaces';

export default class Wrestler {
    static list: Wrestler[] = [];
    workouts: Workout[] = [];
    age: number;
    weight: number;
    weightUnit: weightUnit;
    constructor(public name: string, public id: number = -1) {
        Wrestler.list.push(this);
    }

    toJSON(): wrestlerJSON {
        return {
            wrestler_id: this.id || -1,
            wrestler_name: this.name,
            wrestler_age: this.age || null,
            wrestler_weight: this.weight || null,
            wrestler_weight_unit: this.weightUnit || weightUnit.IMPERIAL
        };
    }

    static fromJSON(json: wrestlerJSON, workouts?: workoutJSON[]): Wrestler {
        let wrestler = new Wrestler(json.wrestler_name, json.wrestler_id);
        json.wrestler_age && (wrestler.age = json.wrestler_age);
        json.wrestler_weight && (wrestler.weight = json.wrestler_weight);
        wrestler.weightUnit = json.wrestler_weight_unit || weightUnit.IMPERIAL;
        if (workouts) {
            workouts.forEach(workout => wrestler.workouts.push(Workout.fromJSON(wrestler, workout)));
        }
        return wrestler;
    }
}
