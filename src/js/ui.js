import $ from "jquery";
import _ from 'lodash';

var supportedLang = [{
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

data["showall"] = { "ja-JP": "全アクトレス", "zh-TW": "所有角色", "en-US": "All Actress", "zh-CN": "所有角色" };
data["onlynamed"] = { "ja-JP": "実装済み", "zh-TW": "已實裝角色", "en-US": "Only Implemented", "zh-CN": "已实装角色" };

data["default"] = { "ja-JP": "デフォルト", "zh-TW": "默認", "en-US": "Default", "zh-CN": "默认" };

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
data["count"] = {
    "ja-JP": "回数",
    "zh-TW": "次數",
    "en-US": "Count",
    "zh-CN": "次数",
};
data["duration"] = {
    "ja-JP": "持続期間",
    "zh-TW": "持續時間",
    "en-US": "Duration",
    "zh-CN": "持续时间",
};

data["month"] = {
    1: { "ja-JP": "1月", "zh-TW": "一月", "en-US": "January", "zh-CN": "一月" },
    2: { "ja-JP": "2月", "zh-TW": "二月", "en-US": "February", "zh-CN": "二月" },
    3: { "ja-JP": "3月", "zh-TW": "三月", "en-US": "March", "zh-CN": "三月" },
    4: { "ja-JP": "4月", "zh-TW": "四月", "en-US": "April", "zh-CN": "四月" },
    5: { "ja-JP": "5月", "zh-TW": "五月", "en-US": "May", "zh-CN": "五月" },
    6: { "ja-JP": "6月", "zh-TW": "六月", "en-US": "June", "zh-CN": "六月" },
    7: { "ja-JP": "7月", "zh-TW": "七月", "en-US": "July", "zh-CN": "七月" },
    8: { "ja-JP": "8月", "zh-TW": "八月", "en-US": "August", "zh-CN": "八月" },
    9: { "ja-JP": "9月", "zh-TW": "九月", "en-US": "September", "zh-CN": "九月" },
    10: { "ja-JP": "10月", "zh-TW": "十月", "en-US": "October", "zh-CN": "十月" },
    11: { "ja-JP": "11月", "zh-TW": "十一月", "en-US": "November", "zh-CN": "十一月" },
    12: { "ja-JP": "12月", "zh-TW": "十二月", "en-US": "December", "zh-CN": "十二月" },
};



data[""] = {
    "ja-JP": "",
    "zh-TW": "",
    "en-US": "",
    "zh-CN": "",
};

var getText = function (key, key2) {
    if (!data[key]) {
        console.log("ui language data missing:" + key);
        return key;
    }
    if (key2 === undefined) {
        return data[key][getLang()] || data[key]['en-US'];
    }
    return data[key][key2][getLang()] || data[key][key2]['en-US'];
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
};
var renderAttrText = function (textList) {
    var text = "";
    var attrList = ["normal", "thunder", "gravity", "fire", "ice",
        "light", "collapse", "theory", "nothing"
    ];
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
    return text.replace(/\n/g, '<br />');
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