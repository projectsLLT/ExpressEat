type Usuario = {
    _id:string;
  }
  
  declare namespace Express{
    export interface Request{
      user:Usuario;
    }
  }