// /**
//  * weightroom.ts
//  */

// import { Exercise } from './workout';
// import { routineJSON } from './json-interfaces';

// export default class Routine {
//     id: number;
//     schedule: string;
//     constructor(public label: string) {
//     }

//     toJSON(): routineJSON {
//         return {
//             routine_id: this.id,
//             routine_label: this.label
//         }
//     }

//     fromJSON(json: routineJSON): Routine {
//         let routine = new Routine(json.routine_label);
//         routine.id = json.routine_id;
//         return routine
//     }

//     // getFirst(): Exercise {
//     //     return this.exercises[0];
//     // }
//     // getNext(): Exercise {
//     //     return this.exercises[1]; // FIXME
//     // }
//     // setExercises(exercises: Exercise[]): void {
//     //     this.exercises = exercises;
//     // }
// }
