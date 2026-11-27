import mysql from 'mysql2'

const pool = mysql.createPool ({

    host: 'localhost', 
    user: 'root',
    database: 'sistema_academico',
}).promise();

export async function testarConexao (){
    
    pool.getConnection()
    
}

export default pool