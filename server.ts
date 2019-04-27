import app from './app'
import sequelize from './lib/util/database';

const port = 3000;

sequelize
    //.sync({force:true})
    .sync()
    .then(result=>{
    app.listen(port);
}).catch(err=>{console.log(err)});

