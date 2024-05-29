const { PermissionsBitField } = require('discord.js')
function detailedLog(client, message) {
    const time = () => {
        const date = new Date();
        const day = (`0` + date.getDate()).slice(-2);
        const month = (`0` + (date.getMonth() + 1)).slice(-2);
        const year = (`0` + date.getFullYear()).slice(-2);
        const dateFormat = `[${day}-${month}-${year}]`;

        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const timeFormat = `[${hours}:${minutes}]`;

        return dateFormat + ' ' + timeFormat;
    };
    return console.log(`${time()} [shard-${client.shard.mode}-${client.shard.ids}]: ` + message);
}

function hasPermission(client, channel, permission) {
    const getBitfield = (collection) => channel.permissionsFor(collection);
    const resolveBitfield = (collection) => new PermissionsBitField(BigInt(getBitfield(collection)));
    return resolveBitfield(client.user).has(permission)
};

module.exports = {
    detailedLog,
    hasPermission
}