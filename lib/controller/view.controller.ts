import {Request, Response} from 'express'
import {Blog} from "../models/blog.model";


export default class ViewController {
    public getIndex(req: Request, res: Response) {
        res.render('index',{title:'Mapstrip Online'});
    }
    public getBlog(req:Request, res: Response){
        Blog.findAll().then(blogs=>{
            res.render('blog',{title:'Blog',blogs:blogs});
        }).catch(err=>console.log(err));

    }
    public getBlogDetail(req:Request,res:Response){
        const stub=req.params.stub;
        Blog.findOne({where:{stub:stub}}).then(blog=>{
            console.log(blog);
            console.log(blog.data);
            res.render('blog-detail',{title:blog.title,blog:blog});
        }).catch(err=>console.log(err));
    }
}
