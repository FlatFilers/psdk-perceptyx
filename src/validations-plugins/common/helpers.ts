import * as FF from '@flatfile/configure';
import { FlatfileRecord } from '@flatfile/hooks';

/*
 * Types
 */

type Nil = null | undefined;

type Falsy = null | undefined | false | '' | 0;

/*
 * Guards
 */

/**
 * Helper function to determine if a value is null.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isNull(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isNull = (x: unknown): x is null => x === null;

/**
 * Helper function to determine if a value is undefined.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isUndefined(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isUndefined = (x: unknown): x is undefined => x === undefined;

/**
 * Helper function to determine if a value is null, undefined or an empty string.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isNil(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isNil = (x: unknown): x is Nil =>
  isNull(x) || isUndefined(x) || (isString(x) && x.trim() === '');

/**
 * Helper function to determine if a value is NOT null or undefined.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isNotNil(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isNotNil = <T>(x: T | Nil): x is T => !isNil(x);

/**
 * Helper function to determine if a value is falsy.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isFalsy(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isFalsy = (x: unknown): x is Falsy =>
  x === 0 || Number.isNaN(x) || x === false || isNil(x);

/**
 * Helper function to determine if a value is truthy.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isTruthy(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isTruthy = (x: unknown): x is true => !isFalsy(x);

/**
 * Helper function to determine if a value is a string.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isString(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isString = (x: unknown): x is string => typeof x === 'string';

/**
 * Helper function to determine if a value is a number.
 * Useful in if/else statements or ternaries.
 *
 * @param {*} x - Any object/value
 *
 * @example
 * if (isNumber(x)) {
 *   ...
 * } else {
 *   ...
 * }
 */
export const isNumber = (x: unknown): x is number => typeof x === 'number';

/*
 * Helpers
 */

/**
 * Easily pass the result of one function to the input of another.
 *
 * @example
 * pipe(fn1, fn2, ...);
 */
export const pipe = (...fns: Array<any>) => fns.reduce((acc, fn) => fn(acc));

/**
 * Converts `String.prototype.toLowerCase()` to a normal fn so it can be used with `pipe`.
 *
 * @param {string} value - value to apply operation.
 *
 * @example
 * pipe(value, toLowerCase);
 */
export const toLowerCase = (value: string): string => value.toLowerCase();

/**
 * Converts `String.prototype.trim()` to a normal fn so it can be used with `pipe`.
 *
 * @param {string} value - value to apply operation.
 *
 * @example
 * pipe(value, trim);
 */
export const trim = (value: string): string => value.trim();

/**
 * Allows us to combine multiple validations in a quick and easy way.
 *
 * @example
 * runValidations(fn1, fn2, fn3, ...);
 */
export const runValidations = (...fns: Array<any>): Array<FF.Message> => {
  return fns.reduce((acc, fn) => [...acc, fn()], []).filter(isNotNil);
};

/**
 * Allows us to sequence multiple RecordHooks _synchronously_ on a `FlatfileRecord`.
 *
 * @example
 * runRecordHooks(fn1, fn2, fn3, ...)(record)
 */
export const runRecordHooks =
  (...fns: Array<(x: FlatfileRecord) => void>) =>
  (x: FlatfileRecord) =>
    fns.map((f) => f(x));
