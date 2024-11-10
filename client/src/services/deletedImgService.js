import * as request from '../utils/request';
export const showDeletedImages = async () => {
    try {
        const res = await request.get('/deleted/images');
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const removeDeletedImage = async (idDeletedImage) => {
    try {
        const res = await request.deleteRequest(`/deleted/images/${idDeletedImage}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const restoreDeletedImage = async (idDeletedImage) => {
    try {
        const res = await request.deleteRequest(`/deleted/images/restore/${idDeletedImage}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


