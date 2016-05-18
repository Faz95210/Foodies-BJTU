package com.bedidi.fawzi.foodies.Databases;

import io.realm.RealmObject;

public class RestaurantDatabase extends RealmObject {

    private String name;
    private String address;
    private MenuDatabase menu;

    public String getName() {
        return name;
    }

    public MenuDatabase getMenu() {
        return menu;
    }

    public String getAddress() {
        return address;
    }

    public void setName(String name) {
        name = name;
    }

    public void setAddress(String address) {
        address = address;
    }

    public void setMenu(MenuDatabase menu) {
        this.menu = menu;
    }
}
