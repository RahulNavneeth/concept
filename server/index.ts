import { Server } from "socket.io"

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let data: any = {}

io.on("connection", (socket) => {
    console.log("New connection sustained")

    socket.on('concepts', () => {
        io.emit('fetch-concepts', data)
    })

    socket.on('concept-init', (res: {id: string, data: any, usid: string}) => {
        if(!(res.id in data)) {
            data[res.id] = ["( UNTITLED )", res.data, {}];
        }
        data[res.id][2][res.usid] = [{x: 0, y: 0}];
        io.emit(`concept-receive-${res.id}`, data[res.id]);
    });

    socket.on('on-draw', (res: {id: string, name: string, data: any}) => {
        data[res.id][1] = res.data
        console.log(data)
        io.emit(`concept-receive-${res.id}`, data[res.id]);
    })

    socket.on('change-name', (res :{id: string, name: string}) => {
        if(res.id in data){
            data[res.id][0] = res.name;
            io.emit(`concept-receive-${res.id}`, data[res.id]);
        }
    })

    socket.on('change-user-curosr', (res :{id: string, coords: {x: number, y: number}, usid: string}) => {
        if(res.id in data){
            data[res.id][2][res.usid][0] = res.coords;
            io.emit(`concept-receive-${res.id}`, data[res.id]);
        }
    })
})

io.listen(5174)
