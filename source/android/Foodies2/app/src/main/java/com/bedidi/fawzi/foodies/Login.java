package com.bedidi.fawzi.foodies;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;


public class Login extends AppCompatActivity {

    public static final String DATAURL = "http://10.0.2.2:8080/api/users";
    private EditText usernameText;
    private EditText passwordText;
    private RequestQueue requestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        usernameText = (EditText) findViewById(R.id.username);
        passwordText = (EditText) findViewById(R.id.password);
        requestQueue = Volley.newRequestQueue(this);
        final SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        final String index = sharedPreferences.getString("id", "");
        if (!index.equals("")){
            Toast.makeText(Login.this, "Id : " + index, Toast.LENGTH_SHORT).show();
        }
    }

    public void signInOnClick(View view){
        StringRequest stringRequest = new StringRequest(Request.Method.GET, DATAURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(Login.this, "Response is: "+ response.substring(0,500), Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("abd", "Error: " + error);
            }}
        );
        stringRequest.setShouldCache(false);
        requestQueue.add(stringRequest);
    }

    public void signUpOnClick(View view){
        Intent intent = new Intent(Login.this, Signup.class);
        startActivity(intent);
    }
}
