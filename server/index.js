import express from 'express';
import mongoose from 'mongoose';
import User from './schema/User.js';
const app = express()
const port = 4000;
import bcrypt from 'bcrypt';
const saltRounds = 10;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  
    next()
  })


main().catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb+srv://jjdcooper6:thispasswordlol@cluster0.a0mzbzj.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log("CONNECTED TO DB NICE")
});

// use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
app.use(express.urlencoded())
app.use(express.json())


app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.post('/login-user', async (request, response) => {
    const loginReqData = request.body;

    const userFromDB = await User.findOne({username: loginReqData?.username})
    console.log("****user from db", userFromDB)

//   Now we have the user from database
// Lets compare the passwords 

    // compare encrpyted password in DB with plain text sent in request

    const passwordCheckResult = await bcrypt.compare(loginReqData.password, userFromDB.password)

    console.log("***DID WE SEND CORRECT ONE?", passwordCheckResult)
    if (passwordCheckResult !== true) {
        response.send({SHIT: true})
    } else {
        response.send({success: true, user: userFromDB})
    }

})


app.post('/register-user', async (request, response) => {
    try {
        const dataWeReceived = request.body;
          console.log("*NICEEEE", dataWeReceived?.username?.lol)
        
          const encrpyredPassword = await bcrypt.hash(dataWeReceived.password, saltRounds)
        
          const newUser = await User.create({
            username: dataWeReceived?.username,
            password: encrpyredPassword,
          })
        
          console.log("***NEW USER", newUser)
        //   User.create({
        //     username: dataWeReceived?.username,
        //   })
        
          response.status(200).send({user: newUser})
    } catch(err) {
        console.log("***ERROR", err);
        response.send({weFuckedUp: true})
    }
})

app.listen(port, () => {
  console.log(`Hey yall, app listening on port ${port}`)
})