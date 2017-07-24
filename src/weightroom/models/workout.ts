/**
 * weightroom.ts
 */

import Wrestler from './wrestler';
import Routine from './routine';

export class Exercise {
    static list: Exercise[] = [];
    static id = 0;
    id: number = Exercise.id++;
    constructor(readonly name: string) {
        this.name = name;
        Exercise.list.push(this);
    }
}

export class ExerciseSet {
    static id = 0;
    id: number = ExerciseSet.id++;
    reps: number = 0;
    weight: number = 0;
    setNumber: number = 1;
    exercise: Exercise;
    constructor(exercise?: Exercise) {
        exercise && this.setExercise(exercise);
    }
    setExercise(exercise: Exercise): ExerciseSet {
        this.exercise = exercise;
        return this;
    }
    setReps(reps: number): ExerciseSet {
        this.reps = reps;
        return this;
    }
    setWeight(weight: number): ExerciseSet {
        this.weight = weight;
        return this;
    }
    save(): void {
        // Save..?
    }
    next(workout: Workout): ExerciseSet {
        this.save();
        let next =  workout.newSet();
        if (next.exercise === this.exercise) {
            next.setNumber = this.setNumber + 1;
        } else {
        }
        return next;
    }
}

export class Workout {
    wrestler: Wrestler;
    routine: Routine;
    sets: ExerciseSet[] = [];
    date: Date;
    nextExercise: Exercise;
    constructor(wrestler: Wrestler, routine?: Routine) {
        this.wrestler = wrestler;
        this.routine = routine || new Routine('No Routine');
        this.nextExercise = this.routine.getFirst();
        // this.sets = [];
        this.date = new Date(Date.now());
    }
    newSet(exercise?: Exercise): ExerciseSet {
        const set = new ExerciseSet;
        if (!exercise) {
            set.setExercise(this.routine.getNext());
        } else {
            set.setExercise(exercise);
        }
        this.sets.push(set);
        return set;
    }
    complete(): void { }
    getSets(): ExerciseSet[] {
        return this.sets;
    }
    // edit(): void;
}
// const bench = new Exercise;
// const routine = new Routine;
// routine.setExercises([bench, bench]);

// const Joe = new Wrestler('Joe');
// const workout = Joe.beginWorkout(routine);
// let currentSet = workout.newSet();
// currentSet.setExercise(bench);
// currentSet.setReps(5);
// currentSet = currentSet.next(workout);

