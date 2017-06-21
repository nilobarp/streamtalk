import * as util from 'util';

let userSerializer = (user: any) => {
    return util.format('%s/%s', user.username, '*****');
};

export {
    userSerializer
};