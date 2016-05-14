package com.bedidi.fawzi.foodies;

import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;

public class HomePage extends AppCompatActivity {

    private void setFieldsValues(){
        final TextView usernameText = (TextView) findViewById(R.id.username);
        final TextView firstnameText = (TextView) findViewById(R.id.firstName);
        final TextView nameText = (TextView) findViewById(R.id.name);
        final TextView ageText = (TextView) findViewById(R.id.age);
        final LinearLayout contactButtonsLayout = (LinearLayout) findViewById(R.id.contactButtons);
        final SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        assert usernameText != null;
        final String username = this.getIntent().getStringExtra(Login.USERNAME);
        usernameText.setText(username.toCharArray(), 0, username.length());

        assert contactButtonsLayout != null;
        if (username.equals(sharedPreferences.getString("username", "fail"))){
            contactButtonsLayout.setVisibility(LinearLayout.GONE);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        setFieldsValues();

    }
}
