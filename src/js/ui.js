import $ from "jquery";
import _ from 'lodash';

var supportedLang = [
    {
        key: 'ja-JP',
        text: '日本語'
    },
    {
        key: 'zh-TW',
        text: '正體中文'
    },
    {
        key: 'en-US',
        text: 'English'
    },
    {
        key: 'zh-CN',
        text: '简体中文'
    }
];
var currentLang = '';
var data = [];
//navbar
data["search"] = { "ja-JP": "検索", "zh-TW": "搜尋", "en-US": "Search", "zh-CN": "查询" };
data["clear"] = { "ja-JP": "", "zh-TW": "清空", "en-US": "Clear", "zh-CN": "清空" };

data["maplist"] = { "ja-JP": "宙域マップ", "zh-TW": "地圖列表", "en-US": "Map List", "zh-CN": "地图列表" };
data["maplistrandom"] = { "ja-JP": "宙域マップ（ランダム）", "zh-TW": "地圖列表（隨機）", "en-US": "Random Map List", "zh-CN": "地图列表（随机）" };

data["giveup"] = { "ja-JP": "調查宙域变更：", "zh-TW": "變更調查地圖：", "en-US": "Change Map: ", "zh-CN": "变更调查地图：" };
data["cannotgiveup"] = { "ja-JP": "調查宙域变更不可", "zh-TW": "無法變更該調查地圖", "en-US": "Cannot change current map", "zh-CN": "不能变更这张调查地图" };

data["currentversion"] = { "ja-JP": "バージョン：", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["officalannouncement"] = { "ja-JP": "お知らせ", "zh-TW": "遊戲公告", "en-US": "Offical Announcement", "zh-CN": "游戏公告" };

data["ui"] = { "ja-JP": "UI言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

//resume
data["roma"] = {
    "ja-JP": "ローマ字",
    "zh-TW": "羅馬字",
    "en-US": "Rōmaji",
    "zh-CN": "罗马字"
};
data["ruby"] = {
    "ja-JP": "ふりがな",
    "zh-TW": "振假名",
    "en-US": "Furigana",
    "zh-CN": "注音假名",
};
data["name"] = {
    "ja-JP": "名前",
    "zh-TW": "姓名",
    "en-US": "Name",
    "zh-CN": "姓名",
};
data["birthday"] = {
    "ja-JP": "誕生日",
    "zh-TW": "出生日期",
    "en-US": "Date of Birth",
    "zh-CN": "出生日期",
};
data["age"] = {
    "ja-JP": "年齢",
    "zh-TW": "年齡",
    "en-US": "Age",
    "zh-CN": "年龄",
};
data["height"] = {
    "ja-JP": "身長（cm）",
    "zh-TW": "身高（cm）",
    "en-US": "Height(cm)",
    "zh-CN": "身高（cm）",
};
data["blood"] = {
    "ja-JP": "血液型",
    "zh-TW": "血型",
    "en-US": "Blood",
    "zh-CN": "血型",
};
data["job"] = {
    "ja-JP": "職業",
    "zh-TW": "職業",
    "en-US": "Job",
    "zh-CN": "职业",
};
data["hobby"] = {
    "ja-JP": "趣味・特技",
    "zh-TW": "興趣特長",
    "en-US": "Hobbies & Skills",
    "zh-CN": "特长爱好",
};
data["goal"] = {
    "ja-JP": "将来の目標",
    "zh-TW": "將來的目標",
    "en-US": "Future Goal",
    "zh-CN": "将来的目标",
};
data["reason"] = {
    "ja-JP": "アクトレスを志した理由",
    "zh-TW": "求職理由",
    "en-US": "Reason for Application",
    "zh-CN": "求职理由",
};
data["appeal"] = {
    "ja-JP": "自己PR",
    "zh-TW": "自我介紹",
    "en-US": "Personal Statement",
    "zh-CN": "自我介绍",
};
data["cv"] = {
    "ja-JP": "CV",
    "zh-TW": "CV",
    "en-US": "Voice",
    "zh-CN": "CV",
};



data[""] = {
    "ja-JP": "",
    "zh-TW": "",
    "en-US": "",
    "zh-CN": "",
};

var getText = function (key) {
    if (!data[key]) {
        console.log("ui language data missing:" + key);
        return key;
    }
    return data[key][getLang()] || data[key]['en-US'];
};
var getLang = function () {
    if (!currentLang) {
        setLang();
    }
    return currentLang;
};
var setLang = function (lang) {
    lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
    if (_.some(supportedLang, function (o) { return o.key == lang }) == false) {
        lang = 'ja-JP';
    }
    currentLang = lang;
    localStorage["uilang"] = lang;
    $('#currentLang').text(_.find(supportedLang, function (o) {
        return o.key == lang;
    }).text);
};
var init = function () {
    $('[data-lang]').each(function () {
        var $this = $(this);
        var key = $this.data("lang");
        var value = getText(key);
        var target = $this.data("lang-target");
        if (target) {
            $this.attr(target, value);
        }
        else {
            $this.text(value);
        }
    });
    //deal with bootstrap select
    require('./lib/bootstrap-select-1.13.0-beta/js/i18n/defaults-' + currentLang.replace('-', '_'));
};
var renderAttrText = function (textList) {
    var text = "";
    var attrList = ["normal", "thunder", "gravity", "fire", "ice",
        "light", "collapse", "theory", "nothing"];
    _.each(textList, function (o, i) {
        if (o > 0) {
            text += '<span class="attr-text attr-' + attrList[i] + '">' + o + '</span>';
        }
    });
    return text;
};
var renderDesc = function (text) {
    if (!text) {
        return text;
    }
    return text.replace(/\n/g,'<br />');
};

export {
    supportedLang,
    getText,
    getLang,
    setLang,
    init,
    renderAttrText,
    renderDesc,
};
export default {
    supportedLang,
    getText,
    getLang,
    setLang,
    init,
    renderAttrText,
    renderDesc,
};