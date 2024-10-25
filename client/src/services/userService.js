import * as request from '../utils/request'

export const getUser = async () => {
    try {
        const res = await request.get('/user/account');
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}