'use strict';

class UserData{
    constructor(){
        this.nameRegExp = /^[A-Za-zА-Яа-яЁё]+$/g;
        this.phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{2}-?\d{2}$/g;
        this.emailRegExp = /^.+(\.?|-?).+@[A-Za-z]+\.[A-Za-z]{2,3}$/g;
        this.textRegExp = /^.*$/gm;
    }
    init() {
        document.querySelector('.sendBtn').addEventListener('click', elem => {
            elem.preventDefault();
            this.checkAllFields()
        });
    }
    testStrings(inputStr, regexp) {
         return regexp.test(inputStr);
    }
    testElem(selector, regexplocal, errorclass){
        const elemObj = document.querySelector(selector);
        regexplocal.lastIndex = 0;
        if (this.testStrings(elemObj.value, regexplocal)){
            elemObj.classList.remove('redBorder');
            document.querySelector(errorclass).classList.add('hidden');
            return true;
        } else {
            elemObj.classList.add('redBorder');
            document.querySelector(errorclass).classList.remove('hidden');
        }
    }
    checkAllFields(){
        this.testElem('#name', this.nameRegExp, '.nameError');
        this.testElem('#phone', this.phoneRegExp, '.phoneError');
        this.testElem('#email', this.emailRegExp, '.emailError');
        this.testElem('#text', this.textRegExp, '.textError');
    }
}

const userData = new UserData();
userData.init();