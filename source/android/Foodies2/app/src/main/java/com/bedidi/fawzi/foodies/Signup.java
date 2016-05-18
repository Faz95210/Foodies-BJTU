package com.bedidi.fawzi.foodies;

import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class Signup extends AppCompatActivity {

    private SharedPreferences sharedPreferences;
    private RequestQueue requestQueue;
    private EditText usernameEditText;
    private EditText emailEditText;
    private EditText passwordEditText;
    private EditText password2EditText;
    private Switch roleSwitch;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        requestQueue = Volley.newRequestQueue(this);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        Toast.makeText(Signup.this, "Session id is: "+ sharedPreferences.getString("idSession", "fail"), Toast.LENGTH_SHORT).show();
        usernameEditText = (EditText) findViewById(R.id.username);
        emailEditText = (EditText) findViewById(R.id.email);
        passwordEditText = (EditText) findViewById(R.id.password);
        password2EditText = (EditText) findViewById(R.id.password2);
        roleSwitch = (Switch) findViewById(R.id.restaurantSwitch);
    }

    private void saveId(JSONObject jsonResponse){
        try {
            sharedPreferences.edit().putString("id", jsonResponse.getString("_id")).apply();
            Log.d("adb", "[Signup.class][saveId]_id saved to sharedPreferences : " + sharedPreferences.getString("id", "error"));
        } catch (JSONException e) {
            Log.d("adb", "[JSONException][Signup.class][saveId]" + e.getMessage());
        }
    }

    private JSONObject createJsonObject() throws JSONException {
        final String password = passwordEditText.getText().toString();
        final String email = emailEditText.getText().toString();
        final String username = usernameEditText.getText().toString();
        final boolean isRestaurant = roleSwitch.isChecked();
        String role;
        if (isRestaurant){
            role = "owner";
        } else{
            role = "customer";
        }
        final JSONObject jsonBody = new JSONObject("{\"password\":\"" + password + "\"," +
                "\"username\":\"" + username +"\"," +
                "\"email\":\"" + email +"\"," +
                "\"role\":\"" + role +"\"}");
        return jsonBody;
    }

    public void backOnClick(View view){
        Intent intent = new Intent(Signup.this, Login.class);
        startActivity(intent);
    }

    public void signUpOnClick(View view){
        if (passwordEditText.getText().toString().equals(password2EditText.getText().toString())){
            JsonObjectRequest jsonObjectRequest;
            try {
                jsonObjectRequest = new JsonObjectRequest(Login.DATAURL + "/users", createJsonObject(), new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d("adb", "[Signup.class][onErrorResponse]SignUp request responded : " + response);
                        saveId(response);
                        Intent intent = new Intent(Signup.this, Login.class);
                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("adb", "[Signup.class][onErrorResponse]SignUp request failed. Returned : " + error);
                    }
                });
            } catch (JSONException e) {
                Log.d("adb", "[JSONException][Signup.class][signUpOnClick]" + e.getMessage());
                return ;
            }
            requestQueue.add(jsonObjectRequest);
        } else {
            Toast.makeText(Signup.this, "The two passwords don't match", Toast.LENGTH_SHORT).show();
        }
    }
}
