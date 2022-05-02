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

data["default"] = { "ja-JP": "デフォルト", "zh-TW": "默認", "en-US": "Default", "zh-CN": "默认" };
data["idorder"] = { "ja-JP": "ID順", "zh-TW": "ID順", "en-US": "ID Order", "zh-CN": "ID顺" };
data["gojyuon"] = { "ja-JP": "五十音順", "zh-TW": "五十音順", "en-US": "Gojūon", "zh-CN": "五十音顺" };
data["others"] = { "ja-JP": "その他", "zh-TW": "其他", "en-US": "Others", "zh-CN": "其他" };

data["chara"] = { "ja-JP": "キャラ", "zh-TW": "角色", "en-US": "Character", "zh-CN": "角色" };
data["goodweapon"] = { "ja-JP": "得意ギア", "zh-TW": "擅長武裝", "en-US": "Main Weapon", "zh-CN": "精通武装" };
data["goodweaponsub"] = { "ja-JP": "準得意ギア", "zh-TW": "準擅長武裝", "en-US": "Sub Weapon", "zh-CN": "副武装" };
data["damagetype"] = { "ja-JP": "攻撃種類", "zh-TW": "攻擊類型", "en-US": "Damage Type", "zh-CN": "攻击类型" };
data["damagetypesub"] = { "ja-JP": "攻撃種類(準)", "zh-TW": "攻擊類型(準)", "en-US": "Damage Type(Sub)", "zh-CN": "攻击类型(副)" };
data["passiveskill"] = { "ja-JP": "パッシブスキル", "zh-TW": "被動技能", "en-US": "Passive Skill", "zh-CN": "被动技能" };

data["originalchara"] = { "ja-JP": "オリジナル", "zh-TW": "原創", "en-US": "Original", "zh-CN": "原创" };
data["collabochara"] = { "ja-JP": "コラボ", "zh-TW": "聯動", "en-US": "Collaboration", "zh-CN": "联动" };

