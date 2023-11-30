const {Builder,By, until} = require("selenium-webdriver");
const assert = require("assert");
const base_url = 'http://185.252.146.21' || 'http://localhost:3000'
let email = '9@yandex.ru'//'1234@yandex.ru'
let password = '123'
let stop_time = 1500

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function Login(driver){
    try{
        await driver.findElement(By.id('Email')).sendKeys(email);
        await driver.findElement(By.id('Password')).sendKeys(password);
        await driver.findElement(By.id('loginCheck')).click();
        await driver.findElement(By.id('LogBnt')).click();
        await driver.wait(until.elementLocated(By.id('LogoutBnt')),5000)
    }catch(ex){
        console.log(ex)
        assert.fail()
    }
}

async function LoginTest(){
    let driver = await  new Builder().forBrowser("chrome").build();
    try{
        await driver.get(`${base_url}/profile?select=profile`);
        await Login(driver)
        const pageUrl = await driver.getCurrentUrl();
        assert.strictEqual(pageUrl, `${base_url}/profile?select=profile`);
    }
    catch(ex){
        console.log(ex)
        assert.fail()
    }
    finally{
        await driver.quit();
    }
}

async function RegistrationTest(){
    let driver = await  new Builder().forBrowser("chrome").build();
    email = `${randomIntFromInterval(0,100)}@yandex.ru`
    try{
        await driver.get(`${base_url}/profile?select=profile`);
        await driver.findElement(By.id('nav-registration-tab')).click();
        await driver.findElement(By.id('EmailReg')).sendKeys(email);
        await driver.findElement(By.id('PasswordReg')).sendKeys(password);
        await driver.findElement(By.id('Phone')).sendKeys("+7(965)457-24-21");
        await driver.findElement(By.id('Surname')).sendKeys("Иванов");
        await driver.findElement(By.id('Firstname')).sendKeys("Иван");
        await driver.findElement(By.id('Lastname')).sendKeys("Иванович");
        await driver.findElement(By.id('Date')).sendKeys("10-10-2004");
        await driver.findElement(By.id('registrationCheck')).click();
        await driver.sleep(stop_time)
        await driver.findElement(By.id('RegBnt')).click();
        await driver.sleep(stop_time)
        await driver.wait(until.elementLocated(By.id('LogoutBnt')),5000)
        const pageUrl = await driver.getCurrentUrl();
        assert.strictEqual(pageUrl, `${base_url}/profile?select=profile`);
    }
    catch(ex){
        console.log(ex)
        assert.fail()
    }
    finally{
        await driver.quit();
    }
}

async function NewOrderTest(){
    let driver = await new Builder().forBrowser("chrome").build();
    try{
        await driver.get(`${base_url}/profile?select=service`);
        await Login(driver)
        await driver.wait(until.elementLocated(By.id('DateOrder')),5000).sendKeys("04-12-2023");
        await driver.wait(until.elementLocated(By.className('TimeOrder')),5000)
        const times = await driver.findElements(By.className('TimeOrder'));
        if(times.length == 0) assert.fail();
        times[times.length-1].click()
        await driver.wait(until.elementLocated(By.id('Comment')),5000)
        await driver.findElement(By.id('Comment')).sendKeys('Тестирование комментария');
        await driver.wait(until.elementLocated(By.id('OrderNewBnt')),5000)
        await driver.sleep(stop_time)
        await driver.findElement(By.id('OrderNewBnt')).click();
        await driver.wait(until.elementLocated(By.className('history-item')),5000)
        await driver.sleep(stop_time)
        assert.ok(true)
    }
    catch(ex){
        console.log(ex)
        assert.fail()
    }
    finally{
        await driver.quit();
    }
}

