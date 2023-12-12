const { PermissionsBitField } = require('discord.js')

function detailedLog(client, data) {
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
    return console.log(`${time()} [shard-${client.shard.mode}-${client.shard.ids}]: ` + data);
}

function hasPermission(client, channel, permission) {
    const getBitfield = (collection) => channel.permissionsFor(collection);
    const resolveBitfield = (collection) => new PermissionsBitField(BigInt(getBitfield(collection)));
    if (resolveBitfield(client.user).has(permission)) {
        return true;
    } else {
        return false;
    };
};

module.exports = {
    detailedLog,
    hasPermission
}