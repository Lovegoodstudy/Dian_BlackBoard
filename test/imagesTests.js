let should = require('should');
let assert = require('assert');
let request = require('supertest');


describe('Board Images API', function() {
    let url = 'http://localhost:3000';
    
    before(function(done) {
        done();
    });
    
    describe('Images APIs', function() {

        it('Should delete image success', function(done){
            let deleteData ={
                name:"1.jpg"
            };
            
            request(url)
                .delete('/image')
                .send(deleteData)
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
        it('Should delete image fail', function(done){
            let deleteData = {
                name:"4.jpg"
            };
            
            request(url)
                .delete('/image')
                .send(deleteData)
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
        it('Should get images success', function(done){
            request(url)
                .get('/image')
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