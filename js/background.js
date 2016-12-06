$(function(){
    var url;

    // タブ切り替えた時
    chrome.tabs.onActivated.addListener(function(tabId) {
        createURL();
    });
    // タブ読み込み時
    chrome.tabs.onUpdated.addListener(function(tabId, opt) {
        createURL();
    });
    // タブ作成時
    chrome.tabs.onCreated.addListener(function(tab){
        createURL();
    });
    // 右上のアイコン押下時
    chrome.browserAction.onClicked.addListener(function(){
        window.open('http://b.hatena.ne.jp/entry/' + url);
    });

    function createURL(){
        chrome.browserAction.setBadgeBackgroundColor({color: "red"});
        // 今開いてるタブの情報を取得
        chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs){
            // はてブ数チェック
            $.get("http://api.b.st-hatena.com/entry.count?url=" + tabs[0].url, function(count){
                // カウント数をバッジにセット
                chrome.browserAction.setBadgeText({text:count});
            });

            // "http://"を削除、"https://"の時は"s/"に置換
            url = tabs[0].url.replace(/^(http:\/\/)/,"");
            if(url === tabs[0].url){
                url = url.replace(/^(https:\/\/)/,"s/");
            }
        });
    }

});