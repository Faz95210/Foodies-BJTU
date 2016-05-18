package com.bedidi.fawzi.foodies.Databases;

import java.util.Date;

import io.realm.RealmObject;

/**
 * Created by Fawzi on 14/05/16.
 */
public class User extends RealmObject {

    private String username;
    private String name;
    private String firstName;
    private String password;
    private String birthDate;

    public String getBirthDate() {return birthDate;}
    public String getFirstName() {return firstName;}
    public String getName() {return name;}
    public String getPassword() {return password;}
    public String getUsername() {return username;}

    public void setBirthDate(String birthDate) {this.birthDate = birthDate;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    public void setName(String name) {this.name = name;}
    public void setPassword(String password) {this.password = password;}
    public void setUsername(String username) {this.username = username;}
}
