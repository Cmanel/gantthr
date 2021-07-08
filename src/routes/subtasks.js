import fs from 'fs';
import filter from 'lodash/filter';
import Logger from '../lib/logger';
import db from '../lib/mssql-lifecyle';

const Subtask = db.subtask;

const logger = Logger(module);

const getAllSubtasks = async () =>{
  return Subtask.findAll();
}

const getSubtask = async (id) =>{
  return Subtask.findByPk(id);
}

const addSubtask = async (subtask) =>{
  console.log("post recu");
  
  console.log(subtask.subTaskStartDate);
  subtask.subTaskStartDate = new Date(subtask.subTaskStartDate+" GMT");
  console.log(subtask.subTaskStartDate);
  subtask.subTaskEndDate =  new Date(subtask.subTaskEndDate+" GMT");
  return Subtask.create(subtask)
}

const updateSubtask = async (subtask,id) =>{
  return Subtask.update(subtask, {
    where: { id: id }
  });
}

const deleteSubtask = async (subtask,id) =>{
  return Subtask.destroy({
    where: { id: id }
  });
}


export default getSubtask;
export { getAllSubtasks, getSubtask,addSubtask, updateSubtask,deleteSubtask};
