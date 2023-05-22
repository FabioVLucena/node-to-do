import Task from '../models/task'
import database from './database'

const tasksRepository = {

    criar: (task: Task, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO task (descricao) VALUES (?)'
    
        const params = [task.descricao]
    
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },

    lerTodos: (callback: (tasks: Task[]) => void) => {
        const sql = 'SELECT * FROM task'
        const params: any[] = []
        database.all(sql, params, (_err, rows: Task[]) => callback(rows))
    },

    ler: (id: number, callback: (task?: Task) => void) => {
        const sql = 'SELECT * FROM task WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row: Task) => callback(row))
    },

    atualizar: (id: number, task: Task, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE task SET descricao = ? WHERE id = ?'
        const params = [task.descricao, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },

    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM task WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },

}

export default tasksRepository;