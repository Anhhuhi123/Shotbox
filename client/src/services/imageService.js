import * as request from '../utils/request';
export const showAllImages = async () => {
    try {
        const res = await request.get('/images');
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const createImage = async (value) => {
    try {
        const res = await request.post('/images', value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}