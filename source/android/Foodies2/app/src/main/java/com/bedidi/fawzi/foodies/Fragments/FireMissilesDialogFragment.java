package com.bedidi.fawzi.foodies.Fragments;

import android.app.Dialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.LayoutInflater;
import android.widget.EditText;

import com.bedidi.fawzi.foodies.Databases.User;
import com.bedidi.fawzi.foodies.R;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class FireMissilesDialogFragment extends DialogFragment {

    private EditText name;
    private EditText firstName;
    private EditText birthDate;

    @NonNull
    @Override
    public Dialog onCreateDialog(final Bundle savedInstanceState) {
        final AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        final LayoutInflater inflater = getActivity().getLayoutInflater();
        builder.setView(inflater.inflate(R.layout.custom_modal_account_info, null));
        builder.setPositiveButton(R.id.send, new DialogInterface.OnClickListener(){
            @Override
            public void onClick(DialogInterface dialogInterface, int Id){
                firstName = (EditText) getDialog().findViewById(R.id.firstname);
                birthDate = (EditText) getDialog().findViewById(R.id.birthdate);
                name = (EditText) getDialog().findViewById(R.id.nameModal);
                RealmConfiguration realmConfiguration = new RealmConfiguration.Builder(builder.getContext())
                        .deleteRealmIfMigrationNeeded()
                        .build();
                Realm.setDefaultConfiguration(realmConfiguration);
                Realm realm = Realm.getDefaultInstance();
                realm.beginTransaction();
                User realmObject = realm.createObject(User.class);
                realmObject.setBirthDate(birthDate.getText().toString());
                realmObject.setName(name.getText().toString());
                realmObject.setUsername(PreferenceManager.getDefaultSharedPreferences(builder.getContext()).getString("username", "fail"));
                realmObject.setFirstName(firstName.getText().toString());
                realm.copyToRealm(realmObject);
                Log.d("adb", "Creating user instance in database." + realmObject.toString());
                realm.commitTransaction();
            }
        });
        builder.setNegativeButton(R.id.cancel, new DialogInterface.OnClickListener(){
           @Override
            public void onClick(DialogInterface dialogInterface, int Id){
               FireMissilesDialogFragment.this.getDialog().cancel();
           }
        });
        return builder.create();
    }
}
