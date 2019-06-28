
import chai from 'chai';
import {ObjectUtils} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('ObjectUtils jsutils library', () => {
    describe('keys', () => {
        it('non empty object', () => {
            expect(ObjectUtils.keys({h: 'test'}))
                .to.be.deep.equal(['h']);
        });

        it('empty object', () => {
            expect(ObjectUtils.keys({}))
                .to.be.deep.equal([]);
        });

        it('array', () => {
            expect(ObjectUtils.keys(['a', 'b']))
                .to.be.deep.equal([]);
        });

        it('invalid object', () => {
            expect(ObjectUtils.keys(null))
                .to.be.deep.equal([]);
        });
    });

    describe('containsKey', () => {
        it('valid key', () => {
            expect(ObjectUtils.containsKey({h: 'test'}, 'h'))
                .to.be.true;
        });
        it('invalid key', () => {
            expect(ObjectUtils.containsKey({}, 'l'))
                .to.be.false;
        });
        it('invalid object', () => {
            expect(ObjectUtils.containsKey(undefined, 'l'))
                .to.be.false;
        });
    });

    describe('getValue', () => {
        it('valid key', () => {
            expect(ObjectUtils.getValue({h: 'test'}, 'h'))
                .to.equal('test');
        });
        it('invalid key', () => {
            expect(ObjectUtils.getValue({}, 'l'))
                .to.equal(null);
        });
        it('invalid object', () => {
            expect(ObjectUtils.getValue(undefined, 'l'))
                .to.equal(null);
        });
        it('invalid object with default value', () => {
            expect(ObjectUtils.getValue(undefined, 'l', 'q'))
                .to.equal('q');
        });
    });

    describe('isPlainObjectArray', () => {
        it('valid object array', () => {
            expect(ObjectUtils.isPlainObjectArray([{h: 'test'}]))
                .to.be.true;
        });
        it('valid nested object array', () => {
            expect(ObjectUtils.isPlainObjectArray([{h: 'test'}, [{k: 'test'}]], true))
                .to.be.true;
        });
        it('valid nested object array without recursive flag', () => {
            expect(ObjectUtils.isPlainObjectArray([{h: 'test'}, [{k: 'test'}]]))
                .to.be.false;
        });
        it('object', () => {
            expect(ObjectUtils.isPlainObjectArray({h: 'test'}))
                .to.be.false;
        });
        it('empty array', () => {
            expect(ObjectUtils.isPlainObjectArray([]))
                .to.be.true;
        });
        it('non empty array', () => {
            expect(ObjectUtils.isPlainObjectArray(['a']))
                .to.be.false;
        });
    });

    describe('merge', () => {
        it('2 objects', () => {
            let toDict = {h: 'test'};
            let fromDict = {l: 'test'};
            ObjectUtils.merge(toDict, fromDict);
            expect(toDict)
                .to.be.deep.equal({h: 'test', l: 'test'});
        });
        it('2 nested objects and modifications - clone deep', () => {
            let toDict = {h: {k: 'hk'}};
            let fromDict = {l: {k: 'hl'}};
            ObjectUtils.merge(toDict, fromDict);
            fromDict.l['m'] = 'hm';
            expect(toDict)
                .to.be.deep.equal({h: {k: 'hk'}, l: {k: 'hl'}});
        });
        it('1 object & null', () => {
            let toDict = {h: 'test'};
            let fromDict = null;
            ObjectUtils.merge(toDict, fromDict);
            expect(toDict)
                .to.be.deep.equal({h: 'test'});
        });
        it('2 objects & recursive', () => {
            let toDict = {a: 'test', b: {c: 'test', e: null} };
            let fromDict = {b: {c: 'test2', d: 'test', e: 'test'}};
            ObjectUtils.merge(toDict, fromDict, true);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test2', d: 'test', e: 'test'}});
        });
        it('2 objects, object arrays & recursive', () => {
            let toDict = {a: 'test', b: {c: 'test', e: [{g: 'test'}, {h: 'test'}]} };
            let fromDict = {b: {c: 'test2', d: 'test2', e: [{g: 'test2'}, {k: 'test2'}]}};
            ObjectUtils.merge(toDict, fromDict, true);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test2', d: 'test2', e: [{g: 'test2'}, {h: 'test', k: 'test2'}]}});
        });
        it('2 objects, object arrays & recursive & extendArray', () => {
            let toDict = {a: 'test', b: {c: 'test', e: [{g: 'test'}, {h: 'test'}]} };
            let fromDict = {b: {c: 'test2', d: 'test', e: [{g: 'test2'}, {k: 'test2'}]}};
            ObjectUtils.merge(toDict, fromDict, true, false, false, true);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test2', d: 'test',
                    e: [{g: 'test'}, {h: 'test'}, {g: 'test2'}, {k: 'test2'}]}});
        });
        it('2 objects, object arrays, additional attributes & recursive', () => {
            let toDict = {a: 'test', b: {c: 'test', e: [{g: 'test'}, {h: 'test'}]} };
            let fromDict = {b: {c: 'test2', d: 'test', e: [{g: 'test2'}, {k: 'test2'}, {l: 'test2'}]}};
            ObjectUtils.merge(toDict, fromDict, true);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test2', d: 'test', e: [{g: 'test2'}, {h: 'test', k: 'test2'}, {l: 'test2'}]}});
        });
        it('2 objects & non recursive', () => {
            let toDict = {a: 'test', b: {c: 'test', d: null} };
            let fromDict = {b: {c: 'test2'}};
            ObjectUtils.merge(toDict, fromDict, false);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test2'}});
        });
        it('2 objects, recursive & not override', () => {
            let toDict = {a: 'test', b: {c: 'test', e: null} };
            let fromDict = {b: {c: 'test2', d: 'test', e: 'test'}};
            ObjectUtils.merge(toDict, fromDict, true, true);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test', d: 'test', e: null}});
        });
        it('2 objects, recursive, non override, ignoreNull', () => {
            let toDict = {a: 'test', b: {c: 'test', e: null} };
            let fromDict = {b: {c: 'test2', d: 'test', e: 'test'}};
            ObjectUtils.merge(toDict, fromDict, true, true, true);
            expect(toDict)
                .to.be.deep.equal({a: 'test', b: {c: 'test', d: 'test', e: 'test'}});
        });
        it('2 objects with complex object', () => {
            let toDict = {a: '1', b: {c: '1', e: null}, f: [{g: '1'}] };
            let fromDict = {b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}] };
            ObjectUtils.merge(toDict, fromDict);
            expect(toDict)
                .to.be.deep.equal({a: '1', b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}]});
        });
        it('2 objects, recursive, non override, ignoreNull, extend array', () => {
            let toDict = {a: '1', b: {c: '1', e: null}, f: [{g: '1'}] };
            let fromDict = {b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}] };
            ObjectUtils.merge(toDict, fromDict, true, true, true, true);
            expect(toDict)
                .to.be.deep.equal({a: '1', b: {c: '1', d: '2', e: '2'}, f: [{g: '1'}, {g: '2'}]});
        });
        it('2 objects, recursive, non override, ignoreNull, extend array', () => {
            let toDict = {a: '1', b: {c: '1', e: null}, f: [{g: '1'}] };
            let fromDict = {b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}] };
            ObjectUtils.merge(toDict, fromDict, true, true, false, true);
            expect(toDict)
                .to.be.deep.equal({a: '1', b: {c: '1', d: '2', e: null}, f: [{g: '1'}, {g: '2'}]});
        });

    });
});
