ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "🚀 原点回帰テスト：実績のあるクエリで再試行中...";

    // 本番で「動く」と言っていたクエリの書き方を再現
    const start = "2026-03-01";
    const end = "2026-03-31";
    
    const coql = { 
        "select_query": "select ClosingDay, VisitedDateTime, ServiceStore from Services where (VisitedDateTime between '" + start + "T00:00:00+09:00' and '" + end + "T23:59:59+09:00') limit 1" 
    };

    ZOHO.CRM.API.coql(coql).then(function(res) {
        statusEl.innerText = "🚩 レスポンス受信！";
        if(res && res.data) {
            statusEl.innerText = "✅ 成功！この書き方なら動きます。";
            consoleEl.innerHTML = "<pre style='color:#00ff00;'>" + JSON.stringify(res.data[0], null, 2) + "</pre>";
        } else {
            statusEl.innerText = "⚠️ 応答はありましたが、データが空です。";
            consoleEl.innerHTML = "<pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
    }).catch(function(err) {
        statusEl.innerText = "🚫 エラー発生";
        consoleEl.innerHTML = "<pre style='color:#ff4444;'>" + JSON.stringify(err) + "</pre>";
    });
});
