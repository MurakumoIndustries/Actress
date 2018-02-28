import $ from "jquery";
import localForage from "localforage";

var data = {};

const version = 20428;
var getVersion = function () { return version; };

var init = function (type) {
    var dtd = $.Deferred();
    if (!type) {
        dtd.reject();
        return dtd.promise();
    }
    var key = type;
    var self = this;
    return self.isDataTooOld().then(function (force) {
        return localForage.getItem(key).then(function (json) {
            if (json && !force) {
                var jsondata = JSON.parse(json);
                console.log("Get data from cache. ", key);
                data[type] = jsondata;
                dtd.resolve();
                return dtd.promise();
            }
            else {
                var savedata = function (key, jsondata) {
                    localForage.setItem(key, JSON.stringify(jsondata), function () {
                        console.log("Get data from web. ", key);
                    });
                    data[type] = jsondata;
                }
                var jsondata = require('../data/' + type.toLowerCase() + '.json');
                savedata(key, jsondata);
                /*switch (type.toLowerCase()) {
                    case "actress":
                        return import('../data/actress.json').then(jsondata => {
                            savedata(key, jsondata);
                        });
                        break;
                    default:
                        break;
                }*/
            }
        });
    });
};

var isLatest = null;
var lastUpdate;
const lastUpdateKey = "lastUpdate_MIF";
var isDataTooOld = function () {
    var dtd = $.Deferred();
    if (isLatest !== null) {
        dtd.resolve(isLatest == false);
        return dtd.promise();
    }
    return localForage.getItem(lastUpdateKey).then(function (data) {
        lastUpdate = data;
        return import('../data/lastUpdate.json').then(data => {
            var local = lastUpdate;
            var remote = data;
            isLatest = new Date(local).getTime() >= new Date(remote).getTime();
            lastUpdate = remote;
            if (!local) {
                return true;
            }
            return isLatest == false;
        });
    });
};
var saveLastUpdate = function () {
    localForage.setItem(lastUpdateKey, lastUpdate)
};

var getActress = function (id) {
    return _.find(data["actress"], function (o) { return o.id == id });
};
var getAllActress = function (id) {
    return data["actress"];
};
var getChara = function (id) {
    return _.find(data["chara"], function (o) { return o.id == id });
};
var get = function (type, id) {
    return _.find(data[type.toLowerCase()], function (o) { return o.id == id });
};

export {
    getVersion,
    init,
    isDataTooOld,
    saveLastUpdate,
    getActress,
    getAllActress,
    getChara,
    get
};
export default {
    getVersion,
    init,
    isDataTooOld,
    saveLastUpdate,
    getActress,
    getAllActress,
    getChara,
    get
};