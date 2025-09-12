from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app= FastAPI(title="Task Manager Pro API")

# Add CORS middleware to allow requests from any origin (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id:int
    title:str
    done:bool=False

class TaskCreate(BaseModel):
    title:str

class TaskUpdate(BaseModel):
    done:bool

tasks:List[Task]=[]
next_id=1

@app.get("/api/tasks",response_model=List[Task])
def get_tasks():
    return tasks

@app.post("/api/tasks",response_model=Task)
def add_task(task: TaskCreate):
    global next_id
    new_task=Task(id=next_id, title=task.title,done=False)
    tasks.append(new_task)
    next_id+=1
    return new_task

@app.patch("/api/tasks/{task_id}", response_model=Task)
def update_task(task_id:int, update:TaskUpdate):
    for t in tasks:
        if t.id==task_id:
            t.done=update.done
            return t
        
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id:int):
    global tasks
    tasks=[t for t in tasks if t.id!=task_id]
    return {"message":"Task deleted"}