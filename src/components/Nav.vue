<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a class="pr-2" href="../">
            <i class="icon icon-murakumo"></i>
        </a>
        <a class="navbar-brand" title="Murakumo Industries Actress Resume" href="#">
            <span class="d-none d-md-inline-block">Murakumo Industries</span>
            <span class="d-md-none">MI</span>
            <span>Actress</span>
            <span class="d-none d-sm-inline-block">Resume</span>
            <sup>α</sup>
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <select class="selectpicker" data-width="auto" v-model="actressOrder">
                        <option value="default">{{Ui.getText("default")}}</option>
                        <option value="gojyuon">{{Ui.getText("gojyuon")}}</option>
                        <optgroup class="opt-group-header" :label="Ui.getText('resume')">
                            <option value="birthday">{{Ui.getText("birthday")}}</option>
                            <option value="age">{{Ui.getText("age")}}</option>
                            <option value="height">{{Ui.getText("height")}}</option>
                            <option value="blood">{{Ui.getText("blood")}}</option>
                            <option value="job">{{Ui.getText("job")}}</option>
                        </optgroup>
                        <optgroup class="opt-group-header" :label="Ui.getText('chara')">
                            <option value="goodweapon">{{Ui.getText("goodweapon")}}</option>
                            <option value="goodweaponsub">{{Ui.getText("goodweaponsub")}}</option>
                            <option value="damagetype">{{Ui.getText("damagetype")}}</option>
                            <option value="damagetypesub">{{Ui.getText("damagetypesub")}}</option>
                            <option value="passiveskill">{{Ui.getText("passiveskill")}}</option>
                            <option value="attribute">{{Ui.getText("attribute")}}</option>
                            <option value="spdtype">{{Ui.getText("spdtype")}}</option>
                        </optgroup>
                        <optgroup class="opt-group-header" :label="Ui.getText('others')">
                            <option value="modelheight">{{Ui.getText("modelheight")}}</option>
                            <option value="cv">{{Ui.getText("cv")}}</option>
                        </optgroup>
                    </select>
                </li>
            </ul>

            <ul class="navbar-nav my-0">
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="icon icon-version"></i>
                        <div
                            class="d-inline-block"
                            style="vertical-align: top; height: 0; margin-top: -0.325rem;    padding-right: 0.25rem;"
                        >
                            <div id="server">{{currentServer.name}}</div>
                            <div class="m-0" id="version">
                                <i
                                    v-show="isUpdating"
                                    class="material-icons version-text spin"
                                >autorenew</i>
                                <span v-show="isUpdating" class="version-text">Updating...</span>
                                <span
                                    v-show="isUpdateReady"
                                    class="version-text"
                                    style="font-weight: bold;color: #ff5588;"
                                >NEW!</span>
                                <span
                                    v-show="!(isUpdating||isUpdateReady)"
                                    class="version-text"
                                >{{currentServer.version}}</span>
                            </div>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <h6 class="dropdown-header">{{Ui.getText("server")}}</h6>
                        <a
                            v-for="o in allServers"
                            :key="o.id"
                            :class="['dropdown-item',o.id == currentServer.id ? 'active' : '']"
                            :href="'#!/server/' + o.id"
                        >
                            {{o.name}}
                            <p
                                class="m-0"
                                style="font-size:0.75rem;line-height:0.75rem;"
                            >{{o.version}}</p>
                        </a>
                        <div class="dropdown-divider" id="serverDivider"></div>
                        <h6 class="dropdown-header">{{Ui.getText("externallink")}}</h6>
                        <a
                            class="dropdown-item"
                            href="https://colopl.co.jp/alicegearaegis/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span class="mr-4">{{Ui.getText("officalsite")}}</span>
                            <i
                                class="material-icons text-black-50"
                                style="position:absolute;right:1rem;"
                            >open_in_new</i>
                        </a>
                        <a
                            class="dropdown-item"
                            href="https://alice.colopl.jp/news/show"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span class="mr-4">{{Ui.getText("officalannouncement")}}</span>
                            <i
                                class="material-icons text-black-50"
                                style="position:absolute;right:1rem;"
                            >open_in_new</i>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a
                            class="dropdown-item"
                            href="#"
                            @click.prevent="toggleCache()"
                        >{{Ui.getText(cacheDisabled?"enablecache":"disablecache")}}</a>
                        <a
                            v-if="isExperimentalMode"
                            class="dropdown-item"
                            href="#"
                            @click.prevent="$store.commit('setExperimentalMode',false)"
                        >Disable Experimental Mode</a>
                        <a
                            v-if="isEasterAvailable"
                            class="dropdown-item"
                            href="#"
                            @click.prevent="$store.commit('setEasterMode', !isEasterMode)"
                        >？？？</a>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="material-icons">language</i>
                        <span id="currentLang">{{langText}}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <a
                            v-for="lang in Ui.supportedLang"
                            v-bind:key="lang.key"
                            class="dropdown-item"
                            v-bind:href="'#!/lang/'+lang.key"
                            @click="langText=lang.text"
                        >{{lang.text}}</a>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState } from "vuex";

import { Data } from "../js/data.js";
import { Ui } from "../js/ui.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            actressOrder: "default",
            langText: Ui.getLangText(),
            isUpdating: false,
            isUpdateReady: false
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("new-version-updating", function() {
            console.log("new-version-updating");
            $vm.isUpdating = true;
            $vm.isUpdateReady = false;
        });
        Event.$on("new-version-update-ready", function() {
            console.log("new-version-update-ready");
            $vm.isUpdating = false;
            $vm.isUpdateReady = true;
        });
    },
    watch: {
        actressOrder: function(newVal) {
            console.log(newVal);
            Event.$emit("change-actress-order", newVal);
        }
    },
    methods: {
        toggleCache: function() {
            if (this.cacheDisabled) {
                localStorage["MI_Actress_Disable_Cache"] = false;
                location.reload();
                return;
            }
            if (!confirm(Ui.getText("disablecachewarning"))) {
                return;
            }
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .getRegistration()
                    .then(function(registration) {
                        registration &&
                            registration.unregister().then(function(r) {
                                localStorage["MI_Actress_Disable_Cache"] = true;
                                location.reload();
                            });
                    });
            }
        }
    },
    computed: {
        currentServer: function() {
            return Data.getCurrentServer();
        },
        allServers: function() {
            return Data.getAllServers();
        },
        cacheDisabled: function() {
            return localStorage["MI_Actress_Disable_Cache"] === "true";
        },
        isEasterAvailable: function() {
            if (this.isExperimentalMode) {
                return true;
            }
            var date = new Date();
            return date.getMonth() == 3 && date.getDate() == 1;
        },
        ...mapState(["isExperimentalMode", "isEasterMode"])
    }
};
</script>
<style scoped>
.icon {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    display: inline-block;
    vertical-align: middle;
}

.icon.icon-version {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: -1rem;
    margin-bottom: -1rem;
    opacity: 0.5;
    background-image: url(../img/version.png);
}

.icon.icon-murakumo {
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(../img/murakumo.svg);
}

.version-text {
    font-size: 0.75rem;
    line-height: 0.75rem;
    vertical-align: top;
}

.spin {
    animation: spin 2s infinite linear;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
<style>
.dropdown-header.opt-group-header {
    font-size: 0.75rem;
    line-height: 0.75rem;
    padding: 0 0 0.25rem 0.25rem;
}
.dropdown-header.opt-group-header-empty {
    padding: 0;
}
</style>

