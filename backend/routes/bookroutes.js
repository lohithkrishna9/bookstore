import express from 'express'
import {Book} from '../models/bookmodel.js'
const router=express.Router()
router.post('/',async(request,response)=>{
  try{
    const{title,author,publishingyear}=request.body
    if(!request.body.title || !request.body.author||!request.body.publishingyear)
  {
    return response.status(400).send({
      message:'Send all required feilds:title,author,publishingyear'
    });
  }
  const newBook=await Book.create({title,author,publishingyear});

  return response.status(201).json(newBook);
}

  catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
  }

});
router.get('/',async(request,response)=>{
  try{
    const books=await Book.find({});
    return response.status(200).json(books);
  } catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});

  }
});
router.get('/:id',async(request,response)=>{
  try{
    const {id}=request.params;
    const book= await Book.findById(id);
    return response.status(200).json(book);
  }catch{
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
});
router.put('/:id',async(request,response)=>{
  try{if(
    !request.body.title||
    !request.body.author||
    !request.body.publishingyear
  ){
    return response.status(400).send({
      message:'send all required feilds: title,author,publishingyear'
    });
  }
const{id}=request.params;
const result=await Book.findByIdAndUpdate(id,request.body);
if(!result){
  return response.status(404).json({message:'Book not found'});
}
return response.status(200).send({
message:"book updated sucessfully"
});}
  catch{console.log(error.message);
    response.status(500).send({message:error.message});}
});
router.delete("/:id",async(request,response)=>{
  try{
    const {id}=request.params;
    const result=await Book.findByIdAndDelete(id);
    if(!result){
      return response.status(404).json({message:'Book not found'});
    }return response.status(200).send({message:'Book deleted sucessfully'});
  }
  catch{
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
});
export default router;