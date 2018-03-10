let should = require('should');
let assert = require('assert');
let request = require('supertest');

describe('Board Setting API', function() {
    let url = 'http://localhost:3000';
    
    before(function(done) {
        done();
    });
    
    describe('Setting APIs', function() {
        it('Should post setting success', function(done){
            let settingData = {
                "pictureInfomations": [
                    {
                        "filepath": "./images/1.jpg",
                        "displayTime": "10"
                    },
                    {
                        "filepath": "./images/2.jpg",
                        "displayTime": "10"
                    },
                    {
                        "filepath": "./images/3.jpg",
                        "displayTime": "10"
                    }
                ],
                "appointmentInfomations": {
                    "displayTime": "10",
                    "refreshTime": "120"
                }
            };
            
            request(url)
                .post('/setting')
                .send(settingData)
                .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log("success res==>",res.body);
                    // Should.js fluent syntax applied
                    done();
                });
        });
        it('Should post setting fail', function(done){
            let settingData = {
                "pictureInfomations": [
                    {
                        "filepath": "./images/1.jpg"
                    }
                ],
                "appointmentInfomations": {
                    "displayTime": "10",
                    "refreshTime": "120"
                }
            };
            
            request(url)
                .post('/setting')
                .send(settingData)
                .expect(400) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log("success res==>",res.body);
                    // Should.js fluent syntax applied
                    done();
                });
        });
        it('Should get setting success', function(done){
            request(url)
                .get('/setting')
                .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log("success res==>",res.body);
                    // Should.js fluent syntax applied
                    done();
                });
        });
    });
});