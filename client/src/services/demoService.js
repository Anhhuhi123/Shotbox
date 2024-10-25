import * as request from '../utils/request'

export const show = async (q = '', type = '') => {
    try {
        const response = await request.get('/users', {
            q,
            type,
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}