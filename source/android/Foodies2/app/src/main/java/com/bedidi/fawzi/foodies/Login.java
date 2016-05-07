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

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;


public class Login extends AppCompatActivity {

    public static final String USERNAME = "usernameProfile";
    public static final String DATAURL = "http://10.0.2.2:8080/api";
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

    private JSONObject createJsonObject() throws JSONException {
        final String username = usernameText.getText().toString();
        final String password = passwordText.getText().toString();
        return new JSONObject("{\"username\":" + username + "," +
                "password:"+password+"}");
    }

    private void dealWithResponse(JSONObject response){
        final SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        try {
            sharedPreferences.edit().putString("token", response.getString("token")).apply();
        } catch (JSONException e) {
            sharedPreferences.edit().putString("token", "Can't get token from JSON").apply();
            Log.d("adb", "Can't get \"token\" from JSONResponse. error : " + e.getMessage());
        }
        try {
            sharedPreferences.edit().putString("uid", response.getString("uid")).apply();
        } catch (JSONException e) {
            sharedPreferences.edit().putString("uid", "Can't get uid from JSON").apply();
            Log.d("adb", "Can't get \"uid\" from JSONResponse. error : " + e.getMessage());
        }
    }

    public void signInOnClick(View view){
        final JSONObject jsonObject;
        try {
            jsonObject = createJsonObject();
        } catch (JSONException e) {
            Log.d("adb", "[JSONObject][Login.class] " + e.getMessage());
            return ;
        }
        final JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Login.DATAURL + "/session", jsonObject,
                new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Log.d("adb", "[Login.class][onResponse]Login request responded : " + response);
                dealWithResponse(response);
                try {
                    PreferenceManager.getDefaultSharedPreferences(Login.this).edit().putString("username", jsonObject.getString("username")).apply();
                } catch (JSONException e) {
                    Log.d("adb", "[Login.class][onResponse]Couldn't get username from JSON Object");
                }
                Intent intent = new Intent(Login.this, HomePage.class);
                intent.putExtra(USERNAME, usernameText.getText().toString());
                startActivity(intent);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("adb", "[Login.class][onErrorResponse]Login request failed. Returned : " + error);
                Toast.makeText(Login.this, "Couldn't Log in. Verify credentials.", Toast.LENGTH_SHORT).show();
            }
        });
        requestQueue.add(jsonObjectRequest);
    }

    public void signUpOnClick(View view){
        Intent intent = new Intent(Login.this, Signup.class);
        startActivity(intent);
    }
}
