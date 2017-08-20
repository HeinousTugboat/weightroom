import db from '../db';
import { exerciseJSON, exerciseSetJSON, weightUnit, workoutJSON } from './json-interfaces';
import Wrestler from './wrestler';

export class Exercise {
    constructor(public name: string, public id: number = -1) { }

    // This feels unnecessary since we're using NATURAL JOIN straight out of the database.
    // static list: Map<string, Exercise> = new Map;
    // static get(name: string, id: number): Exercise {
    //     let exercise = Exercise.list.get(name);
    //     if (exercise) return exercise;
    //     exercise = new Exercise(name, id);
    //     Exercise.list.set(name, exercise);
    //     return exercise;
    // }

    toJSON() {
        return {
            exercise_id: this.id,
            exercise_name: this.name
        }
    }
    static fromJSON(json: exerciseJSON): Exercise {
        return new Exercise(json.exercise_name, json.exercise_id);
    }
}

export class ExerciseSet {
    exercise: Exercise | undefined;
    reps: number = 0;
    weight: number = 0;
    weightUnit: weightUnit = weightUnit.IMPERIAL;
    setNumber: number = -1;
    dirty: boolean = true;
    constructor(public workout: Workout, public id: number = -1) { }

    toJSON() {
        return {
            exercise_set_id: this.id,
            exercise_id: (this.exercise && this.exercise.id) || -1,
            workout_id: this.workout,
            exercise_reps: this.reps,
            exercise_weight: this.weight,
            exercise_weight_unit: this.weightUnit,
            set_number: this.setNumber
        }
    }

    static fromJSON(workout: Workout, json: exerciseSetJSON): ExerciseSet {
        if (workout.id !== json.workout_id) {
            throw new TypeError(`Workout ID (${workout.id}) doesn't match set's Workout ID (${json.workout_id})! [set ${json.exercise_set_id}]`);
        }
        let set = new ExerciseSet(workout, json.exercise_set_id);
        set.reps = json.exercise_reps;
        set.weight = json.exercise_weight;
        set.setNumber = json.set_number;
        json.exercise_weight_unit && (set.weightUnit = json.exercise_weight_unit);
        json.exercise_id && json.exercise_name && (set.exercise = new Exercise(json.exercise_name, json.exercise_id));

        return set;
    }

}

export interface ExerciseBlock {
    exercise: Exercise | undefined;
    sets: ExerciseSet[];
}

export class Workout {
    date: Date;
    sets: ExerciseSet[] = [];
    dirty: boolean = true;
    label: string;
    duration: Date;
    public exercises: ExerciseBlock[];
    constructor(public wrestler: Wrestler, public id: number = -1) { }

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
