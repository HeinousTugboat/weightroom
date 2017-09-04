import { expect } from 'chai';
import 'mocha';
import * as w from '../../src/models/workout';

describe('base tests', function () {
    it('should at least run', function () {
        expect(true).to.be.true;
    })
})
describe('base exports', function() {
    it('should export Exercise', function() {
        expect(w.Exercise).to.exist;
    })
    it('should export ExerciseSet', function() {
        expect(w.ExerciseSet).to.exist;
    })
    it('should export Workout', function() {
        expect(w.Workout).to.exist;
    })
})
