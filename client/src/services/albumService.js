import * as request from '../utils/request';
export const showAllAlbums = async () => {
    try {
        const res = await request.get('/album');
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const showAlbumDetail = async (urlParams) => {
    try {
        const res = await request.get(`/album/${urlParams}`);
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const createAlbum = async (value) => {
    try {
        const res = await request.post('/album', value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updateAlbum = async (idAlbum, value) => {
    try {
        const res = await request.put(`/album/${idAlbum}`, value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const deleteAlbum = async (imgId) => {
    try {
        const res = await request.deleteRequest(`/album/${imgId}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const showImgFromAlbum = async (urlParams) => {
    try {
        const res = await request.get(`/album/images/${urlParams}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const addImgToAlbum = async (value) => {
    try {
        const res = await request.post('/album/images', value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const addMultipleImgToAlbum = async (value) => {
    try {
        const res = await request.post('/album/images/multiple', value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const deleteMultipleImgFromAlbum = async (value) => {
    try {
        const res = await request.post('/album/images/delete/multiple', value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const deleteImgFromAlbum = async (idAlbumImg) => {
    try {
        const res = await request.deleteRequest(`/album/images/${idAlbumImg}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


