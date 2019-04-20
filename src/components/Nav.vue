<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a class="pr-2" href="../">
            <i class="icon icon-murakumo"></i>
        </a>
        <a class="navbar-brand" title="Murakumo Industries Actress Resume" href="#">
            <span class="d-none d-xl-inline-block">Murakumo Industries</span>
            <span class="d-none d-lg-inline-block d-xl-none">MI</span>
            <span class="d-none d-sm-inline-block d-md-inline-block d-lg-none">Murakumo Industries</span>
            <span class="d-sm-none">MI</span>
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
                    <select class="selectpicker" v-model="actressOrder">
                        <option value="default">{{Ui.getText("default")}}</option>
                        <option value="gojyuon">{{Ui.getText("gojyuon")}}</option>
                        <option value="birthday">{{Ui.getText("birthday")}}</option>
                        <option value="age">{{Ui.getText("age")}}</option>
                        <option value="height">{{Ui.getText("height")}}</option>
                        <option value="blood">{{Ui.getText("blood")}}</option>
                        <option data-divider="true"></option>
                        <option value="weapon">{{Ui.getText("weapon")}}</option>
                        <option value="attribute">{{Ui.getText("attribute")}}</option>
                        <option data-divider="true"></option>
                        <option value="modelheight">{{Ui.getText("modelheight")}}</option>
                        <option value="cv">{{Ui.getText("cv")}}</option>
                    </select>
                </li>
            </ul>

            <ul class="navbar-nav my-0">
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle py-0"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="icon icon-version"></i>
                        <div class="d-inline-block" style="vertical-align: middle;">
                            <div id="server">{{currentServer.name}}</div>
                            <div
                                class="m-0"
                                style="font-size: 0.75rem;line-height:0.75rem;"
                                id="version"
                            >{{currentServer.version}}</div>
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
                        >{{Ui.getText("officalsite")}}</a>
                        <a
                            class="dropdown-item"
                            href="https://alice.colopl.jp/news/show"
                            target="_blank"
                            rel="noopener noreferrer"
                        >{{Ui.getText("officalannouncement")}}</a>
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
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import { Ui } from "../js/ui.js";
import $ from "jquery";

export default {
    data: function() {
        var langText = Ui.getLangText();
        return {
            actressOrder: "default",
            langText: langText
        };
    },
    mounted: function() {
        var $vm = this;
        this.$nextTick(function() {
            $($vm.$el)
                .find(".selectpicker")
                .selectpicker({
                    width: "auto"
                });
        });
    },
    watch: {
        actressOrder: function(newVal) {
            console.log(newVal);
            Event.$emit("change-actress-order", newVal);
        }
    },
    computed: {
        currentServer: function() {
            return Data.getCurrentServer();
        },
        allServers: function() {
            return Data.getAllServers();
        }
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
    opacity: 0.5;
    background-image: url(../img/version.png);
}

.icon.icon-murakumo {
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(../img/murakumo.png);
}
</style>

