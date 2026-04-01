package jp.co.example.warehouse.sp2;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SP2Scanner")
public class SP2Plugin extends Plugin {

    @PluginMethod()
    public void initialize(PluginCall call) {
        // TODO: SP2 AAR SDKの初期化処理をここに実装
        // 例: SP2Manager.getInstance().init(getContext());
        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    @PluginMethod()
    public void startScan(PluginCall call) {
        // TODO: SP2 AAR SDKのスキャン開始処理をここに実装
        // 例:
        // sp2Manager.startScan(new ScanCallback() {
        //     @Override
        //     public void onScanResult(String value, String format) {
        //         JSObject data = new JSObject();
        //         data.put("value", value);
        //         data.put("format", format);
        //         notifyListeners("scanResult", data);
        //     }
        // });

        // スタブ: 1秒後にモックデータを返す
        getActivity().getWindow().getDecorView().postDelayed(() -> {
            JSObject data = new JSObject();
            data.put("value", "STUB-" + System.currentTimeMillis());
            data.put("format", "CODE128");
            notifyListeners("scanResult", data);
        }, 1000);

        call.resolve();
    }

    @PluginMethod()
    public void stopScan(PluginCall call) {
        // TODO: SP2 AAR SDKのスキャン停止処理
        call.resolve();
    }

    @PluginMethod()
    public void getStatus(PluginCall call) {
        // TODO: SP2 AAR SDKから接続状態を取得
        JSObject result = new JSObject();
        result.put("status", "connected");
        call.resolve(result);
    }

    @PluginMethod()
    public void destroy(PluginCall call) {
        // TODO: SP2 AAR SDKの解放処理
        call.resolve();
    }
}
