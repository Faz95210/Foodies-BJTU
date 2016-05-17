package com.bedidi.fawzi.foodies.Databases;

import io.realm.RealmObject;

/**
 * Created by Fawzi on 15/05/16.
 */
public class MenuDatabase extends RealmObject {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
