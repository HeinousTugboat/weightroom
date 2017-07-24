/**
 * weightroom.ts
 */

import { Exercise } from './workout';

export default class Routine {
    static list: Routine[] = [];
    static id = 0;
    id: number = Routine.id++;
    name: string;
    exercises: Exercise[];
    schedule: string;
    constructor(name: string) {
        this.name = name;
        Routine.list.push(this);
    }
    getFirst(): Exercise {
        return this.exercises[0];
    }
    getNext(): Exercise {
        return this.exercises[1]; // FIXME
    }
    setExercises(exercises: Exercise[]): void {
        this.exercises = exercises;
    }
}
