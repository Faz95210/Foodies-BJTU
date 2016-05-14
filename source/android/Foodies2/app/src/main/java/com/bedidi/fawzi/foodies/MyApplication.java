package com.bedidi.fawzi.foodies;

import android.app.Application;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class MyApplication extends Application {

    private static final String DATAURL = "http://10.0.2.2:8080/api";

    @Override
    public void onCreate(){
        super.onCreate();
        final RequestQueue requestQueue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, DATAURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("abd", "Succesfully communicated with the API");
                        Toast.makeText(MyApplication.this, "Response is: "+ response, Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("abd", "Failed to Communcate with the API error :" + error);
            }}
        );
        stringRequest.setShouldCache(false);
        requestQueue.add(stringRequest);
        requestQueue.start();
    }
}
