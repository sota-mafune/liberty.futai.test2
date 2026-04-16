ZOHO.embeddedApp.init().then(function() {
    // 起動確認
    document.getElementById('status').innerText = "🚀 SDK初期化完了。検証用関数を実行します...";
    runVerify();
});

async function runVerify() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    
    // 正常に取れるコードと同じ日付指定
    const start = "2026-03-01";
    const end = "2026-03-31";
    
    // 【検証内容】SELECTに nousyayoteibi を追加し、WHEREは実績のある形にする
    const coql = { 
        "select_query": "select nousyayoteibi, ClosingDay, VisitedDateTime from Services where ((ClosingDay between '" + start + "' and '" + end + "') or (VisitedDateTime between '" + start + "T00:00:00+09:00' and '" + end + "T23:59:59+09:00')) limit 0, 10" 
    };

    try {
        statusEl.innerText = "▶ COQLリクエスト送信中...";
        // 正常に取れるコードと全く同じ呼び出し方(await使用)
        const res = await ZOHO.CRM.API.coql(coql);
        
        if (res && res.data) {
            statusEl.innerText = "✅ 成功！データを受信しました。";
            consoleEl.innerHTML = "<b>取得した最新10件のリスト:</b><pre style='color:#00ff00; background:#000; padding:10px;'>" + JSON.stringify(res.data, null, 2) + "</pre>";
        } else {
            statusEl.innerText = "⚠️ 応答はありましたが、データが空です。";
            consoleEl.innerHTML = "<pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
    } catch (e) {
        statusEl.innerText = "🚫 エラーが発生しました。";
        consoleEl.innerText = e.toString();
    }
}
