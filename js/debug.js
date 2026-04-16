ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "🚀 通信テスト開始：全件から5件取得を試みます...";

    // 条件(where)を全て削除。API名だけが正しいか試すクエリ
    const coql = {
        "select_query": "select nousyayoteibi, ClosingDay, ServiceStore from Services limit 5"
    };

    console.log("送信クエリ:", coql);

    ZOHO.CRM.API.coql(coql).then(function(res) {
        statusEl.innerText = "🚩 レスポンスを受信しました";
        let div = document.createElement('div');
        div.className = "log";

        if(res.data) {
            statusEl.innerText = "✅ 通信成功！";
            div.innerHTML = "<span style='color:#00ff00;'>[SUCCESS] データ取得に成功しました。</span><br><pre>" + JSON.stringify(res.data, null, 2) + "</pre>";
        } else {
            statusEl.innerText = "⚠️ 通信はしましたがデータがありません（またはエラー）";
            div.innerHTML = "<span style='color:#ff4444;'>[ERROR RESPONSE]</span><br><pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
        consoleEl.appendChild(div);
    }).catch(function(err) {
        statusEl.innerText = "🚫 深刻な通信エラーが発生しました";
        consoleEl.innerHTML = "<div style='color:#ff4444;'>[EXCEPTION] " + JSON.stringify(err) + "</div>";
    });
});