async function CancelOrderTest(){
    let driver = await  new Builder().forBrowser("chrome").build();
    try{
        await driver.get(`${base_url}/profile?select=history`);
        await Login(driver)
        await driver.wait(until.elementLocated(By.id('SwitchFinally')),5000)
        await driver.findElement(By.id('SwitchFinally')).click();
        const switch_finally = await driver.findElement(By.id('SwitchFinally'))
        await driver.wait(async () => { 
            return switch_finally.getAttribute('checked')   
              .then(value => value == null );
        });
        await driver.wait(async () => { 
            return driver.findElements(By.className('history-item status-1'))
              .then(value => value.length == 0 );
        });
        await driver.wait(until.elementLocated(By.className('history-item')), 5000)
        let elements = await driver.findElements(By.className('history-item status-2'))
        if(elements.length == 0) assert.fail()
        const id = (await elements[0].getAttribute('data-bs-target')).replace('#id-','')
        await elements[0].click();
        await driver.wait(async () => { 
            return (await driver.findElement(By.id(`id-${id}`))).getCssValue('display')      
              .then(opacity => opacity === 'block');
        });
        await driver.sleep(stop_time)
        await driver.findElement(By.id(`CancelBnt-${id}`)).click()
        await driver.sleep(stop_time)
        elements = await driver.findElements(By.className('history-item status-2'))
        for (let index = 0; index < elements.length; index++) {
            if(await elements[index].getAttribute('data-bs-target') == `#id-${id}`) assert.fail()
        }
        assert.ok(id)
        await driver.quit();
    }
    catch(ex){
        console.log(ex)
        assert.fail()
    }
}

async function AddCarTest(){
    let driver = await  new Builder().forBrowser("chrome").build();
    try{
        await driver.get(`${base_url}/profile?select=profile`);
        await Login(driver)
        await driver.wait(until.elementLocated(By.id('WelcomeInfoProfile')),5000)
        await driver.findElement(By.id('AddInfoBnt')).click();
        await driver.findElement(By.id('CarName')).sendKeys('Тестовая машина');
        await driver.findElement(By.id('CarNumber')).sendKeys('00000000');
        await driver.findElement(By.id('CarReleaseYear')).sendKeys('2004');
        await driver.findElement(By.id('CarColor')).sendKeys('Бежевый');
        await driver.findElement(By.id('CarMileage')).sendKeys('596574');
        await driver.findElement(By.id('CarVin')).sendKeys('75821384842793217');
        await driver.findElement(By.id('CarEngine')).sendKeys('AAN');
        await driver.findElement(By.id('CarPhoto')).sendKeys('C:\\Users\\Citizen\\Downloads\\ad50ca32-3050-40c5-8eee-57472daffa0f.jpg');
        const bnt = await driver.findElement(By.id('CarAddBnt'))
        driver.actions().move({ origin: bnt })
        await driver.sleep(stop_time)
        await bnt.click()
        await driver.sleep(stop_time)
        
    }
    catch(ex){
        console.log(ex)
        assert.fail()
    }
    finally{
        await driver.quit();
    }
}

async function EditClientTest(){
    let driver = await  new Builder().forBrowser("chrome").build();
    try{
        await driver.get(`${base_url}/profile?select=profile`);
        await Login(driver)
        await driver.wait(until.elementLocated(By.id('WelcomeInfoProfile')),5000)
        await driver.findElement(By.id('EditClientBnt')).click();
        await driver.wait(until.elementLocated(By.id('Surname')),5000).clear()
        await driver.findElement(By.id('Surname')).sendKeys('Тестирование');
        await driver.findElement(By.id('Firstname')).clear();
        await driver.findElement(By.id('Firstname')).sendKeys('Тест');
        await driver.findElement(By.id('Lastname')).clear();
        await driver.findElement(By.id('Lastname')).sendKeys('Тестовый');
        await driver.findElement(By.id('BirthDate')).clear();
        await driver.findElement(By.id('BirthDate')).sendKeys('09-09-2000');
        //await driver.findElement(By.id('Email')).sendKeys('');
        await driver.findElement(By.id('Phone')).clear();
        await driver.findElement(By.id('Phone')).sendKeys('+7(949)000-25-45');
        await driver.sleep(stop_time)
        await driver.executeScript("document.getElementById('EditClientBnt').click()")
        await driver.sleep(stop_time)
        assert.ok(true)
        
    }
    catch(ex){
        console.log(ex)
        assert.fail()
    }
    finally{
        await driver.quit();
    }
}

(async () => {
    await RegistrationTest();
    await LoginTest();
    await AddCarTest();
    await EditClientTest();
    await NewOrderTest();
    await CancelOrderTest();
})()