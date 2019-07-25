import localForage from "localforage";
import serverList from "../data/serverList.json";

const baseKey = "MI_Actress_";
const lastUpdateKey = baseKey + "LastUpdate";
const serverKey = baseKey + "Server";

var data = {};

var getAllServers = function () {
    return serverList;
}
var getDefaultServer = function () {
    return _.find(getAllServers(), function (o) { return o.isDefault });
}
var getCurrentServer = function () {
    var currentServerID = localStorage.getItem(serverKey);
    if (!currentServerID) {
        return getDefaultServer();
    }
    var current = _.find(getAllServers(), function (o) { return o.id == currentServerID });
    return current || getDefaultServer();
}
var setCurrentServer = function (id) {
    var server = getAllServers()[id] || getDefaultServer();
    localStorage.setItem(serverKey, server.id);
}

var init = function (forceInit) {
    forceInit = !!forceInit;
    var folder = getCurrentServer().folder;
    var store = localForage.createInstance({
        name: baseKey + folder
    });
    return isDataOutdated().then(function (needForceUpdate) {
        var promises = [];
        if (!forceInit && !needForceUpdate) {
            console.log("All data cached. ", folder);
            var loaddata = function (key) {
                return store.getItem(baseKey + key).then(json => {
                    data[key] = JSON.parse(json);
                });
            };
            promises.push(loaddata('actress'));
            promises.push(loaddata('exactress'));
            promises.push(loaddata('chara'));
            promises.push(loaddata('weapon'));
            promises.push(loaddata('equipment'));
            promises.push(loaddata('skillactive'));
            promises.push(loaddata('skillpassive'));
            promises.push(loaddata('costume'));
            promises.push(loaddata('accessory'));
            promises.push(loaddata('combo'));
            return Promise.all(promises);
        }
        return store.clear().then(() => {
            var savedata = function (key, server, jsondata) {
                return store.setItem(baseKey + key, JSON.stringify(jsondata), function () {
                    console.log("Get data from web. ", server, key);
                    data[key] = jsondata;
                });
            }
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/actress.json').then(jsondata => {
                    return savedata('actress', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/exactress.json').then(jsondata => {
                    return savedata('exactress', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/chara.json').then(jsondata => {
                    return savedata('chara', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/weapon.json').then(jsondata => {
                    return savedata('weapon', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/equipment.json').then(jsondata => {
                    return savedata('equipment', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/skillactive.json').then(jsondata => {
                    return savedata('skillactive', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/skillpassive.json').then(jsondata => {
                    return savedata('skillpassive', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/costume.json').then(jsondata => {
                    return savedata('costume', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/accessory.json').then(jsondata => {
                    return savedata('accessory', folder, jsondata.default);
                }));
            promises.push(
                import(
                    /* webpackChunkName: "jsondata" */
                    '../data/' + folder + '/combo.json').then(jsondata => {
                    return savedata('combo', folder, jsondata.default);
                }));
            return Promise.all(promises).then(() => {
                return store.setItem(lastUpdateKey, lastUpdate)
            });
        });
    });
};

var lastUpdate;
var isDataOutdated = function () {
    var folder = getCurrentServer().folder;
    var store = localForage.createInstance({
        name: baseKey + folder
    });
    return store.getItem(lastUpdateKey).then(function (data) {
        lastUpdate = data;
        return import('../data/' + folder + '/lastUpdate.json').then(data => {
            var local = lastUpdate;
            var remote = data.default;
            var isLatest = new Date(local).getTime() >= new Date(remote).getTime();
            lastUpdate = remote;
            if (!local) {
                return true;
            }
            return isLatest == false;
        });
    });
};

var getAll = function (type) {
    if (!data[type.toLowerCase()]) {
        console.log("dirty data detected!");
        location.hash = '#!/init/force';
        return [];
    }
    return data[type.toLowerCase()];
};
var get = function (type, id) {
    return _.find(getAll(type), function (o) { return o.id == id });
};

const Data = {
    getAllServers,
    getCurrentServer,
    setCurrentServer,
    init,
    getAll,
    get
};

export { Data };
export default Data;