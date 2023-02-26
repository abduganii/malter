import express from "express";
import cors from "cors"
import multer from "multer";
const app = express()
const PORT = process.env.PORT || 5555


const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null,"uploads")
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage })


app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send("ok")
})

app.post('/upload', upload.single('image'), (req, res)=> {
    res.json({
      url:`/uploads/${req.file.originalname}`
    })
})


app.listen('5555', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Server is running in http://localhost:${PORT}`)
})