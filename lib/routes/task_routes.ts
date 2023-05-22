import { Application, Request, Response } from 'express';
import tasksRepository from '../repositories/tasks_repository';
import Task from '../models/task';

export class TaskRoutes {

    public route(app: Application) {

        app.get('/api/tasks', (req: Request, res: Response) => {
            tasksRepository.lerTodos((tasks) => res.status(200).json(tasks))
        });
        
        app.get('/api/tasks/:id', (req: Request, res: Response) => {
            const id: number = +req.params.id;

            tasksRepository.ler(id, (task) => {
                if (task) {
                    res.status(200).json(task)
                } else {
                    res.status(404).send()
                }
            })
        });
       
        app.post('/api/tasks', (req: Request, res: Response) => {
            const task: Task = req.body;

            tasksRepository.criar(task, (id) => {
                if (id) {
                    res.status(201).location(`/api/tasks/${id}`).send()
                } else {
                    res.status(400).send()
                }
            })
        });
       
        app.put('/api/tasks/:id', (req: Request, res: Response) => {
            const id: number = +req.params.id;

            tasksRepository.atualizar(id, req.body, (notFound) => {
                if (notFound) {
                    res.status(404).send()
                } else {
                    res.status(204).send()
                }
            })
        });
        
        app.delete('/api/tasks/:id', (req: Request, res: Response) => {
            const id: number = +req.params.id;
            
            tasksRepository.apagar(id, (notFound) => {
                if (notFound) {
                    res.status(404).send()
                } else {
                    res.status(204).send()
                }
            })
        });
    }
 }