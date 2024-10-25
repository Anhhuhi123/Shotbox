import db from '../../config/database.js'
const Image = {
    getAllImages: async () => {
        const query = 'SELECT * FROM images';
        const [rows] = await db.query(query);
        return rows;
    },
    create: async (data) => {
        const { url } = data;
        const query = 'INSERT INTO images (url) VALUES (?)';
        const [result] = await db.query(
            query, [url]
        );
        return result.insertId;
    },
}

export default Image;