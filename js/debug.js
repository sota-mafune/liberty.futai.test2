ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "🔍 比較検証：VisitedDateTime で「3月件数」をカウント中...";

    // まったく同じ条件で、フィールド名だけを VisitedDateTime に変更
    const countQuery = {
        "select_query": "select count(id) from Services where (VisitedDateTime between '2026-03-01T00:00:00+09:00' and '2026-03-31T23:59:59+09:00')"
    };

    ZOHO.CRM.API.coql(countQuery).then(function(res) {
        if(res && res.data && res.data[0]) {
            const count = res.data[0]["count(id)"];
            statusEl.innerText = "✅ 集計完了！（やはり VisitedDateTime は動きます）";
            consoleEl.innerHTML = "<span style='color:#00ff00; font-size:24px;'>3月の来店件数: " + count + "件</span>";
        } else {
            statusEl.innerText = "⚠️ VisitedDateTime でもダメでした...";
            consoleEl.innerHTML = "<pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
    }).catch(function(err) {
        statusEl.innerText = "🚫 エラー発生";
        consoleEl.innerHTML = "<pre>" + JSON.stringify(err) + "</pre>";
    });
});
