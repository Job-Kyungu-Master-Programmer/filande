const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

// Activated json-[parser]
app.use(express.json())

const requestLogger = (request,response,next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    next()
}

app.use(requestLogger)

const unkownEnd = (request,response) => {
    response.status(404).send({error: "Cette page n'existe pas !"})
}

let notes  = [
    {
        id: 1,
        content: "Html est la base du developpement",
        important: true
    },
    {
        id: 2,
        content: "Css et le Sass sont vraiment magnifique",
        important: true
    },
    {
        id: 3,
        content: "React js est le meilleur des framework JS",
        important: true
    },
    {
        id: 4,
        content: "Node js reste le meilleur language backend",
        important: true
    }
]

app.get('/', (request,response) => {
    response.send('<h1>App Node JS</h1>')
})

app.get('/api/notes', (request,response) => {
    response.json(notes)
})

//GenerateId 
const generateId = () => {
    const genId = notes.length > 0 ?
    Math.random(...notes.map(n => n.id)) : 0
    return genId + 1
}

app.post('/api/notes', (request,response) => {
    const body = request.body
    
    if(!body.important) {
        return response.status(400).json({
            error: 'Une erreur c\'est produite '
        })
    }

    const noteData = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    noteSend = notes.concat(noteData)
    response.json(noteSend)
})

app.get('/api/notes/:id', (request,response) => {
    const noteId = Number(req.params.id)
    const noteTab = notes.find(n => n.id === noteId)

    if(noteTab) { 
        response.json(noteTab)
    }else {
        response.status(404).end('Not Found Element File')
    }
})

app.delete('/api/notes/:id' , (request,response) => {
    const noteIdDel = Number(request.params.id)
     notes = notes.filter(note => note.id !== noteIdDel)
    response.status(204).end()
})

app.use(unkownEnd)


const PORT= process.env.PORT || 1000
app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}`)
})