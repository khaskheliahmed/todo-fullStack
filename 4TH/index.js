import express from "express"
import cors from "cors"

const app = express()
const port = 1500


app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send(`<h1>Hello world </h1>`)
})

// todo app

const arr = [];

//add Todo
app.post("/todo", (req, res) => {
    const { title } = req.body

    console.log('request executed')

    if (!title) return res.status(404).json({
        message: "title is required"
    })

    const obj = {
        title,
        id: Date.now()
    }

    arr.push(obj)

    res.json({
        message: "todo added successfully",
        todo: obj
    })

})
  

// get todo

app.get('/todo', (req, res) =>{
    res.json({
        todos: arr
    })
} )

//delete request

app.delete('/todo/:id', (req, res) =>{
    const { id } = req.params;
    
    const index = arr.findIndex((item)=> item.id === +id);

    if(index === -1) return res.status(404).json({
        massage: "NO  Todo Found"
    })

    arr.splice(index , 1);
    res.json({
        massage: "todo delete Successfully"
    })

});

// edit todo

app.put('/todo/:id' , (req , res)=>{
    const {title} = req.body;
    const {id} = req.params;

    if(!title) return res.status(404).json({
        message: 'updated title is required'
    })

    const index = arr.findIndex((item) => item.id === +id);
    
    if(index === -1) return res.status(404).json({
        message: 'no todo found'
    })

    arr[index].title = title

    res.json({
        message: 'todo updated successfully'
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


