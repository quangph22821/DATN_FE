import instance from "."

 export const getAdd= (body:any)=>{
   console.log(body);
    return instance.post("comment/add",body)
 }
 export const getAlll= ()=>{
    return instance.get("comment")
 }
 export const getdelete=(id:any)=>{
  console.log(id)
   return instance.delete(`comment/${id}`)
 }