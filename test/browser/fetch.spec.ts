import { expect } from 'chai';
import 'mocha';
import * as f from '../../src/browser/fetch';

describe('browser: fetch', function () {
    it('should export getJSON', function() {
        expect(f.getJSON).to.exist;
    })
    it('should export postJSON', function() {
        expect(f.postJSON).to.exist;
    })
    it('should export putJSON', function() {
        expect(f.putJSON).to.exist;
    })
    it('should export getHTML', function() {
        expect(f.getHTML).to.exist;
    })
})
