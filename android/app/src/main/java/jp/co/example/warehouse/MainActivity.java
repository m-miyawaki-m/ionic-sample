package jp.co.example.warehouse;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import jp.co.example.warehouse.sp2.SP2Plugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SP2Plugin.class);
        super.onCreate(savedInstanceState);
    }
}