data["currentversion"] = { "ja-JP": "バージョン：", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["officalannouncement"] = { "ja-JP": "お知らせ", "zh-TW": "遊戲公告", "en-US": "Offical Announcement", "zh-CN": "游戏公告" };

data["ui"] = { "ja-JP": "UI言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

data["server"] = { "ja-JP": "サーバー", "zh-TW": "伺服器", "en-US": "Server", "zh-CN": "服务器" };
data["disablecache"] = { "ja-JP": "キャッシュを無効化", "zh-TW": "停用快取", "en-US": "Disable Cache", "zh-CN": "禁用缓存", };
data["enablecache"] = { "ja-JP": "キャッシュを有効化", "zh-TW": "啟用快取", "en-US": "Enable Cache", "zh-CN": "启用缓存", };
data["disablecachewarning"] = {
    "ja-JP": "キャッシュを無効化にすると、ページの読み込みが遅くなります。無効化にしますか？",
    "zh-TW": "停用快取會使網頁載入變慢，是否確認停用？",
    "en-US": "Disabling caching will cause the page to load slowly, CONFIRM?",
    "zh-CN": "禁用缓存会导致网页加载缓慢，是否确认禁用？"
};

//resume
data["resume"] = {
    "ja-JP": "履歴書",
    "zh-TW": "履歷表",
    "en-US": "Resume",
    "zh-CN": "履历表"
};
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
    "ja-JP": "身長",
    "zh-TW": "身高",
    "en-US": "Height",
    "zh-CN": "身高",
};
data["heightunit"] = {
    "ja-JP": "cm",
    "zh-TW": "cm",
    "en-US": "cm",
    "zh-CN": "cm",
};
data["modelheight"] = {
    "ja-JP": "モデル身長",
    "zh-TW": "模型身高",
    "en-US": "Model Height",
    "zh-CN": "模型身高",
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
    "zh-TW": "興趣",
    "en-US": "Hobbies & Skills",
    "zh-CN": "特长爱好",
};
data["goal"] = {
    "ja-JP": "将来の目標",
    "zh-TW": "未來的目標",
    "en-US": "Future Goal",
    "zh-CN": "将来的目标",
};
data["reason"] = {
    "ja-JP": "アクトレスを志した理由",
    "zh-TW": "想當Actress的理由",
    "en-US": "Reason for Application",
    "zh-CN": "求职理由",
};
data["appeal"] = {
    "ja-JP": "自己PR",
    "zh-TW": "自我展現",
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
data["needPoint"] = {
    "ja-JP": "必要な結合粒子",
    "zh-TW": "結合粒子需求量",
    "en-US": "Particle Required",
    "zh-CN": "结合粒子需求量",
};
data["duration"] = {
    "ja-JP": "時間",
    "zh-TW": "時間",
    "en-US": "Duration",
    "zh-CN": "时间",
};
data["geartype"] = {
    "ja-JP": "ギア種別",
    "zh-TW": "武裝種別",
    "en-US": "Gear Type",
    "zh-CN": "武装种类",
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

data["weapon"] = { "ja-JP": "ウェポン", "zh-TW": "武器", "en-US": "Weapon", "zh-CN": "武器" };
data["equipment"] = { "ja-JP": "ドレス", "zh-TW": "服裝", "en-US": "Equipment", "zh-CN": "防具" };

data["weaponL"] = {
    1: { "ja-JP": "ライフル", "zh-TW": "步槍", "en-US": "Rifle", "zh-CN": "步枪" },
    2: { "ja-JP": "バズーカ", "zh-TW": "火箭筒", "en-US": "Bazooka", "zh-CN": "火箭炮" },
    3: { "ja-JP": "デュアル", "zh-TW": "雙槍", "en-US": "Twin", "zh-CN": "双枪" },
    4: { "ja-JP": "スナイパー", "zh-TW": "狙擊槍", "en-US": "Sniper", "zh-CN": "狙击枪" },
};
data["weaponS"] = {
    1: { "ja-JP": "両手剣", "zh-TW": "雙手劍", "en-US": "Sword", "zh-CN": "双手剑" },
    2: { "ja-JP": "ハンマー", "zh-TW": "大鎚", "en-US": "Hammer", "zh-CN": "锤" },
    3: { "ja-JP": "ランス", "zh-TW": "長槍", "en-US": "Spear", "zh-CN": "长枪" },
    4: { "ja-JP": "片手剣", "zh-TW": "單手劍", "en-US": "Dagger", "zh-CN": "单手剑" },
    5: { "ja-JP": "拳銃", "zh-TW": "手槍", "en-US": "Handgun", "zh-CN": "手枪" },
};

data["attribute"] = {
    "ja-JP": "属性",
    "zh-TW": "屬性",
    "en-US": "Attribute",
    "zh-CN": "属性",
    0: { "ja-JP": "打撃", "zh-TW": "打擊", "en-US": "Blow", "zh-CN": "打击" },
    1: { "ja-JP": "斬撃", "zh-TW": "斬擊", "en-US": "Slash", "zh-CN": "斩击" },
    2: { "ja-JP": "実弾", "zh-TW": "實彈", "en-US": "Bullet", "zh-CN": "实弹" },
    3: { "ja-JP": "エネルギー", "zh-TW": "能量", "en-US": "Beam", "zh-CN": "能量" },
    4: { "ja-JP": "無", "zh-TW": "無", "en-US": "Normal", "zh-CN": "无" },
    5: { "ja-JP": "電撃", "zh-TW": "電擊", "en-US": "Thunder", "zh-CN": "电击" },
    6: { "ja-JP": "重力", "zh-TW": "重力", "en-US": "Gravity", "zh-CN": "重力" },
    7: { "ja-JP": "焼夷", "zh-TW": "燃燒", "en-US": "Fire", "zh-CN": "燃烧" },
    8: { "ja-JP": "冷撃", "zh-TW": "冷凍", "en-US": "Ice", "zh-CN": "冷冻" },
    9: { "ja-JP": "撃光", "zh-TW": "擊光", "en-US": "Light", "zh-CN": "击光" },
    10: { "ja-JP": "崩壊", "zh-TW": "崩壞", "en-US": "Collapse", "zh-CN": "崩坏" },
    11: { "ja-JP": "理論", "zh-TW": "理論", "en-US": "Theory", "zh-CN": "理论" },
    //255:{ "ja-JP": "なし", "zh-TW": "無", "en-US": "Nothing", "zh-CN": "无" },
    255: { "ja-JP": "", "zh-TW": "", "en-US": "", "zh-CN": "" },
};

data["spdtype"] = {
    "ja-JP": "機動タイプ",
    "zh-TW": "機動類型",
    "en-US": "SPD Type",
    "zh-CN": "机动类型",
};

data["spdtypelight"] = {
    "ja-JP": "高機動",
    "zh-TW": "高機動",
    "en-US": "Light",
    "zh-CN": "高机动",
};

data["spdtypebalance"] = {
    "ja-JP": "バランス",
    "zh-TW": "平衡",
    "en-US": "Balance",
    "zh-CN": "平衡",
};

data["spdtypeheavy"] = {
    "ja-JP": "重装",
    "zh-TW": "重裝",
    "en-US": "Heavy",
    "zh-CN": "重装",
};

data["gear"] = {
    "ja-JP": "ギア",
    "zh-TW": "武裝",
    "en-US": "Gear",
    "zh-CN": "武装",
};

data["costume"] = {
    "ja-JP": "コスチューム",
    "zh-TW": "衣裝",
    "en-US": "Costume",
    "zh-CN": "服装",
};

data["accessory"] = {
    "ja-JP": "アクセサリー",
    "zh-TW": "飾品",
    "en-US": "Accessory",
    "zh-CN": "饰品",
};

data["sp"] = { "ja-JP": "SP", "zh-TW": "SP", "en-US": "SP", "zh-CN": "SP" };

data["enigma"] = { "ja-JP": "エニグマ", "zh-TW": "Enigma", "en-US": "Enigma", "zh-CN": "Enigma" };
data["emptyslot"] = { "ja-JP": "空きスロット", "zh-TW": "空插槽", "en-US": "Empty Slot", "zh-CN": "空插槽" };


data[""] = {
    "ja-JP": "",
    "zh-TW": "",
    "en-US": "",
    "zh-CN": "",
};

var getText = function (key, key2) {
    if (!data[key]) {
        console.log("ui language data missing", key);
        return key;
    }
    if (key2 === undefined) {
        return data[key][getLang()] || data[key]['en-US'];
    }
    if (!data[key][key2]) {
        console.log("ui language data missing", key, key2);
        return key;
    }
    return data[key][key2][getLang()] || data[key][key2]['en-US'];
};
var getLang = function () {
    if (!currentLang) {
        setLang();
    }
    return currentLang;
};
var getLangText = function () {
    if (!currentLang) {
        setLang();
    }
    return _.find(supportedLang, function (o) {
        return o.key == currentLang;
    }).text;
};
var setLang = function (lang) {
    lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
    if (_.some(supportedLang, function (o) { return o.key == lang }) == false) {
        lang = 'ja-JP';
    }
    currentLang = lang;
    localStorage["uilang"] = lang;
};
var renderDesc = function (text) {
    if (!text) {
        return text;
    }
    return text.replace(/\n/g, '<br />');
};

const Ui = {
    supportedLang,
    getText,
    getLang,
    getLangText,
    setLang,
    renderDesc,
};

export { Ui };
export default Ui;