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
export const updatePassword = async (value) => {
    try {
        const res = await request.put(`/user/password`, value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateEmail = async (value) => {
    try {
        const res = await request.put(`/user/email`, value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}