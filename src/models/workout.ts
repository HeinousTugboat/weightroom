/**
 * weightroom.ts
 */

import Wrestler from './wrestler';
import { workoutJSON, exerciseSetJSON, exerciseJSON } from './json-interfaces';

export class Exercise {
    id: number;
    constructor(public name: string) { }

    toJSON() {

    }
    static fromJSON(json: exerciseJSON) {

    }
}

export class ExerciseSet {
    id: number;
    exercise: Exercise;
    workout: Workout;
    reps: number = 0;
    weight: number = 0;
    setNumber: number = 1;
    dirty: boolean = true;
    constructor() {}

    toJSON() {

    }

    static fromJSON(json: exerciseSetJSON) {

    }

}

export class Workout {
    date: Date;
    sets: ExerciseSet[] = [];
    dirty: boolean = true;
    label: string;
    duration: Date;
    constructor(public wrestler: Wrestler, public id: number = -1) {}

    toJSON(): workoutJSON {
        return {
            workout_id: this.id,
            wrestler_id: this.wrestler && this.wrestler.id,
            workout_date: this.date,
            workout_duration: this.duration,
            workout_label: this.label
        }
    }

    static fromJSON(wrestler: Wrestler, json: workoutJSON): Workout {
        if (wrestler.id !== json.wrestler_id) {
            throw new TypeError(`Wrestler ID (${wrestler.id}) doesn't match Workout ID (${json.wrestler_id})! [workout ${json.workout_id}]`);
        }
        let workout = new Workout(wrestler, json.workout_id);
        workout.date = json.workout_date;
        json.workout_duration && (workout.duration = json.workout_duration);
        json.workout_label && (workout.label = json.workout_label);
        // json.routine_id
        // json.routine_template_id

        workout.dirty = false;

        return workout;
    }
}
