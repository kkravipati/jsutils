import chai from 'chai';
import {LangUtils} from '../dist/@modil-io/jsutils.js';
import { Exception } from 'handlebars';

const expect = chai.expect;

describe('LangUtils tests', () => {
    describe('scriptExecute', () => {
        it('function', () => {
            expect(LangUtils.scriptExecute(x => x * x, 0, 2))
                .to.equal(4);
        });
        it('function missing agruments', () => {
            expect(LangUtils.scriptExecute(x => {
                if (x === undefined) {
                    throw new Exception('missing args!!');
                }
                return x * x;
            }, 0))
                .to.equal(0);
        });
        it('invalid function', () => {
            expect(LangUtils.scriptExecute(null, 0))
                .to.equal(0);
        });
        it('invalid function and no default value', () => {
            expect(LangUtils.scriptExecute())
                .to.equal(undefined);
        });
    });

    describe('isArray', () => {
        it('string', () => {
            expect(LangUtils.isArray('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isArray(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isArray(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isArray(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isArray(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isArray(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isArray(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isArray(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isArray(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isArray(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isArray({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isArray(['a', '1']))
                .to.be.true;
        });
        it('empty array', () => {
            expect(LangUtils.isArray([]))
                .to.be.true;
        });
    });

    describe('isBoolean', () => {
        it('string', () => {
            expect(LangUtils.isBoolean('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isBoolean(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isBoolean(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isBoolean(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isBoolean(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isBoolean(true))
                .to.be.true;
        });
        it('date', () => {
            expect(LangUtils.isBoolean(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isBoolean(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isBoolean(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isBoolean(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isBoolean({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isBoolean(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isBoolean([]))
                .to.be.false;
        });
    });

    describe('isDate', () => {
        it('string', () => {
            expect(LangUtils.isDate('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isDate(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isDate(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isDate(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isDate(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isDate(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isDate(new Date()))
                .to.be.true;
        });
        it('button HTML', () => {
            expect(LangUtils.isDate(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isDate(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isDate(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isDate({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isDate(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isDate([]))
                .to.be.false;
        });
    });

    describe('isElement', () => {
        it('string', () => {
            expect(LangUtils.isElement('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isElement(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isElement(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isElement(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isElement(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isElement(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isElement(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isElement(document.createElement('BUTTON')))
                .to.be.true;
        });
        it('regexp', () => {
            expect(LangUtils.isElement(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isElement(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isElement({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isElement(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isElement([]))
                .to.be.false;
        });
    });

    describe('isEmpty', () => {
        it('null', () => {
            expect(LangUtils.isEmpty(null))
                .to.be.true;
        });
        it('undefined', () => {
            expect(LangUtils.isEmpty(undefined))
                .to.be.true;
        });
        it('empty object', () => {
            expect(LangUtils.isEmpty({}))
                .to.be.true;
        });
        it('non empty object', () => {
            expect(LangUtils.isEmpty({a: 'a'}))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isEmpty([]))
                .to.be.true;
        });
        it('empty string', () => {
            expect(LangUtils.isEmpty(''))
                .to.be.true;
        });
        it('empty string with space', () => {
            expect(LangUtils.isEmpty(' '))
                .to.be.false;
        });
    });

    describe('isFunction', () => {
        it('string', () => {
            expect(LangUtils.isFunction('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isFunction(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isFunction(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isFunction(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isFunction(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isFunction(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isFunction(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isFunction(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isFunction(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isFunction(x => x))
                .to.be.true;
        });
        it('object', () => {
            expect(LangUtils.isFunction({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isFunction(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isFunction([]))
                .to.be.false;
        });
    });

    describe('isNumber', () => {
        it('string', () => {
            expect(LangUtils.isNumber('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isNumber(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isNumber(k))
                .to.be.false;
        });
        it('sting - number', () => {
            expect(LangUtils.isNumber('1'))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isNumber(1))
                .to.be.true;
        });
        it('0', () => {
            expect(LangUtils.isNumber(0))
                .to.be.true;
        });
        it('true', () => {
            expect(LangUtils.isNumber(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isNumber(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isNumber(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isNumber(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isNumber(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isNumber({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isNumber(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isNumber([]))
                .to.be.false;
        });
    });

    describe('isNumberLike', () => {
        it('string', () => {
            expect(LangUtils.isNumberLike('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isNumberLike(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isNumberLike(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isNumberLike(1))
                .to.be.true;
        });
        it('0', () => {
            expect(LangUtils.isNumberLike(0))
                .to.be.true;
        });
        it('true == 1', () => {
            expect(LangUtils.isNumberLike(true))
                .to.be.true;
        });
        it('date == long value', () => {
            expect(LangUtils.isNumberLike(new Date()))
                .to.be.true;
        });
        it('button HTML', () => {
            expect(LangUtils.isNumberLike(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isNumberLike(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isNumberLike(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isNumberLike({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isNumberLike(['a', '1']))
                .to.be.false;
        });
        it('empty array == 0', () => {
            expect(LangUtils.isNumberLike([]))
                .to.be.true;
        });
    });

    describe('isObjectLike', () => {
        it('string', () => {
            expect(LangUtils.isObjectLike('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isObjectLike(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isObjectLike(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isObjectLike(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isObjectLike(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isObjectLike(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isObjectLike(new Date()))
                .to.be.true;
        });
        it('button HTML', () => {
            expect(LangUtils.isObjectLike(document.createElement('BUTTON')))
                .to.be.true;
        });
        it('regexp', () => {
            expect(LangUtils.isObjectLike(/[a-z]*/))
                .to.be.true;
        });
        it('function', () => {
            expect(LangUtils.isObjectLike(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isObjectLike({a: 'b'}))
                .to.be.true;
        });
        it('array', () => {
            expect(LangUtils.isObjectLike(['a', '1']))
                .to.be.true;
        });
        it('empty array', () => {
            expect(LangUtils.isObjectLike([]))
                .to.be.true;
        });
    });

    describe('isPlainObject', () => {
        it('string', () => {
            expect(LangUtils.isPlainObject('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isPlainObject(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isPlainObject(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isPlainObject(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isPlainObject(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isPlainObject(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isPlainObject(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isPlainObject(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isPlainObject(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isPlainObject(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isPlainObject({a: 'b'}))
                .to.be.true;
        });
        it('array', () => {
            expect(LangUtils.isPlainObject(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isPlainObject([]))
                .to.be.false;
        });
    });

    describe('isRegExp', () => {
        it('string', () => {
            expect(LangUtils.isRegExp('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isRegExp(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isRegExp(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isRegExp(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isRegExp(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isRegExp(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isRegExp(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isRegExp(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isRegExp(/[a-z]*/))
                .to.be.true;
        });
        it('function', () => {
            expect(LangUtils.isRegExp(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isRegExp({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isRegExp(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isRegExp([]))
                .to.be.false;
        });
    });

    describe('isString', () => {
        it('string', () => {
            expect(LangUtils.isString('a'))
                .to.be.true;
        });
        it('null', () => {
            expect(LangUtils.isString(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isString(k))
                .to.be.false;
        });
        it('number', () => {
            expect(LangUtils.isString(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isString(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isString(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isString(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isString(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isString(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isString(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isString({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isString(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isString([]))
                .to.be.false;
        });
    });

    describe('isUndefined', () => {
        it('string', () => {
            expect(LangUtils.isUndefined('a'))
                .to.be.false;
        });
        it('null', () => {
            expect(LangUtils.isUndefined(null))
                .to.be.false;
        });
        it('undefined', () => {
            var k;
            expect(LangUtils.isUndefined(k))
                .to.be.true;
        });
        it('number', () => {
            expect(LangUtils.isUndefined(1))
                .to.be.false;
        });
        it('0', () => {
            expect(LangUtils.isUndefined(0))
                .to.be.false;
        });
        it('true', () => {
            expect(LangUtils.isUndefined(true))
                .to.be.false;
        });
        it('date', () => {
            expect(LangUtils.isUndefined(new Date()))
                .to.be.false;
        });
        it('button HTML', () => {
            expect(LangUtils.isUndefined(document.createElement('BUTTON')))
                .to.be.false;
        });
        it('regexp', () => {
            expect(LangUtils.isUndefined(/[a-z]*/))
                .to.be.false;
        });
        it('function', () => {
            expect(LangUtils.isUndefined(x => x))
                .to.be.false;
        });
        it('object', () => {
            expect(LangUtils.isUndefined({a: 'b'}))
                .to.be.false;
        });
        it('array', () => {
            expect(LangUtils.isUndefined(['a', '1']))
                .to.be.false;
        });
        it('empty array', () => {
            expect(LangUtils.isUndefined([]))
                .to.be.false;
        });
    });

    describe('clone', () => {
        it('string', () => {
            expect(LangUtils.clone('a'))
                .to.equal('a');
        });
        it('nested array', () => {
            let source = ['a', 'c', 'b'];
            let clone = LangUtils.clone(source);
            source.push('d');
            expect(clone)
                .to.deep.equal(['a', 'c', 'b']);
        });
        it('nested array', () => {
            let source = ['a', 'c', ['b']];
            let clone = LangUtils.clone(source);
            source[2].push('d');
            expect(clone)
                .to.deep.equal(['a', 'c', ['b', 'd']]);
        });
        it('complex object', () => {
            let source = {a: 'a', b: {c: 'c', d: ['e', 'f']}, g: [{h: 'h'}, {k: 'k'}]};
            let clone = LangUtils.clone(source);
            source['b']['y'] = 'y';
            source['b']['d'].push('z');

            expect(clone)
                .to.deep.equal({a: 'a', b: {c: 'c', d: ['e', 'f', 'z'], y: 'y'}, g: [{h: 'h'}, {k: 'k'}]});
        });
    });

    describe('cloneDeep', () => {
        it('string', () => {
            expect(LangUtils.cloneDeep('a'))
                .to.equal('a');
        });
        it('nested array', () => {
            let source = ['a', 'c', ['b']];
            let clone = LangUtils.cloneDeep(source);
            source[2].push('d');
            expect(clone)
                .to.deep.equal(['a', 'c', ['b']]);
        });
        it('complex object', () => {
            let source = {a: 'a', b: {c: 'c', d: ['e', 'f']}, g: [{h: 'h'}, {k: 'k'}]};
            let clone = LangUtils.cloneDeep(source);
            source['b']['y'] = 'y';
            source['b']['d'].push('z');

            expect(clone)
                .to.deep.equal({a: 'a', b: {c: 'c', d: ['e', 'f']}, g: [{h: 'h'}, {k: 'k'}]});
        });
    });

    describe('isEqual', () => {
        it('dict compare', () => {
            expect(LangUtils.isEqual({ 'a': 'b' }, { 'a': 'b' }))
                .to.equal(true);
        });
        it('String check', () => {
            expect(LangUtils.isEqual('a', 'a'))
                .to.equal(true);
        });
        it('String with space', () => {
            expect(LangUtils.isEqual('a', 'a '))
                .to.equal(false);
        });
        it('String & number', () => {
            expect(LangUtils.isEqual('1', 1))
                .to.equal(false);
        });
        it('null check', () => {
            expect(LangUtils.isEqual(null, null))
                .to.equal(true);
        });
        it('undefined check', () => {
            expect(LangUtils.isEqual(undefined, undefined))
                .to.equal(true);
        });
        it('null & undefined', () => {
            expect(LangUtils.isEqual(null, undefined))
                .to.equal(false);
        });
    });

    describe('query', () => {
        it('object dot notation nested path', () => {
            expect(LangUtils.query({'a': {'b': 'c'}}, 'a.b'))
                .to.equal('c');
        });
        it('object nested path array', () => {
            expect(LangUtils.query({'a': {'b': 'c'}}, ['a', 'b']))
                .to.equal('c');
        });
        it('object array dot notation nested path', () => {
            expect(LangUtils.query({'a': ['b', 'c']}, 'a[1]'))
                .to.equal('c');
        });
        it('object array nested path array', () => {
            expect(LangUtils.query({'a': ['b', 'c']}, ['a', 1]))
                .to.equal('c');
        });
        it('object array nested path array', () => {
            expect(LangUtils.query(undefined, ['a', 1]))
                .to.equal(null);
        });
        it('object array nested path array', () => {
            expect(LangUtils.query(null, 'a'))
                .to.equal(null);
        });
    });
    describe('omitDeep', () => {
        it('object with one key', () => {
            expect(LangUtils.omitDeep({'a': {'b': 'c'}}, 'b'))
                .to.deep.equal({'a': {} });
        });
        it('object with non existing key', () => {
            expect(LangUtils.omitDeep({'a': {'b': 'c'}}, 'c'))
                .to.deep.equal({'a': {'b': 'c'}});
        });
        it('object with non existing keys', () => {
            expect(LangUtils.omitDeep({'a': {'b': 'c'}}, 'c', 'd', 'e'))
                .to.deep.equal({'a': {'b': 'c'}});
        });
        it('object with  null && undefined keys', () => {
            expect(LangUtils.omitDeep({'a': {'b': 'c'}}, undefined, null))
                .to.deep.equal({'a': {'b': 'c'}});
        });
    });
});
