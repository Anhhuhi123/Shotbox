import db from '../../config/database.js'
const User = {
    getAllUsername: async () => {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query);
        return rows;
    },
    findByUsername: async (data) => {
        const username = data;
        const query = 'SELECT * FROM users WHERE name = ?';
        const [rows] = await db.query(
            query, [username]
        );
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    // hoi tai sao lai viet  const email = data; ma khong ghi nhieu mien ra data o day la gi?
    findByEmail: async (data) => {
        const email = data;
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(
            query, [email]
        );
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    //loi roldid van chua cap nhap thanh cong 
    update: async (data) => {
        const { id, name, email, password, roldId } = data;
    
        // Khởi tạo câu truy vấn động và mảng các tham số
        let query = 'UPDATE users SET ';
        const fields = [];
        const values = [];
    
        // Chỉ thêm các trường có giá trị mới vào câu truy vấn và mảng tham số
        if (name !== undefined) {
            fields.push('name = ?');
            values.push(name);
        }
        if (email !== undefined) {
            fields.push('email = ?');
            values.push(email);
        }
        if (password !== undefined) {
            fields.push('password = ?');
            values.push(password);
        }
        if (roldId !== undefined) {
            fields.push('roldId = ?');
            values.push(roldId);
        }
    
        // Kết hợp các trường vào câu truy vấn
        query += fields.join(', ') + ' WHERE id = ?';
        values.push(id); // Thêm ID vào cuối mảng để so khớp trong điều kiện WHERE
    
        // Thực thi truy vấn với các tham số được xác định
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? { id, name, email, password, roldId } : null;  
    },
    
    create: async (data) => {
        const { name, email, password,roldid } = data;
        const query = 'INSERT INTO users (name, email, password, roldid) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(
            query, [name, email, password,roldid]
        );
        return result.insertId;
    },
}

export default User;