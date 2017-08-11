import Wrestler from 'models/wrestler';
import { Workout } from 'models/workout';
import { wrestlerJSON, workoutJSON, weightUnit } from 'models/json-interfaces';



export default class wrestlerRepo {
    constructor(private get: Function, private put: Function, private post: Function) {

    }
    getWrestlers(): Promise<Wrestler[]> {
        return this.get('/wrestlers')
            .then((wrestlers: wrestlerJSON[]) => {
                return Promise.resolve(wrestlers.map(wrestler => Wrestler.fromJSON(wrestler)));

            });
    }
    getWrestler(id: number): Promise<Wrestler> {
        return this.get('/wrestlers/' + id)
            .then((wrestler: wrestlerJSON) => {
                return Promise.resolve(Wrestler.fromJSON(wrestler));
            });
    }
    putWrestler(wrestler: Wrestler): Promise<wrestlerJSON> {
        if (wrestler.id) {
            return Promise.all(wrestler.workouts
                .filter(x => x.dirty)
                .map(x => this.postWorkout(wrestler, x)))
                .then(() => this.put('/wrestlers/' + wrestler.id, wrestler));
            // return this.put('/wrestlers/' + wrestler.id, wrestler)
        } else {
            throw new TypeError('Unable to put wrestler without ID#!\n' + JSON.stringify(wrestler));
        }
    }
    postWrestler(wrestler: Wrestler): Promise<wrestlerJSON> {
        if (wrestler.id > 0) {
            return this.putWrestler(wrestler);
        } else {
            return this.post('/wrestlers', wrestler);
        }
    }
    postWorkout(wrestler: Wrestler, workout: Workout): Promise<workoutJSON> {
        if (workout.id > 0) {
            return this.put('/wrestlers/' + wrestler.id + '/workouts/' + workout.id, workout);
        } else {
            return this.post('/wrestlers/' + wrestler.id + '/workouts', workout);
        }
    }
}
