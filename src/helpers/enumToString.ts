//conververt a enum to string

/** 
 * @param _enum Enum
 * @returns string type
 * @gist 
 */

export const EnumString = (_enum: object) =>
    Object.keys(_enum)
    .map(key => _enum[key])
    .filter(value => typeof value === 'string') as string[]