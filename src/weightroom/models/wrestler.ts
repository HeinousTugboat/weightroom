/**
 * weightroom/wrestler.ts
 */

import Routine from './routine';
import { Workout } from './workout';

export default class Wrestler {
    static list: Wrestler[] = [];
    static id: number = 0;

    id: number = Wrestler.id++;
    name: string;
    workouts: Workout[] = [];
    routine: Routine;
    constructor(name: string) {
        this.name = name;
        // this.id = -1;
        Wrestler.list.push(this);
    }
    beginWorkout(routine?: Routine): Workout {
        let workout: Workout;
        if (!routine) {
            workout = new Workout(this, this.routine);
        } else {
            workout = new Workout(this, routine);
        }
        this.workouts.push(workout);
        return workout;
    }
    setRoutine(routine: Routine): void {
        this.routine = routine;
    }
}
