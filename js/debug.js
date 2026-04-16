ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "🔍 検証：nousyayoteibi の「3月件数」をカウント中...";

    // 3月1日〜31日のデータをカウントするクエリ
    // 日時型として ISO8601形式（T00:00:00+09:00）で指定します
    const countQuery = {
        "select_query": "select count(id) from Services where (nousyayoteibi between '2026-03-01T00:00:00+09:00' and '2026-03-31T23:59:59+09:00')"
    };

    console.log("送信クエリ:", countQuery);

    ZOHO.CRM.API.coql(countQuery).then(function(res) {
        let div = document.createElement('div');
        div.className = "log";

        if(res && res.data && res.data[0]) {
            const count = res.data[0]["count(id)"];
            statusEl.innerText = "✅ 集計完了！";
            div.innerHTML = "<span style='color:#00ff00; font-size:24px;'>3月の納車予定件数: " + count + "件</span>";
        } else {
            statusEl.innerText = "❌ 集計に失敗、または0件です";
            div.innerHTML = "<span style='color:#ff4444;'>[レスポンス内容]</span><br><pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
        consoleEl.appendChild(div);
    }).catch(function(err) {
        statusEl.innerText = "🚫 通信エラー";
        consoleEl.innerHTML = "<pre style='color:#ff4444;'>" + JSON.stringify(err, null, 2) + "</pre>";
    });
});
