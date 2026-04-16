ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "🚀 最終・原始的テスト：IDを1件だけリクエスト中...";

    // 期間指定も、集計関数も、すべて排除。
    // 「Servicesの中に何かデータが1つでもあるか？」だけを確認します。
    const ultimateSimpleQuery = {
        "select_query": "select id from Services limit 1"
    };

    ZOHO.CRM.API.coql(ultimateSimpleQuery).then(function(res) {
        statusEl.innerText = "🚩 レスポンス受信！";
        if(res && res.data) {
            statusEl.innerText = "✅ 成功！データは存在します。";
            consoleEl.innerHTML = "<pre style='color:#00ff00;'>" + JSON.stringify(res.data, null, 2) + "</pre>";
        } else {
            statusEl.innerText = "⚠️ 成功しましたが、データが0件です。";
            consoleEl.innerHTML = "<pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
    }).catch(function(err) {
        statusEl.innerText = "🚫 エラーが発生しました。";
        consoleEl.innerHTML = "<pre style='color:#ff4444;'>" + JSON.stringify(err) + "</pre>";
    });
});
