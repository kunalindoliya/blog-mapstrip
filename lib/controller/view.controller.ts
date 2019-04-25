import {Request, Response} from 'express'


export default class ViewController {
    public getIndex(req: Request, res: Response) {
        res.render('index',{title:'Mapstrip Online'});
    }
    public getBlog(req:Request, res: Response){
        res.render('blog',{title:'Blog'});
    }
}
