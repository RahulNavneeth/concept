import { Server } from "socket.io"
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import {CLIENT_URL} from "./utils/constants";

import { PrismaClient, User } from '@prisma/client'
import {planeCanvas} from "./utils/planeCanvas";
import {authenticateToken} from "./utils/authToken";

const prisma = new PrismaClient()

const app = express();
app.use(cors({
    credentials: true,
    origin : CLIENT_URL
}), bodyParser.json(), cookieParser())


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin : CLIENT_URL
    }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/profile', authenticateToken,  async(req, res) => {
    const data = await prisma.user.findUnique({
        where: {
            //@ts-ignore
            email: req.user.email
        },
        include: {
            concept: {
                include: {
                    concept : true
                }
            }
        }
    })

    // @ts-ignore
    const {password, ...rem} = data
    res.status(200).json(rem)
});

app.post("/login", async(req, res) => {
    const { data } = req.body
    const response = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(!response) {
        res.status(404).json({message: "USER NOT FOUND", status: 404})
    }else{
        if(response?.password !== data.password){
            res.status(404).json({message: "INVALID PASSWORD", status: 401})
        }else{
            const token = jwt.sign({
                email: response?.email
            }, "RAHULNAVNEETH-SURFACE")
            res.cookie("surface_token", token, {httpOnly: true}).json({
                email: response.email,
                token
            })
        }
    }
    
})

io.on("connection", (socket) => {
    console.log("New connection sustained")

    socket.on('concept-init', async(res: {id: string, name: string, usid: string}) => {
        socket.emit(`on-init-${res.id}`);
        const isExist = await prisma.concept.findUnique({
            where: {
                id: res.id
            }
        })
        if(!isExist){
            await prisma.concept.create({
                data : {
                    id: res.id,
                    metadata: planeCanvas,
                    name: "( UNTITLED )",
                    user: {
                        create: {
                            xMouse: 100,
                            yMouse: 100,
                            isEdit: true,
                            isOwner: true,
                            userId: res.usid
                        }
                    }
                }
            })
        }else{
            const userExist = await prisma.userConcept.findFirst({
                where: {
                    conceptId: res.id,
                    userId: res.usid,
                }
            })

            if(!userExist){
                await prisma.userConcept.create({
                    data: {
                        xMouse: 100,
                        yMouse: 100,
                        conceptId: res.id,
                        userId: res.usid,
                        isEdit: false,
                        isOwner: false,
                    }
                })
            }
        }

        const data = await prisma.concept.findUnique({
            where: {
                id: res.id,
            },
            include: {
                user: {
                    include: {
                        user : true
                    }
                }
            }
        })
        socket.broadcast.emit(`on-notif-${res.id}`, {message: `${res.name.toUpperCase()} JOINED`,type: "SUCCESS", show: true});
        io.emit(`concept-init-${res.id}`, data);
    });

    socket.on('on-draw', async(res: {id: string, data: any}) => {
        io.emit(`concept-receive-${res.id}`, res.data);
    })

    socket.on("save-concept", async(res) => {
        const data = await prisma.concept.update({
            where: {
                id: res.id
            },
            data: {
                metadata: res.data
            }
        })
        console.log(data)
    })
    //
    // socket.on('change-name', (res :{id: string, name: string}) => {
    //     if(res.id in data){
    //         data[res.id][0] = res.name;
    //         io.emit(`concept-receive-${res.id}`, data[res.id]);
    //     }
    // })

    socket.on('change-user-curosr', (res :{id: string, coords: {x: number, y: number}, usid: string}) => {
        io.emit(`change-user-cursor-${res.id}`, {coords: res.coords, usid: res.usid});
    })

    socket.on('request-access', (res :{id: string, ownerId: string, user: any}) => {
        io.emit(`notify-request-access-${res.id}-${res.ownerId}`, {message: `${res.user.username.toUpperCase()} REQUESTS EDIT ACCESS!`, userId: res.user.id});
    })

    socket.on("accept-access", async(res) => {
        const data = await prisma.userConcept.update({
            where: {
                id: res.userConceptId
            },
            data: {
                isEdit: true
            }
        })
        io.emit(`allow-access-${res.id}`, {requestId: res.requestUserId});
        socket.broadcast.emit(`on-notif-${res.id}-${res.requestUserId}`, {message: `EDIT ACCESS ACCEPTED`,type: "SUCCESS", show: true}, "EDIT_ACCESS");
    })
})

server.listen(5174, () => {
    console.log('listening on *: 5174');
});


