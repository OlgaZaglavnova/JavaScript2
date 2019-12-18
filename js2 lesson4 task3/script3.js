'use strict';

class UserData{
    constructor(){
        this.nameRegExp = /^[A-Za-zА-Яа-яЁё]+$/g;
        this.phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{2}-?\d{2}$/g;
        this.emailRegExp = /^.+(\.?|-?).+@[A-Za-z]+\.[A-Za-z]{2,3}$/g;
        this.textRegExp = /^.*$/gm;
    }
    init() {
        /*document.querySelector('#name').addEventListener('submit', ev => {
            ev.preventDefault();
        });*/
        document.querySelector('.sendBtn').addEventListener('click', elem => {
            elem.preventDefault();
            this.checkAllFields()
        });
    }
    testStrings(inputStr, regexp) {
         return regexp.test(inputStr);
    }
    testUserName(){
        const username = document.querySelector('#name');
        this.nameRegExp.lastIndex = 0;
        if (this.testStrings(username.value, this.nameRegExp)){
            username.classList.remove('redBorder');
            document.querySelector('.nameError').classList.add('hidden');
            return true;
        } else {
            username.classList.add('redBorder');
            document.querySelector('.nameError').classList.remove('hidden');
        }
    }
    testPhoneNumber(){
        const phonenumber = document.querySelector('#phone');
        this.phoneRegExp.lastIndex = 0;
        if (this.testStrings(phonenumber.value, this.phoneRegExp)){
            phonenumber.classList.remove('redBorder');
            document.querySelector('.phoneError').classList.add('hidden');
            return true;
        } else {
            phonenumber.classList.add('redBorder');
            document.querySelector('.phoneError').classList.remove('hidden');
        }
    }
    testEmail(){
        const email = document.querySelector('#email');
        this.emailRegExp.lastIndex = 0;
        if (this.testStrings(email.value, this.emailRegExp)){
            email.classList.remove('redBorder');
            document.querySelector('.emailError').classList.add('hidden');
            return true;
        } else {
            email.classList.add('redBorder');
            document.querySelector('.emailError').classList.remove('hidden');
        }
    }
    testText(){
        const txt = document.querySelector('#text');
        this.textRegExp.lastIndex = 0;
        if (this.testStrings(txt.value, this.textRegExp)){
            txt.classList.remove('redBorder');
            document.querySelector('.textError').classList.add('hidden');
            return true;
        } else {
            txt.classList.add('redBorder');
            document.querySelector('.textError').classList.remove('hidden');
        }
    }
    checkAllFields(){
        this.testUserName();
        this.testPhoneNumber();
        this.testEmail();
        this.testText();
    }
}

const userData = new UserData();
userData.init();