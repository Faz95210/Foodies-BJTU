package com.bedidi.fawzi.foodies.Fragments;

import android.app.DialogFragment;
import android.app.Fragment;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bedidi.fawzi.foodies.R;

/**
 * Created by Fawzi on 16/05/16.
 */
public class MapsDialogFragment extends DialogFragment {

    private Fragment fragment;

    public MapsDialogFragment() {
        fragment = new Fragment();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.pick_address_dialog, container, false);
        getDialog().setTitle("");
        FragmentTransaction transaction = getChildFragmentManager().beginTransaction();
        transaction.add(R.id.map, fragment).commit();

        return view;
    }



    public Fragment getFragment() {
        return fragment;
    }
}
