package com.bedidi.fawzi.foodies;

import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bedidi.fawzi.foodies.Databases.*;
import com.bedidi.fawzi.foodies.Fragments.FireMissilesDialogFragment;
import com.bedidi.fawzi.foodies.Fragments.MapsDialogFragment;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.StringTokenizer;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmQuery;
import io.realm.RealmResults;

public class HomePage extends AppCompatActivity {

    private void setRestaurantContent(String username){
        RealmConfiguration realmConfiguration = new RealmConfiguration.Builder(this)
                .deleteRealmIfMigrationNeeded()
                .build();
        Realm.setDefaultConfiguration(realmConfiguration);
        Realm realm = Realm.getDefaultInstance();
        RealmQuery<RestaurantDatabase> restaurant = realm.where(RestaurantDatabase.class);
        RealmResults<RestaurantDatabase> queryResult = restaurant.equalTo("name", username).findAll();
        if (queryResult.size() > 0){

        } else {
            MapsDialogFragment builder = new MapsDialogFragment();
            builder.show(this.getFragmentManager(), "map");
        }

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String username = this.getIntent().getStringExtra(Login.USERNAME);
        Log.d("displayInformation", username);
        if (PreferenceManager.getDefaultSharedPreferences(this).getString(Login.ROLE, "fail").equals("owner")
                || this.getIntent().getStringExtra(Login.USERNAME).equals("owner")){
            setContentView(R.layout.activity_restaurant);
            setRestaurantContent(username);
        }
        else {
            setContentView(R.layout.activity_home_page);
            setFieldsValues();
        }
    }

    @Override
    protected void onResume(){
        super.onResume();
    }

    private void setAccount(String username){
        RealmConfiguration realmConfiguration = new RealmConfiguration.Builder(this)
            .deleteRealmIfMigrationNeeded()
            .build();
        Realm.setDefaultConfiguration(realmConfiguration);
        Realm realm = Realm.getDefaultInstance();
        RealmQuery<User> users = realm.where(User.class);
        RealmResults<User> queryResult = users.equalTo("username", username).findAll();
        if (queryResult.size() > 0){
            Toast.makeText(HomePage.this, "This user already exists in the database.", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(HomePage.this, "You need to set your user details", Toast.LENGTH_SHORT).show();
            RealmResults<User> queryResults = users.findAll();
            Log.d("adb", username + " doesn't exist in the database. only exists " + queryResults.toString());
            FireMissilesDialogFragment builder = new FireMissilesDialogFragment();
            builder.show(this.getSupportFragmentManager(), "test");
        }
    }

    private String getAge(String birthdate){
        GregorianCalendar cal = new GregorianCalendar();
        StringTokenizer tokens = new StringTokenizer(birthdate, "/");
        int _day = Integer.parseInt(tokens.nextToken());
        int _month = Integer.parseInt(tokens.nextToken());
        int _year = Integer.parseInt(tokens.nextToken());
        Log.d("adb", "year : " + _year + " month : " + _month + " day : " + _day);
        int y, m, d, a;
        y = cal.get(Calendar.YEAR);
        m = cal.get(Calendar.MONTH);
        d = cal.get(Calendar.DAY_OF_MONTH);
        cal.set(_year, _month, _day);
        a = y - cal.get(Calendar.YEAR);
        if ((m < cal.get(Calendar.MONTH))
                || ((m == cal.get(Calendar.MONTH)) && (d < cal
                .get(Calendar.DAY_OF_MONTH)))) {
            --a;
        }
        return Integer.toString(a);
    }

    private void setFieldsValues(){
        final TextView usernameText = (TextView) findViewById(R.id.username);
        final TextView firstnameText = (TextView) findViewById(R.id.firstName);
        final TextView nameText = (TextView) findViewById(R.id.name);
        final TextView ageText = (TextView) findViewById(R.id.age);
        final LinearLayout contactButtonsLayout = (LinearLayout) findViewById(R.id.contactButtons);
        final LinearLayout accountLayout = (LinearLayout) findViewById(R.id.account);
        final SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
         assert usernameText != null;
        final String username = this.getIntent().getStringExtra(Login.USERNAME);
        usernameText.setText(username.toCharArray(), 0, username.length());
        assert contactButtonsLayout != null;
        assert accountLayout != null;
        if (username.equals(sharedPreferences.getString("username", "fail"))){
            contactButtonsLayout.setVisibility(LinearLayout.GONE);
            setAccount(username);
            RealmConfiguration realmConfiguration = new RealmConfiguration.Builder(this)
                    .deleteRealmIfMigrationNeeded()
                    .build();
            Realm.setDefaultConfiguration(realmConfiguration);
            Realm realm = Realm.getDefaultInstance();
            RealmQuery<User> users = realm.where(User.class);
            RealmResults<User> queryResult = users.equalTo("name", username).findAll();
            if ( queryResult.size() > 0 ) {
                final User user = queryResult.get(0);
                assert firstnameText != null;
                firstnameText.setText(user.getFirstName());
                assert nameText != null;
                nameText.setText(user.getName());
                assert ageText != null;
                ageText.setText(getAge(user.getBirthDate()));
            }
        } else {
            accountLayout.setVisibility(LinearLayout.GONE);
        }
    }
}

