//是否显示（通用）
export enum IsShow {
    SHOW = 1,
    HIDDEN = 0
}
//是否启用
export enum IsOpen {
    OPEN = 1,
    CLOSE = 0
}
//需要的日期字符串类型
export enum DateStringType {
    ALL = 1,
    MON_D_H_MIN = 2,
    Y_M_D = 3,
    Y_M_D_H_M = 4,
    M_D = 5
}

export enum Gender {
    MALE = 0,
    FEMALE = 1,
    UNKNOWN = 2
}

export enum Vip {
    NORMAL = 0,
    MONTH = 1,
    SEASON = 2,
    YEAR = 2
}

export enum AccountStatus {
    NORMAL = 0,
    FORBIDDEN = 1,
    LOGOUT = 2,
}

export enum AccountRole {
    NORMAL = 0,
    ADMIN = 1,
    SUPER_ADMIN = 2,
}

export enum Auth {
    NORMAL = 0,
    OFFICIAL = 1,
    INSTITUTION = 2,
}

/**
 * @description: 与视频的交互类型
 */
export enum Interaction {
    LIKE = 0,
    DISLIKE = 1,
    COIN_ONE = 2,
    COIN_TWO = 3,
    COLLECT = 4,
    SHARE = 5,
    PLAY = 6,
}

/**
 * @description: 响应结果
 * @argument SUCCESS  请求成功
 * @argument EXPIRE   token请求失效或校验失败
 * @argument ERROR    请求错误
 * @argument TIMEOUT  请求超时
 * @argument TYPE     请求类型
 */
export const ResultEnum = {
    SUCCESS: 200,
    EXPIRE: [305, 601, 602],
    ERROR: -1,
    ERRMESSAGE: '请求失败',
    TIMEOUT: 25000,
    TYPE: 'success',
  } as const