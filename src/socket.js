const socketio = require('socket.io');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', (socket) => {
        const { latitude, longitude, techs } = socket.handshake.query;
    });
};

// exports.findConnections = (coordinates, techs) => {
//   return connections.filter((connection) => {
//     return (
//       getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10 &&
//       connection.techs.some((item) => techs.includes(item))
//     );
//   });
// };

exports.sendMessage = (to, message, data) => {
    to.forEach((connection) => {
        io.to(connection.id).emit(message, data);
    });
};
