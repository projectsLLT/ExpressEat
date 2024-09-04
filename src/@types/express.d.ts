type Usuario = {
    id:string;
  }
  
  declare namespace Express{
    export interface Request{
      user:Usuario;
    }
  }